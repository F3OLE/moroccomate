'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Users,
  DollarSign,
  Edit,
  Heart,
  Share2,
  Star,
  ArrowLeft,
} from 'lucide-react';
import { Itinerary } from '@/types';
import DayCard from '@/components/DayCard';
import { FadeIn } from '@/components/FadeIn';

export default function ItineraryPage() {
  const router = useRouter();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showTips, setShowTips] = useState(false);

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
      <div className="min-h-screen plan-scene flex items-center justify-center relative pt-14 sm:pt-16">
        <div className="absolute inset-0 bg-[#1a2632]/55" />
        <div className="relative glass rounded-2xl p-8 text-center max-w-md mx-4">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-3">No itinerary yet</h2>
          <p className="text-[#2C3E50]/65 mb-6">Build one first — takes a couple minutes.</p>
          <Link href="/plan" className="btn-primary inline-flex">
            Plan your trip
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCityDisplayName = (city: string) => {
    return city.charAt(0).toUpperCase() + city.slice(1);
  };

  const getBudgetDisplay = (budget: string) => {
    const budgets: Record<string, string> = {
      budget: 'Budget',
      'mid-range': 'Mid-range',
      luxury: 'Luxury',
    };
    return budgets[budget] || budget;
  };

  const getGroupSizeDisplay = (groupSize: string | number) => {
    if (typeof groupSize === 'number') {
      const groups: Record<number, string> = {
        1: 'Solo',
        2: 'Couple',
        4: 'Family',
        6: 'Friends',
      };
      return groups[groupSize] || `${groupSize} people`;
    }
    const groups: Record<string, string> = {
      solo: 'Solo',
      couple: 'Couple',
      family: 'Family',
      friends: 'Friends',
    };
    return groups[groupSize] || groupSize;
  };

  const handleEditActivity = () => {
    router.push('/edit');
  };

  const handleRemoveActivity = (dayIndex: number, activityIndex: number) => {
    if (!itinerary) return;
    const updatedItinerary = { ...itinerary };
    updatedItinerary.itinerary[dayIndex].activities.splice(activityIndex, 1);
    setItinerary(updatedItinerary);
    sessionStorage.setItem('currentItinerary', JSON.stringify(updatedItinerary));
  };

  return (
    <div className="min-h-screen plan-scene relative pt-14 sm:pt-16">
      <div className="absolute inset-0 bg-[#1a2632]/50" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <FadeIn>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#E1B168] hover:text-white mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <p className="text-[#E1B168] text-xs font-bold tracking-[0.25em] uppercase mb-2">
                Your plan
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                {getCityDisplayName(itinerary.city)}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                <span className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/90">
                  <Calendar className="w-3.5 h-3.5 text-[#E1B168]" />
                  {formatDate(itinerary.startDate)} – {formatDate(itinerary.endDate)}
                </span>
                <span className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/90">
                  <Users className="w-3.5 h-3.5 text-[#E1B168]" />
                  {getGroupSizeDisplay(itinerary.groupSize)}
                </span>
                <span className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/90">
                  <DollarSign className="w-3.5 h-3.5 text-[#E1B168]" />
                  {getBudgetDisplay(itinerary.budget)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => alert('Itinerary saved successfully!')}
                className="glass-chip text-white px-4 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/20"
              >
                <Heart className="w-4 h-4" /> Save
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied!');
                }}
                className="glass-chip text-white px-4 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/20"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
              <Link href="/edit" className="btn-primary !py-2.5 text-sm inline-flex items-center gap-2">
                <Edit className="w-4 h-4" /> Edit
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Summary glass panel */}
        <FadeIn delay={0.05}>
          <div className="glass liquid-glass rounded-2xl p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C3E50]/5 mb-2">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {itinerary.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#D93D3D]/10 text-[#D93D3D] rounded-full text-sm font-medium capitalize"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C3E50]/5 mb-2">
                  Estimated cost
                </h3>
                <p className="text-3xl font-bold text-[#D93D3D]">
                  {itinerary.totalEstimatedCost || '—'}
                </p>
                <p className="text-sm text-[#2C3E50]/55">
                  for {itinerary.days || itinerary.itinerary.length} days
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C3E50]/5 mb-2">
                  Notes
                </h3>
                <p className="text-[#2C3E50]/75 text-sm leading-relaxed">
                  {itinerary.specialRequests || 'None'}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {itinerary.generalTips && itinerary.generalTips.length > 0 && (
          <div className="glass rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[#2C3E50] flex items-center gap-2">
                <Star className="w-5 h-5 text-[#E1B168]" />
                Travel tips
              </h2>
              <button
                onClick={() => setShowTips(!showTips)}
                className="text-sm font-semibold text-[#D93D3D]"
              >
                {showTips ? 'Hide' : 'Show'}
              </button>
            </div>
            {showTips && (
              <ul className="space-y-2">
                {itinerary.generalTips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-[#2C3E50]/80"
                  >
                    <span className="glass-num font-black tabular-nums w-7 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Day nav */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-6">
          {itinerary.itinerary.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                selectedDay === index
                  ? 'bg-[#D93D3D] text-white shadow-lg'
                  : 'glass-chip text-white hover:bg-white/20'
              }`}
            >
              Day {day.day}
            </button>
          ))}
        </div>

        {itinerary.itinerary[selectedDay] && (
          <DayCard
            day={itinerary.itinerary[selectedDay]}
            dayIndex={selectedDay}
            onEditActivity={handleEditActivity}
            onRemoveActivity={handleRemoveActivity}
          />
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/edit" className="btn-primary inline-flex items-center justify-center gap-2">
            <Edit className="w-4 h-4" /> Customize
          </Link>
          <Link
            href="/feedback"
            className="glass-chip text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/20"
          >
            <Star className="w-4 h-4 text-[#E1B168]" /> Rate experience
          </Link>
        </div>
      </div>
    </div>
  );
}
