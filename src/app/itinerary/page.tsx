'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Users,
  DollarSign,
  Edit,
  Share2,
  Star,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Itinerary } from '@/types';
import DayCard from '@/components/DayCard';
import { FadeIn } from '@/components/FadeIn';
import { cityDisplayName } from '@/data/places';

export default function ItineraryPage() {
  const router = useRouter();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showTips, setShowTips] = useState(true);

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
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative bg-[#FFFAF5] rounded-sm p-8 text-center max-w-md mx-4 border-l-4 border-[#D93D3D] shadow-2xl">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-3">No itinerary yet</h2>
          <p className="text-[#2C3E50]/70 mb-6">Build one first. Takes a couple minutes.</p>
          <Link href="/plan" className="btn-primary inline-flex">
            Plan your trip
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

  const formatDateLong = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

  const getCityDisplayName = (city: string) => cityDisplayName(city);

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

  const handleEditActivity = () => router.push('/edit');

  const handleRemoveActivity = (dayIndex: number, activityIndex: number) => {
    if (!itinerary) return;
    const updated = { ...itinerary };
    updated.itinerary[dayIndex].activities.splice(activityIndex, 1);
    setItinerary(updated);
    sessionStorage.setItem('currentItinerary', JSON.stringify(updated));
  };

  const dayCount = itinerary.days || itinerary.itinerary.length;
  const source =
    (itinerary as Itinerary & { source?: string }).source === 'gemini'
      ? 'Crafted with AI'
      : 'Curated stops';

  return (
    <div className="min-h-screen plan-scene relative pt-14 sm:pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <FadeIn>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#E1B168] hover:text-white mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>

          <div className="mb-10 md:mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="badge badge-gold">{source}</span>
              <span className="text-[#E1B168]/80 text-xs tracking-[0.2em] uppercase font-bold">
                Your Morocco days
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl text-white leading-[0.95] mb-4 max-w-xl">
              {getCityDisplayName(itinerary.city)}
            </h1>
            <p className="text-white/70 text-lg max-w-md leading-relaxed mb-6">
              {formatDate(itinerary.startDate)} → {formatDate(itinerary.endDate)}
              <span className="text-[#E1B168]"> · </span>
              {getGroupSizeDisplay(itinerary.groupSize)}
              <span className="text-[#E1B168]"> · </span>
              {getBudgetDisplay(itinerary.budget)}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/edit"
                className="btn-primary !py-2.5 !px-5 text-sm inline-flex items-center gap-2"
              >
                <Edit className="w-4 h-4" /> Edit plan
              </Link>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied!');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white border border-white/35 rounded-[2px] hover:bg-white/10"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Trip meta. Solid panel, high contrast */}
        <FadeIn delay={0.05}>
          <div className="bg-[#FFFAF5] rounded-sm border-l-4 border-[#D93D3D] shadow-2xl mb-8 overflow-hidden">
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#2C3E50]/10">
              <div className="p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D93D3D] mb-3">
                  Interests
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {itinerary.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-2.5 py-1 bg-[#FCE8E8] text-[#B83232] text-sm font-semibold capitalize rounded-[2px]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D93D3D] mb-3">
                  Est. Cost
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-[#2C3E50] tabular-nums">
                  {itinerary.totalEstimatedCost || '-'}
                </p>
                <p className="text-sm text-[#2C3E50]/55 mt-1">across {dayCount} days</p>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D93D3D] mb-3">
                  Notes
                </p>
                <p className="text-[#2C3E50] text-sm leading-relaxed">
                  {itinerary.specialRequests?.trim() || 'No special notes'}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {itinerary.generalTips && itinerary.generalTips.length > 0 && (
          <FadeIn delay={0.08}>
            <div className="mb-8 bg-[#1a1520]/70 border border-[#E1B168]/35 rounded-sm p-5 sm:p-6 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="w-full flex items-center justify-between gap-3 text-left"
              >
                <span className="inline-flex items-center gap-2 text-[#E1B168] font-bold text-sm tracking-wide uppercase">
                  <Sparkles className="w-4 h-4" /> Local tips
                </span>
                <span className="text-white/60 text-sm">{showTips ? 'Hide' : 'Show'}</span>
              </button>
              {showTips && (
                <ol className="mt-5 space-y-3">
                  {itinerary.generalTips.map((tip, index) => (
                    <li key={index} className="flex gap-3 text-white/90 text-sm leading-relaxed">
                      <span className="text-[#E1B168] font-bold tabular-nums shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </FadeIn>
        )}

        {/* Day switcher. Editorial numbers */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
          {itinerary.itinerary.map((day, index) => (
            <button
              key={day.day}
              type="button"
              onClick={() => setSelectedDay(index)}
              className={`shrink-0 min-w-[4.5rem] px-4 py-3 text-left transition-all rounded-[2px] border ${
                selectedDay === index
                  ? 'bg-[#D93D3D] border-[#D93D3D] text-white shadow-lg'
                  : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Day</div>
              <div className="text-2xl font-bold tabular-nums leading-none mt-0.5">{day.day}</div>
              <div className="text-[10px] mt-1 opacity-75">{formatDate(day.date)}</div>
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

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-start">
          <Link href="/edit" className="btn-primary inline-flex items-center justify-center gap-2">
            <Edit className="w-4 h-4" /> Customize stops
          </Link>
          <Link
            href="/feedback"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-[#E1B168] border border-[#E1B168]/50 rounded-[2px] hover:bg-[#E1B168]/10"
          >
            <Star className="w-4 h-4" /> Rate this trip
          </Link>
        </div>

        <p className="mt-8 text-white/40 text-xs flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          Viewing {formatDateLong(itinerary.itinerary[selectedDay]?.date || itinerary.startDate)}
        </p>
      </div>
    </div>
  );
}
