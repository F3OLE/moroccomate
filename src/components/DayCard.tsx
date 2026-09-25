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
    <section className="pt-8">
      <header className="flex items-end justify-between gap-4 mb-2">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)] leading-none">
            Day {day.day}
          </h2>
          <p className="text-[var(--ink-soft)] text-sm mt-2">{formatDate(day.date)}</p>
        </div>
        <p className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--brand)] tabular-nums leading-none shrink-0">
          {String(day.activities.length).padStart(2, '0')}
        </p>
      </header>
      <p className="text-xs text-[var(--ink-soft)] mb-6">
        {activities} {activities === 1 ? 'stop' : 'stops'}
        {meals > 0 && (
          <>
            {' '}
            · {meals} {meals === 1 ? 'meal' : 'meals'}
          </>
        )}
        {estCost > 0 && <> · ~${estCost}</>}
      </p>

      <div className="border-t border-[var(--ink)]/15">
        {day.activities.length === 0 ? (
          <p className="py-10 text-[var(--ink-soft)] text-sm">
            No stops on this day yet. Customize to add some.
          </p>
        ) : (
          day.activities.map((activity, activityIndex) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              dayIndex={dayIndex}
              activityIndex={activityIndex}
              isLast={activityIndex === day.activities.length - 1}
              onEdit={onEditActivity}
              onRemove={onRemoveActivity}
            />
          ))
        )}
      </div>
    </section>
  );
}
