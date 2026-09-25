'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Edit, Share2, Star, ArrowLeft, ChevronDown } from 'lucide-react';
import { Itinerary } from '@/types';
import DayCard from '@/components/DayCard';
import { FadeIn } from '@/components/FadeIn';
import { cityDisplayName } from '@/data/places';

export default function ItineraryPage() {
  const router = useRouter();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showTips, setShowTips] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('currentItinerary');
    if (stored) {
      try {
        setItinerary(JSON.parse(stored));
      } catch {
        router.push('/plan');
        return;
      }
      setLoading(false);
    } else {
      router.push('/plan');
    }
  }, [router]);

  if (loading || !itinerary) {
    return (
      <div className="min-h-screen bg-[var(--paper)] pt-14 sm:pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
          <div className="skeleton-light h-3 w-28" />
          <div className="skeleton-light h-12 w-2/3 max-w-sm" />
          <div className="skeleton-light h-5 w-48" />
          <div className="flex gap-6 border-b border-[var(--ink)]/12 pb-3">
            <div className="skeleton-light h-6 w-16" />
            <div className="skeleton-light h-6 w-16" />
            <div className="skeleton-light h-6 w-16" />
          </div>
          <div className="space-y-4 pt-4">
            <div className="skeleton-light h-20 w-full" />
            <div className="skeleton-light h-20 w-full" />
            <div className="skeleton-light h-20 w-full" />
          </div>
          <p className="text-[var(--ink-soft)] text-sm text-center pt-2">
            Loading your itinerary…
          </p>
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
  const meta = itinerary as Itinerary & {
    source?: string;
    fallbackReason?: string;
  };
  const isAi = meta.source === 'gemini';
  const sourceLabel = isAi ? 'Crafted with AI' : 'Curated stops';
  const fallbackReason = meta.fallbackReason || '';
  const missingKey =
    !isAi &&
    (fallbackReason === 'missing_key' ||
      fallbackReason.startsWith('missing_key'));
  const geminiErrored = !isAi && fallbackReason.startsWith('gemini_error');

  return (
    <div className="min-h-screen bg-[var(--paper)] pt-14 sm:pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <FadeIn>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--ink-soft)] hover:text-[var(--brand)] mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>

          {!isAi && (
            <div className="mb-8 border-l-2 border-[var(--saffron)] pl-4 py-1 text-sm text-[var(--ink-soft)] leading-relaxed">
              {missingKey ? (
                <>
                  <span className="font-semibold text-[var(--ink)]">
                    AI key not loaded on the server.{' '}
                  </span>
                  Add <code className="text-[var(--brand)]">GEMINI_API_KEY</code>{' '}
                  in Vercel → Project Settings → Environment Variables
                  (Production), then Redeploy. Until then we used verified spots.
                </>
              ) : geminiErrored ? (
                <>
                  <span className="font-semibold text-[var(--ink)]">
                    AI planner hit an error.{' '}
                  </span>
                  We built this from our verified spots instead. Still editable.
                </>
              ) : (
                <>
                  <span className="font-semibold text-[var(--ink)]">
                    Curated plan.{' '}
                  </span>
                  AI was busy or unavailable, so we built this from our verified
                  spots. Still editable.
                </>
              )}
            </div>
          )}

          <div className="mb-10 md:mb-12">
            <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase mb-3">
              {sourceLabel}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--ink)] leading-[1.05] mb-4 max-w-xl">
              {getCityDisplayName(itinerary.city)}
            </h1>
            <p className="text-[var(--ink-soft)] text-lg max-w-xl leading-relaxed mb-2">
              {formatDate(itinerary.startDate)} → {formatDate(itinerary.endDate)}
              <span className="text-[var(--ink)]/25"> · </span>
              {dayCount} {dayCount === 1 ? 'day' : 'days'}
              <span className="text-[var(--ink)]/25"> · </span>
              {getGroupSizeDisplay(itinerary.groupSize)}
              <span className="text-[var(--ink)]/25"> · </span>
              {getBudgetDisplay(itinerary.budget)}
            </p>
            {itinerary.totalEstimatedCost && (
              <p className="text-[var(--ink-soft)] text-sm mb-6">
                Est.{' '}
                <span className="font-display font-bold text-[var(--brand)] text-base">
                  {itinerary.totalEstimatedCost}
                </span>{' '}
                for the trip
              </p>
            )}
            <div className="flex flex-wrap gap-3">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[var(--ink)] border border-[var(--ink)]/20 rounded-md hover:border-[var(--ink)]/40 hover:bg-white/60 transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </FadeIn>

        {(itinerary.interests.length > 0 ||
          itinerary.specialRequests?.trim()) && (
          <FadeIn delay={0.05}>
            <div className="mb-10 border-y border-[var(--ink)]/12 py-6 grid sm:grid-cols-2 gap-6">
              {itinerary.interests.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-2">
                    Interests
                  </p>
                  <p className="text-[var(--ink)] text-sm leading-relaxed capitalize">
                    {itinerary.interests.join(' · ')}
                  </p>
                </div>
              )}
              {itinerary.specialRequests?.trim() && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-2">
                    Notes
                  </p>
                  <p className="text-[var(--ink)] text-sm leading-relaxed">
                    {itinerary.specialRequests.trim()}
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {itinerary.generalTips && itinerary.generalTips.length > 0 && (
          <FadeIn delay={0.08}>
            <div className="mb-10">
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="w-full flex items-center justify-between gap-3 text-left group"
              >
                <p className="text-[var(--zellige)] text-xs font-bold tracking-[0.22em] uppercase">
                  Local tips
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] group-hover:text-[var(--brand)] transition-colors">
                  {showTips ? 'Hide' : 'Show'}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${showTips ? 'rotate-180' : ''}`}
                  />
                </span>
              </button>
              {showTips && (
                <ol className="mt-5 space-y-3 border-t border-[var(--ink)]/12 pt-5">
                  {itinerary.generalTips.map((tip, index) => (
                    <li
                      key={index}
                      className="flex gap-4 text-[var(--ink-soft)] text-sm leading-relaxed"
                    >
                      <span className="font-display font-bold text-[var(--brand)] tabular-nums shrink-0 w-6">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[var(--ink)]">{tip}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.1}>
          <div className="mb-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink-soft)] mb-3">
              Day by day
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[var(--ink)]/12 pb-3 overflow-x-auto">
              {itinerary.itinerary.map((day, index) => (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => setSelectedDay(index)}
                  className={`shrink-0 text-sm font-semibold pb-2 border-b-2 -mb-[13px] transition-colors ${
                    selectedDay === index
                      ? 'border-[var(--brand)] text-[var(--brand)]'
                      : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]'
                  }`}
                >
                  Day {day.day}
                  <span className="hidden sm:inline font-normal text-[var(--ink-soft)]/70 ml-1.5">
                    {formatDate(day.date)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {itinerary.itinerary[selectedDay] && (
          <FadeIn key={selectedDay} delay={0.05}>
            <DayCard
              day={itinerary.itinerary[selectedDay]}
              dayIndex={selectedDay}
              onEditActivity={handleEditActivity}
              onRemoveActivity={handleRemoveActivity}
            />
          </FadeIn>
        )}

        <div className="mt-14 border-t border-[var(--ink)]/12 pt-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/edit"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" /> Customize stops
            </Link>
            <Link
              href="/feedback"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-[var(--ink)] border border-[var(--ink)]/20 rounded-md hover:border-[var(--ink)]/40 hover:bg-white/60 transition-colors"
            >
              <Star className="w-4 h-4" /> Rate this trip
            </Link>
          </div>
          <p className="text-[var(--ink-soft)] text-sm">
            {formatDateLong(
              itinerary.itinerary[selectedDay]?.date || itinerary.startDate
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
