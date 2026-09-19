'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Star,
  Heart,
  MessageSquare,
  Camera,
  Send,
  ThumbsDown,
  Meh,
} from 'lucide-react';
import { Itinerary } from '@/types';
import { submitFeedback } from '@/lib/api';
import RatingButton from '@/components/RatingButton';

export default function FeedbackPage() {
  const router = useRouter();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [ratings, setRatings] = useState<Record<string, 'loved' | 'neutral' | 'disliked'>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [overallRating, setOverallRating] = useState(0);
  const [overallComment, setOverallComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('currentItinerary');
    if (stored) {
      setItinerary(JSON.parse(stored));
    } else {
      router.push('/plan');
    }
  }, [router]);

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-pattern flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Itinerary Found</h2>
          <p className="text-gray-600 mb-6">Please create an itinerary first</p>
          <Link href="/plan" className="btn-primary">
            Plan Your Trip
          </Link>
        </div>
      </div>
    );
  }

  const handleRating = (activityId: string, rating: 'loved' | 'neutral' | 'disliked') => {
    setRatings((prev) => ({ ...prev, [activityId]: rating }));
  };

  const handleComment = (activityId: string, comment: string) => {
    setComments((prev) => ({ ...prev, [activityId]: comment }));
  };

  const findActivityById = (activityId: string) => {
    for (const day of itinerary.itinerary) {
      for (const activity of day.activities) {
        if (activity.id === activityId) {
          return activity;
        }
      }
    }
    return null;
  };

  const getProgressPercentage = () => {
    const totalActivities = itinerary.itinerary.reduce(
      (total, day) => total + day.activities.length,
      0
    );
    const ratedActivities = Object.keys(ratings).length;
    return totalActivities > 0 ? (ratedActivities / totalActivities) * 100 : 0;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSubmitFeedback = async () => {
    setIsSubmitting(true);

    try {
      const activityFeedback = Object.entries(ratings).map(([activityId, rating]) => {
        const activity = findActivityById(activityId);
        return {
          activityId: activityId,
          activityTitle: activity?.title || 'Unknown Activity',
          rating: rating,
          comment: comments[activityId] || '',
          category: activity?.type || 'activity',
        };
      });

      const feedbackData = {
        userId: 'user123',
        itineraryId: itinerary._id || 'dummy-id',
        tripDetails: {
          city: itinerary.city,
          startDate: itinerary.startDate,
          endDate: itinerary.endDate,
          groupSize: itinerary.groupSize,
        },
        overallRating: overallRating,
        overallComment: overallComment,
        activityFeedback: activityFeedback,
      };

      await submitFeedback(feedbackData);
      alert(
        'Thank you for your feedback! Your ratings help us improve recommendations for future travelers.'
      );
      router.push('/');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(
        'Thank you for your feedback! Your ratings help us improve recommendations for future travelers.'
      );
      router.push('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (rating: string) => {
    const labels: Record<string, string> = {
      loved: '🔥 Loved it!',
      neutral: '🟡 It was okay',
      disliked: "❌ Didn't enjoy",
    };
    return labels[rating] || '';
  };

  return (
    <div className="min-h-screen bg-pattern py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/itinerary"
            className="inline-flex items-center gap-2 text-[#D93D3D] hover:text-[#B83232] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Itinerary
          </Link>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gradient mb-2">Rate Your Experience</h1>
            <p className="text-gray-600 mb-6">
              Help us improve by rating the activities you experienced
            </p>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress: {Math.round(getProgressPercentage())}%
                </span>
                <span className="text-sm text-gray-500">
                  {Object.keys(ratings).length} of{' '}
                  {itinerary.itinerary.reduce((total, day) => total + day.activities.length, 0)}{' '}
                  rated
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#D93D3D] to-[#E1B168] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Day Navigation */}
        <div className="mb-6">
          <div className="flex overflow-x-auto gap-2 pb-2">
            {itinerary.itinerary.map((day, index) => (
              <button
                key={index}
                onClick={() => setCurrentDay(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentDay === index
                    ? 'bg-[#D93D3D] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Form */}
        <div className="space-y-6">
          {itinerary.itinerary[currentDay] && (
            <div className="card">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Day {itinerary.itinerary[currentDay].day} -{' '}
                  {formatDate(itinerary.itinerary[currentDay].date)}
                </h2>
                <p className="text-gray-600">Rate each activity you experienced on this day</p>
              </div>

              <div className="space-y-6">
                {itinerary.itinerary[currentDay].activities.map((activity) => (
                  <div key={activity.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {activity.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {activity.location} • {activity.duration}
                        </p>
                        <p className="text-gray-700">{activity.description}</p>
                      </div>

                      {ratings[activity.id] && (
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            ratings[activity.id] === 'loved'
                              ? 'text-green-600 bg-green-100'
                              : ratings[activity.id] === 'neutral'
                              ? 'text-yellow-600 bg-yellow-100'
                              : 'text-red-600 bg-red-100'
                          }`}
                        >
                          {getRatingLabel(ratings[activity.id])}
                        </span>
                      )}
                    </div>

                    {/* Rating Buttons */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How was this activity?
                      </label>
                      <div className="flex gap-3">
                        <RatingButton
                          rating="loved"
                          icon={Heart}
                          label="Loved it!"
                          isSelected={ratings[activity.id] === 'loved'}
                          onClick={() => handleRating(activity.id, 'loved')}
                        />
                        <RatingButton
                          rating="neutral"
                          icon={Meh}
                          label="It was okay"
                          isSelected={ratings[activity.id] === 'neutral'}
                          onClick={() => handleRating(activity.id, 'neutral')}
                        />
                        <RatingButton
                          rating="disliked"
                          icon={ThumbsDown}
                          label="Didn't enjoy"
                          isSelected={ratings[activity.id] === 'disliked'}
                          onClick={() => handleRating(activity.id, 'disliked')}
                        />
                      </div>
                    </div>

                    {/* Comment Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Any additional feedback? (Optional)
                      </label>
                      <textarea
                        value={comments[activity.id] || ''}
                        onChange={(e) => handleComment(activity.id, e.target.value)}
                        className="input-field"
                        rows={3}
                        placeholder="What made this great or what could be improved?"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Overall Feedback */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Overall Trip Experience</h2>

          <div className="space-y-6">
            {/* Overall Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you rate your overall Morocco experience?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setOverallRating(star)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      star <= overallRating
                        ? 'text-yellow-500 bg-yellow-100'
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  >
                    <Star className={`w-8 h-8 ${star <= overallRating ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {overallRating > 0 ? `${overallRating} out of 5 stars` : 'Select your rating'}
              </p>
            </div>

            {/* Overall Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tell us about your overall experience
              </label>
              <textarea
                value={overallComment}
                onChange={(e) => setOverallComment(e.target.value)}
                className="input-field"
                rows={4}
                placeholder="What was the highlight of your trip? Any suggestions for improvement?"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmitFeedback}
            disabled={isSubmitting || Object.keys(ratings).length === 0}
            className="btn-primary flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Feedback
              </>
            )}
          </button>

          {Object.keys(ratings).length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Please rate at least one activity before submitting
            </p>
          )}
        </div>

        {/* Feedback Benefits */}
        <div className="mt-12 card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Why Your Feedback Matters
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-[#FCE8E8] rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-[#D93D3D]" />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Improve Recommendations</h4>
              <p className="text-sm text-gray-600">
                Help us suggest better activities for future travelers
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#FCE8E8] rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-[#D93D3D]" />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Share Insights</h4>
              <p className="text-sm text-gray-600">Your tips help others have better experiences</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#FCE8E8] rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="w-6 h-6 text-[#D93D3D]" />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Build Community</h4>
              <p className="text-sm text-gray-600">Connect with other Morocco travelers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
