'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Plus,
  GripVertical,
  Edit,
  Trash2,
  MapPin,
  Clock,
  DollarSign,
} from 'lucide-react';
import { Itinerary, Activity } from '@/types';
import { FadeIn } from '@/components/FadeIn';

export default function EditPage() {
  const router = useRouter();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [editingActivity, setEditingActivity] = useState<{
    dayIndex: number;
    activityIndex: number;
  } | null>(null);

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
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative liquid-glass rounded-2xl p-8 text-center max-w-md mx-4">
          <h2 className="text-2xl font-bold text-white mb-3">No itinerary yet</h2>
          <p className="text-white/70 mb-6">Create a plan first, then come back to edit.</p>
          <Link href="/plan" className="btn-primary inline-flex">
            Plan your trip
          </Link>
        </div>
      </div>
    );
  }

  const handleRemoveActivity = (dayIndex: number, activityIndex: number) => {
    const updatedItinerary = { ...itinerary };
    updatedItinerary.itinerary[dayIndex].activities.splice(activityIndex, 1);
    setItinerary(updatedItinerary);
    sessionStorage.setItem('currentItinerary', JSON.stringify(updatedItinerary));
  };

  const handleAddActivity = (dayIndex: number) => {
    const newActivity: Activity = {
      id: `new_${Date.now()}`,
      type: 'activity',
      title: 'New Activity',
      location: 'Location',
      timeSlot: 'afternoon',
      duration: '2 hours',
      cost: '$15-25',
      description: 'Add your description here',
      tips: 'Add helpful tips here',
    };

    const updatedItinerary = { ...itinerary };
    updatedItinerary.itinerary[dayIndex].activities.push(newActivity);
    setItinerary(updatedItinerary);
    sessionStorage.setItem('currentItinerary', JSON.stringify(updatedItinerary));

    setEditingActivity({
      dayIndex,
      activityIndex: updatedItinerary.itinerary[dayIndex].activities.length - 1,
    });
  };

  const handleSaveActivity = (
    dayIndex: number,
    activityIndex: number,
    updatedActivity: Activity
  ) => {
    const updatedItinerary = { ...itinerary };
    updatedItinerary.itinerary[dayIndex].activities[activityIndex] = updatedActivity;
    setItinerary(updatedItinerary);
    sessionStorage.setItem('currentItinerary', JSON.stringify(updatedItinerary));
    setEditingActivity(null);
  };

  const handleSaveItinerary = () => {
    alert('Itinerary saved successfully!');
    router.push('/itinerary');
  };

  return (
    <div className="min-h-screen plan-scene relative pt-14 sm:pt-16">
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-10">
        <FadeIn>
          <Link
            href="/itinerary"
            className="liquid-chip inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 text-sm font-medium px-3 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to itinerary
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-[#E1B168] text-xs font-bold tracking-[0.25em] uppercase mb-2">
                Edit
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Your itinerary</h1>
              <p className="text-white/65 mt-2 text-sm sm:text-base">
                Add, edit, or remove stops. Then save.
              </p>
            </div>
            <button
              onClick={handleSaveItinerary}
              className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              Save changes
            </button>
          </div>
        </FadeIn>

        <div className="flex overflow-x-auto gap-2 pb-2 mb-6 -mx-1 px-1">
          {itinerary.itinerary.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                selectedDay === index
                  ? 'bg-[#D93D3D] text-white shadow-lg'
                  : 'liquid-chip text-white hover:bg-white/20'
              }`}
            >
              <span className="glass-num mr-1.5 inline">
                {String(day.day).padStart(2, '0')}
              </span>
              Day {day.day}
            </button>
          ))}
        </div>

        <FadeIn delay={0.05}>
          <div className="liquid-glass rounded-3xl p-4 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Day {itinerary.itinerary[selectedDay].day}
                </h2>
                <p className="text-white/60 text-sm">
                  {new Date(itinerary.itinerary[selectedDay].date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleAddActivity(selectedDay)}
                className="btn-primary !bg-[#E1B168] !text-[#2C3E50] hover:!bg-[#d4a45c] inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                Add stop
              </button>
            </div>

            <div className="space-y-3">
              {itinerary.itinerary[selectedDay].activities.map((activity, activityIndex) => (
                <div
                  key={activity.id}
                  className="liquid-chip rounded-2xl p-3 sm:p-4 transition-all"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="text-white/40 pt-1 hidden sm:block">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <span className="glass-num text-xl font-black tabular-nums w-8 shrink-0 pt-0.5">
                      {String(activityIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      {editingActivity &&
                      editingActivity.dayIndex === selectedDay &&
                      editingActivity.activityIndex === activityIndex ? (
                        <ActivityEditForm
                          activity={activity}
                          onSave={(updatedActivity) =>
                            handleSaveActivity(selectedDay, activityIndex, updatedActivity)
                          }
                          onCancel={() => setEditingActivity(null)}
                        />
                      ) : (
                        <ActivityDisplay
                          activity={activity}
                          onEdit={() =>
                            setEditingActivity({ dayIndex: selectedDay, activityIndex })
                          }
                          onRemove={() => handleRemoveActivity(selectedDay, activityIndex)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {itinerary.itinerary[selectedDay].activities.length === 0 && (
                <p className="text-white/60 text-center py-8">
                  No stops yet. Tap Add stop.
                </p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function ActivityDisplay({
  activity,
  onEdit,
  onRemove,
}: {
  activity: Activity;
  onEdit: () => void;
  onRemove: () => void;
}) {
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

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-white mb-1 truncate">{activity.title}</h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#E1B168]" />
            {activity.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#E1B168]" />
            {activity.duration}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-[#E1B168]" />
            {activity.cost}
          </span>
          <span className="px-2 py-0.5 bg-[#D93D3D]/25 text-[#E1B168] rounded-full text-xs font-semibold">
            {getTimeSlotLabel(activity.timeSlot)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={onRemove}
          className="p-2 rounded-lg text-white/70 hover:text-red-400 hover:bg-white/10"
          title="Remove"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ActivityEditForm({
  activity,
  onSave,
  onCancel,
}: {
  activity: Activity;
  onSave: (activity: Activity) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Activity>(activity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const label = 'block text-xs font-bold uppercase tracking-wider text-white/55 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className={label}>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field-glass"
            required
          />
        </div>
        <div>
          <label className={label}>Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="input-field-glass"
            required
          />
        </div>
        <div>
          <label className={label}>Duration</label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="input-field-glass"
          />
        </div>
        <div>
          <label className={label}>Cost</label>
          <input
            type="text"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            className="input-field-glass"
          />
        </div>
        <div>
          <label className={label}>Time slot</label>
          <select
            value={formData.timeSlot}
            onChange={(e) =>
              setFormData({
                ...formData,
                timeSlot: e.target.value as Activity['timeSlot'],
              })
            }
            className="input-field-glass"
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div>
          <label className={label}>Type</label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as Activity['type'],
              })
            }
            className="input-field-glass"
          >
            <option value="activity">Activity</option>
            <option value="meal">Meal</option>
            <option value="transport">Transport</option>
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input-field-glass"
          rows={3}
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-2">
        <button type="button" onClick={onCancel} className="btn-secondary w-full sm:w-auto">
          Cancel
        </button>
        <button type="submit" className="btn-primary w-full sm:w-auto">
          Save stop
        </button>
      </div>
    </form>
  );
}
