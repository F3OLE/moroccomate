'use client';

import { useState } from 'react';
import {
  MapPin,
  Clock,
  DollarSign,
  Edit,
  Trash2,
  Info,
  Lightbulb,
  Utensils,
  Landmark,
  Mountain,
  Moon,
  ExternalLink,
} from 'lucide-react';
import { Activity } from '@/types';

interface ActivityItemProps {
  activity: Activity;
  dayIndex: number;
  activityIndex: number;
  onEdit?: (dayIndex: number, activityIndex: number) => void;
  onRemove?: (dayIndex: number, activityIndex: number) => void;
}

export default function ActivityItem({
  activity,
  dayIndex,
  activityIndex,
  onEdit,
  onRemove,
}: ActivityItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getActivityIcon = (type: string, timeSlot: string) => {
    if (type === 'meal') {
      return Utensils;
    }

    const icons: Record<string, any> = {
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

  return (
    <div className="rounded-xl border border-white/60 bg-white/50 backdrop-blur-md p-4 hover:bg-white/70 transition-colors duration-200">
      {/* Activity Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 bg-[#D93D3D]/10 border border-[#D93D3D]/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-[#D93D3D]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-bold text-[#2C3E50] truncate">{activity.title}</h3>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                  activity.type === 'meal'
                    ? 'bg-emerald-500/15 text-emerald-800'
                    : 'bg-[#2C3E50]/10 text-[#2C3E50]'
                }`}
              >
                {activity.type}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#2C3E50]/65">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {activity.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {activity.duration}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {activity.cost}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1.5 text-[#2C3E50]/4 hover:text-[#D93D3D] transition-colors"
            title="More info"
          >
            <Info className="w-4 h-4" />
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(dayIndex, activityIndex)}
              className="p-1.5 text-[#2C3E50]/4 hover:text-[#2C3E50] transition-colors"
              title="Edit activity"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
          {onRemove && (
            <button
              onClick={() => onRemove(dayIndex, activityIndex)}
              className="p-1.5 text-[#2C3E50]/4 hover:text-red-600 transition-colors"
              title="Remove activity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <p className="text-[#2C3E50]/75 text-sm mb-3 leading-relaxed">{activity.description}</p>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-[#2C3E50]/10 space-y-3">
          {activity.tips && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-[#E1B168]/15 border border-[#E1B168]/25">
              <Lightbulb className="w-4 h-4 text-[#C4923A] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-[#2C3E50] text-sm mb-1">Tip</h4>
                <p className="text-[#2C3E50]/75 text-sm">{activity.tips}</p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-[#2C3E50]">Slot:</span>
              <span className="ml-2 text-[#2C3E50]/65">{getTimeSlotLabel(activity.timeSlot)}</span>
            </div>
            <div>
              <span className="font-medium text-[#2C3E50]">Type:</span>
              <span className="ml-2 text-[#2C3E50]/65 capitalize">{activity.type}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2C3E50]/45">
          {getTimeSlotLabel(activity.timeSlot)}
          {activity.category ? ` · ${activity.category}` : ''}
        </span>
        <div className="flex items-center gap-2">
          {activity.mapsUrl && (
            <a
              href={activity.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#D93D3D] hover:underline"
            >
              Google Maps
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

