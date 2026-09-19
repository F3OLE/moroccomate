'use client';

import { Calendar } from 'lucide-react';
import { Day } from '@/types';
import ActivityItem from './ActivityItem';

interface DayCardProps {
  day: Day;
  dayIndex: number;
  onEditActivity?: (dayIndex: number, activityIndex: number) => void;
  onRemoveActivity?: (dayIndex: number, activityIndex: number) => void;
}

export default function DayCard({ day, dayIndex, onEditActivity, onRemoveActivity }: DayCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="glass liquid-glass rounded-2xl p-5 sm:p-8">
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-[#2C3E50]/10">
        <div>
          <p className="text-[#D93D3D] text-xs font-bold tracking-[0.2em] uppercase mb-1">
            Schedule
          </p>
          <h2 className="text-3xl font-bold text-[#2C3E50]">Day {day.day}</h2>
          <div className="flex items-center gap-2 text-[#2C3E50]/6 mt-1 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(day.date)}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider text-[#2C3E50]/45">Stops</div>
          <div className="text-4xl font-black text-[#D93D3D] tabular-nums drop-shadow-sm">
            {String(day.activities.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[#D93D3D] via-[#E1B168]/50 to-transparent" />

        <div className="space-y-5">
          {day.activities.map((activity, activityIndex) => (
            <div key={activity.id} className="relative pl-12">
              <div className="absolute left-3.5 top-6 w-3 h-3 rounded-full bg-[#D93D3D] ring-4 ring-white/80 z-10" />
              <ActivityItem
                activity={activity}
                dayIndex={dayIndex}
                activityIndex={activityIndex}
                onEdit={onEditActivity}
                onRemove={onRemoveActivity}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#2C3E50]/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#2C3E50]/45 mb-1">Activities</div>
          <div className="text-xl font-bold text-[#2C3E50]">
            {day.activities.filter((a) => a.type === 'activity').length}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[#2C3E50]/45 mb-1">Meals</div>
          <div className="text-xl font-bold text-[#2C3E50]">
            {day.activities.filter((a) => a.type === 'meal').length}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[#2C3E50]/45 mb-1">Duration</div>
          <div className="text-xl font-bold text-[#2C3E50]">
            {day.activities.reduce((total, activity) => {
              const duration = parseInt(activity.duration) || 0;
              return total + duration;
            }, 0)}
            h
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[#2C3E50]/45 mb-1">Est. cost</div>
          <div className="text-xl font-bold text-[#D93D3D]">
            $
            {day.activities.reduce((total, activity) => {
              const cost = parseInt(activity.cost.replace(/[^0-9]/g, '')) || 0;
              return total + cost;
            }, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
