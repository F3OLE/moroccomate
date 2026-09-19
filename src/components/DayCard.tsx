'use client';

import { Day } from '@/types';
import ActivityItem from './ActivityItem';

interface DayCardProps {
  day: Day;
  dayIndex: number;
  onEditActivity?: (dayIndex: number, activityIndex: number) => void;
  onRemoveActivity?: (dayIndex: number, activityIndex: number) => void;
}

export default function DayCard({
  day,
  dayIndex,
  onEditActivity,
  onRemoveActivity,
}: DayCardProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

  const meals = day.activities.filter((a) => a.type === 'meal').length;
  const activities = day.activities.filter((a) => a.type === 'activity').length;
  const estCost = day.activities.reduce((total, activity) => {
    const cost = parseInt(activity.cost.replace(/[^0-9]/g, '')) || 0;
    return total + cost;
  }, 0);

  return (
    <section className="bg-[#FFFAF5] rounded-sm shadow-[0_24px_60px_rgba(0,0,0,0.35)] overflow-hidden border border-white/20">
      <header className="relative px-5 sm:px-8 pt-7 pb-6 border-b border-[#2C3E50]/10 bg-gradient-to-r from-[#FCE8E8]/80 to-[#FFFAF5]">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D93D3D]" />
        <div className="flex items-end justify-between gap-4 pl-2">
          <div>
            <p className="text-[#D93D3D] text-[11px] font-bold tracking-[0.22em] uppercase mb-2">
              Today&apos;s route
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C3E50] leading-none">
              Day {day.day}
            </h2>
            <p className="text-[#2C3E50]/65 text-sm mt-2 font-medium">{formatDate(day.date)}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#2C3E50]/45 mb-1">
              Stops
            </p>
            <p className="text-5xl sm:text-6xl font-black text-[#D93D3D] tabular-nums leading-none">
              {String(day.activities.length).padStart(2, '0')}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-0">
        {day.activities.map((activity, activityIndex) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            dayIndex={dayIndex}
            activityIndex={activityIndex}
            isLast={activityIndex === day.activities.length - 1}
            onEdit={onEditActivity}
            onRemove={onRemoveActivity}
          />
        ))}
      </div>

      <footer className="grid grid-cols-3 border-t border-[#2C3E50]/10 bg-[#F5E6D3]/35">
        <div className="px-4 py-4 text-center border-r border-[#2C3E50]/10">
          <p className="text-[10px] uppercase tracking-wider font-bold text-[#2C3E50]/45 mb-1">
            Activities
          </p>
          <p className="text-xl font-bold text-[#2C3E50]">{activities}</p>
        </div>
        <div className="px-4 py-4 text-center border-r border-[#2C3E50]/10">
          <p className="text-[10px] uppercase tracking-wider font-bold text-[#2C3E50]/45 mb-1">
            Meals
          </p>
          <p className="text-xl font-bold text-[#2C3E50]">{meals}</p>
        </div>
        <div className="px-4 py-4 text-center">
          <p className="text-[10px] uppercase tracking-wider font-bold text-[#2C3E50]/45 mb-1">
            Day est.
          </p>
          <p className="text-xl font-bold text-[#D93D3D]">${estCost || '—'}</p>
        </div>
      </footer>
    </section>
  );
}
