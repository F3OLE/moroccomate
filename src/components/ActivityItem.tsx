'use client';

import { useState } from 'react';
import {
  MapPin,
  Clock,
  Edit,
  Trash2,
  ExternalLink,
  ChevronDown,
  BadgeCheck,
  Sun,
} from 'lucide-react';
import { Activity } from '@/types';
import BookButton from '@/components/BookButton';
import HoverImageReveal from '@/components/HoverImageReveal';
import { cityDisplayName, PLACES } from '@/data/places';

interface ActivityItemProps {
  activity: Activity;
  dayIndex: number;
  activityIndex: number;
  isLast?: boolean;
  onEdit?: (dayIndex: number, activityIndex: number) => void;
  onRemove?: (dayIndex: number, activityIndex: number) => void;
}

export default function ActivityItem({
  activity,
  dayIndex,
  activityIndex,
  isLast = false,
  onEdit,
  onRemove,
}: ActivityItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getTimeSlotLabel = (timeSlot: string) => {
    const labels: Record<string, string> = {
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
      lunch: 'Lunch',
      dinner: 'Dinner',
    };
    return labels[timeSlot] || timeSlot;
  };

  const clock = activity.clock || defaultClock(activity.timeSlot);
  const known = PLACES.find(
    (p) =>
      p.id === activity.placeId ||
      p.name.toLowerCase() === activity.title.toLowerCase()
  );
  const bookPlace = {
    placeId: activity.placeId || known?.id,
    placeName: activity.title,
    city: known ? cityDisplayName(known.city) : undefined,
    badge: activity.badge || known?.badge,
  };
  const typeLabel =
    activity.type === 'meal'
      ? 'Meal'
      : activity.type === 'transport'
        ? 'Transport'
        : activity.category || 'Stop';

  const body = (
    <article className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
      <div className="sm:w-[4.75rem] shrink-0 pt-0.5">
        <p className="font-display text-xl font-bold text-[var(--brand)] tabular-nums leading-none">
          {clock}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] mt-1.5">
          {getTimeSlotLabel(activity.timeSlot)}
        </p>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <h3 className="font-display text-xl font-bold text-[var(--ink)] group-hover/hover-img:text-[var(--brand)] transition-colors leading-snug">
                {activity.title}
              </h3>
              <span className="text-xs uppercase tracking-wider text-[var(--ink-soft)]/70">
                {typeLabel}
              </span>
              {(activity.badge === 'partner' || known?.badge === 'partner') && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">
                  <BadgeCheck className="w-3 h-3" /> Partner
                </span>
              )}
              {(activity.badge === 'verified' || known?.badge === 'verified') &&
                activity.badge !== 'partner' &&
                known?.badge !== 'partner' && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--zellige)]">
                    <BadgeCheck className="w-3 h-3" /> Verified
                  </span>
                )}
            </div>
            <p className="text-sm text-[var(--ink-soft)] mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {activity.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                {activity.duration}
              </span>
            </p>
            {activity.bestTime && (
              <p className="text-xs text-[var(--saffron)] font-medium mb-2 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5" />
                Best time: {activity.bestTime}
              </p>
            )}
            <p className="text-sm text-[var(--ink-soft)] leading-relaxed max-w-2xl">
              {activity.description}
            </p>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(dayIndex, activityIndex)}
                className="p-1.5 text-[var(--ink-soft)]/50 hover:text-[var(--ink)] transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(dayIndex, activityIndex)}
                className="p-1.5 text-[var(--ink-soft)]/50 hover:text-[var(--brand)] transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-display text-sm font-bold text-[var(--brand)]">
            {activity.cost}
          </span>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] hover:text-[var(--brand)] transition-colors"
          >
            Details
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            />
          </button>
          <BookButton
            place={bookPlace}
            compact
            className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand)] hover:underline"
          />
          {activity.mapsUrl && (
            <a
              href={activity.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline"
            >
              Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {showDetails && activity.tips && (
          <p className="mt-3 text-sm text-[var(--ink)] leading-relaxed border-l-2 border-[var(--saffron)] pl-3">
            {activity.tips}
          </p>
        )}
      </div>
    </article>
  );

  if (known?.image) {
    return (
      <HoverImageReveal
        src={known.image}
        alt={activity.title}
        tone="light"
        focus={known.imageFocus || 'center center'}
        className={`min-h-[7.5rem] py-6 border-b border-[var(--ink)]/12 -mx-1 sm:-mx-2 ${
          isLast ? 'border-b-0' : ''
        }`}
      >
        {body}
      </HoverImageReveal>
    );
  }

  return (
    <div
      className={`py-6 border-b border-[var(--ink)]/12 ${isLast ? 'border-b-0' : ''}`}
    >
      {body}
    </div>
  );
}

function defaultClock(timeSlot: string) {
  const map: Record<string, string> = {
    morning: '09:30',
    lunch: '12:30',
    afternoon: '15:00',
    dinner: '19:30',
    evening: '21:00',
  };
  return map[timeSlot] || '10:00';
}
