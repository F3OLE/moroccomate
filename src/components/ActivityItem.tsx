'use client';

import { useState } from 'react';
import {
  MapPin,
  Clock,
  DollarSign,
  Edit,
  Trash2,
  Lightbulb,
  Utensils,
  Landmark,
  Mountain,
  Moon,
  ExternalLink,
  ChevronDown,
  BadgeCheck,
  Sun,
} from 'lucide-react';
import { Activity } from '@/types';

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

  const getActivityIcon = (type: string, timeSlot: string) => {
    if (type === 'meal') return Utensils;
    const icons: Record<string, typeof Mountain> = {
      morning: Mountain,
      afternoon: Landmark,
      evening: Moon,
      lunch: Utensils,
      dinner: Utensils,
    };
    return icons[timeSlot] || Landmark;
  };

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

  const Icon = getActivityIcon(activity.type, activity.timeSlot);
  const clock = activity.clock || defaultClock(activity.timeSlot);
  const accent =
    activity.type === 'meal'
      ? 'border-[#E1B168]'
      : activity.timeSlot === 'evening'
        ? 'border-[#7a3280]/50'
        : 'border-[#D93D3D]';

  return (
    <article
      className={`relative grid grid-cols-[4.5rem_1fr] sm:grid-cols-[5.5rem_1fr] gap-3 sm:gap-5 py-5 ${
        !isLast ? 'border-b border-[#2C3E50]/08' : ''
      }`}
    >
      <div className="pt-1 text-right pr-1">
        <p className="text-lg sm:text-xl font-bold text-[#D93D3D] tabular-nums leading-none">
          {clock}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#2C3E50]/45 mt-1.5">
          {getTimeSlotLabel(activity.timeSlot)}
        </p>
      </div>

      <div className={`pl-4 sm:pl-5 border-l-2 ${accent}`}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-[2px] bg-[#FCE8E8] border border-[#D93D3D]/20 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-[#D93D3D]" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-bold text-[#2C3E50] text-base sm:text-lg leading-snug">
                  {activity.title}
                </h3>
                {activity.badge === 'partner' && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-[1px] bg-[#D93D3D] text-white">
                    <BadgeCheck className="w-3 h-3" />
                    Partner
                  </span>
                )}
                {activity.badge === 'verified' && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-[1px] bg-[#2C3E50] text-white">
                    <BadgeCheck className="w-3 h-3" />
                    Verified
                  </span>
                )}
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-[1px] ${
                    activity.type === 'meal'
                      ? 'bg-[#E1B168]/25 text-[#8a6a2a]'
                      : 'bg-[#2C3E50]/08 text-[#2C3E50]'
                  }`}
                >
                  {activity.type}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-[#2C3E50]/65">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D93D3D]/70" />
                  {activity.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activity.duration}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#2C3E50]">
                  <DollarSign className="w-3.5 h-3.5 text-[#D93D3D]" />
                  {activity.cost}
                </span>
              </div>
              {activity.bestTime && (
                <p className="mt-1.5 text-xs font-medium text-[#C4923A] inline-flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5" />
                  Best time: {activity.bestTime}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(dayIndex, activityIndex)}
                className="p-1.5 text-[#2C3E50]/35 hover:text-[#2C3E50]"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(dayIndex, activityIndex)}
                className="p-1.5 text-[#2C3E50]/35 hover:text-[#D93D3D]"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-[#2C3E50]/80 text-sm leading-relaxed mb-3 pl-0 sm:pl-12">
          {activity.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 pl-0 sm:pl-12">
          {activity.category && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C4923A]">
              {activity.category}
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#2C3E50]/50 hover:text-[#D93D3D]"
          >
            Details
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            />
          </button>
          {activity.mapsUrl && (
            <a
              href={activity.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#D93D3D] hover:underline ml-auto"
            >
              Google Maps
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {showDetails && activity.tips && (
          <div className="mt-3 ml-0 sm:ml-12 flex items-start gap-2 p-3 bg-[#E1B168]/15 border border-[#E1B168]/30 rounded-[2px]">
            <Lightbulb className="w-4 h-4 text-[#C4923A] mt-0.5 shrink-0" />
            <p className="text-sm text-[#2C3E50] leading-relaxed">{activity.tips}</p>
          </div>
        )}
      </div>
    </article>
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
