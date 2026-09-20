'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const MAX_TRIP_DAYS = 14;
const MAX_AHEAD_MONTHS = 12;

function toYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseYmd(s: string) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatShort(s: string) {
  if (!s) return '—';
  return parseYmd(s).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function daysBetween(a: string, b: string) {
  return Math.round(
    (parseYmd(b).getTime() - parseYmd(a).getTime()) / (1000 * 60 * 60 * 24)
  );
}

interface TripDateRangeProps {
  startDate?: string;
  endDate?: string;
  onChange: (start: string, end: string) => void;
}

export default function TripDateRange({
  startDate = '',
  endDate = '',
  onChange,
}: TripDateRangeProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const maxDate = useMemo(
    () =>
      startOfDay(
        new Date(
          today.getFullYear(),
          today.getMonth() + MAX_AHEAD_MONTHS,
          today.getDate()
        )
      ),
    [today]
  );

  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [picking, setPicking] = useState<'start' | 'end'>(
    startDate && !endDate ? 'end' : 'start'
  );

  const monthLabel = view.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const cells = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const first = new Date(year, month, 1);
    const startPad = first.getDay(); // Sun=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const out: (Date | null)[] = [];
    for (let i = 0; i < startPad; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(new Date(year, month, d));
    while (out.length % 7 !== 0) out.push(null);
    return out;
  }, [view]);

  const canGoPrev =
    view.getFullYear() > today.getFullYear() ||
    (view.getFullYear() === today.getFullYear() &&
      view.getMonth() > today.getMonth());

  const canGoNext =
    view.getFullYear() < maxDate.getFullYear() ||
    (view.getFullYear() === maxDate.getFullYear() &&
      view.getMonth() < maxDate.getMonth());

  const isDisabled = (d: Date) => {
    if (d < today || d > maxDate) return true;
    if (picking === 'end' && startDate) {
      const start = parseYmd(startDate);
      if (d < start) return true;
      if (d > addDays(start, MAX_TRIP_DAYS - 1)) return true;
    }
    return false;
  };

  const inRange = (d: Date) => {
    if (!startDate || !endDate) return false;
    const t = d.getTime();
    return t > parseYmd(startDate).getTime() && t < parseYmd(endDate).getTime();
  };

  const handleDay = (d: Date) => {
    if (isDisabled(d)) return;
    const ymd = toYmd(d);

    if (picking === 'start' || !startDate) {
      onChange(ymd, '');
      setPicking('end');
      return;
    }

    // Picking end
    if (d < parseYmd(startDate)) {
      onChange(ymd, '');
      setPicking('end');
      return;
    }

    onChange(startDate, ymd);
    setPicking('start');
  };

  const applyPreset = (nights: number) => {
    const start = today;
    const end = addDays(start, Math.min(nights, MAX_TRIP_DAYS - 1));
    onChange(toYmd(start), toYmd(end));
    setPicking('start');
    setView(new Date(start.getFullYear(), start.getMonth(), 1));
  };

  const nightCount =
    startDate && endDate ? daysBetween(startDate, endDate) : 0;

  return (
    <div className="rounded-2xl border border-white/35 bg-white/10 p-3 sm:p-4">
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          type="button"
          onClick={() => setPicking('start')}
          className={`text-left rounded-xl px-3 py-2.5 border transition ${
            picking === 'start'
              ? 'border-[#E1B168] bg-[#E1B168]/15'
              : 'border-white/25 bg-white/5'
          }`}
        >
          <p className="text-[10px] uppercase tracking-wider font-bold text-white/50">
            Check-in
          </p>
          <p className="text-sm font-semibold text-white mt-0.5">
            {formatShort(startDate)}
          </p>
        </button>
        <button
          type="button"
          onClick={() => startDate && setPicking('end')}
          className={`text-left rounded-xl px-3 py-2.5 border transition ${
            picking === 'end'
              ? 'border-[#E1B168] bg-[#E1B168]/15'
              : 'border-white/25 bg-white/5'
          }`}
        >
          <p className="text-[10px] uppercase tracking-wider font-bold text-white/50">
            Check-out
          </p>
          <p className="text-sm font-semibold text-white mt-0.5">
            {formatShort(endDate)}
          </p>
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {[
          { label: '3 days', n: 2 },
          { label: '5 days', n: 4 },
          { label: '1 week', n: 6 },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p.n)}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/30 text-white/80 hover:border-[#E1B168] hover:text-[#E1B168] transition"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-2 px-1">
        <button
          type="button"
          aria-label="Previous month"
          disabled={!canGoPrev}
          onClick={() =>
            setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
          }
          className="p-1.5 rounded-lg text-white/80 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <p className="text-sm font-bold text-white flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#E1B168]" />
          {monthLabel}
        </p>
        <button
          type="button"
          aria-label="Next month"
          disabled={!canGoNext}
          onClick={() =>
            setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
          }
          className="p-1.5 rounded-lg text-white/80 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div
            key={`${d}-${i}`}
            className="text-center text-[10px] font-bold text-white/40 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} className="aspect-square" />;

          const ymd = toYmd(d);
          const disabled = isDisabled(d);
          const isStart = startDate === ymd;
          const isEnd = endDate === ymd;
          const isToday = sameDay(d, today);
          const ranged = inRange(d);

          return (
            <button
              key={ymd}
              type="button"
              disabled={disabled}
              onClick={() => handleDay(d)}
              className={[
                'aspect-square rounded-lg text-sm font-semibold transition relative',
                disabled
                  ? 'text-white/20 cursor-not-allowed'
                  : 'text-white hover:bg-white/15',
                ranged ? 'bg-[#D93D3D]/25' : '',
                isStart || isEnd
                  ? 'bg-[#D93D3D] text-white shadow-[0_0_12px_rgba(217,61,61,0.45)]'
                  : '',
                isToday && !isStart && !isEnd
                  ? 'ring-1 ring-[#E1B168]/70'
                  : '',
              ].join(' ')}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] text-white/50 leading-relaxed">
        {picking === 'end' && startDate && !endDate
          ? `Pick check-out · max ${MAX_TRIP_DAYS} days from check-in`
          : startDate && endDate
            ? `${nightCount + 1} day${nightCount === 0 ? '' : 's'} · trips within the next ${MAX_AHEAD_MONTHS} months`
            : `Today onward · up to ${MAX_TRIP_DAYS} days`}
      </p>
    </div>
  );
}

export function isValidTripRange(startDate?: string, endDate?: string) {
  if (!startDate || !endDate) return false;
  const today = startOfDay(new Date());
  const maxDate = startOfDay(
    new Date(
      today.getFullYear(),
      today.getMonth() + MAX_AHEAD_MONTHS,
      today.getDate()
    )
  );
  const start = parseYmd(startDate);
  const end = parseYmd(endDate);
  if (start < today || end < start) return false;
  if (start > maxDate || end > maxDate) return false;
  if (daysBetween(startDate, endDate) > MAX_TRIP_DAYS - 1) return false;
  return true;
}
