'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Users,
  Utensils,
  Landmark,
  Palette,
  Mountain,
  ShoppingBag,
  Moon,
  DollarSign,
  ArrowLeft,
  ArrowRight,
  Check,
} from 'lucide-react';
import { generateItinerary } from '@/lib/api';
import { TripFormData } from '@/types';
import { FadeIn } from '@/components/FadeIn';
import TripDateRange, { isValidTripRange } from '@/components/TripDateRange';

const interests = [
  { id: 'food', label: 'Food & Markets', icon: Utensils },
  { id: 'history', label: 'History & Culture', icon: Landmark },
  { id: 'arts', label: 'Arts & Crafts', icon: Palette },
  { id: 'adventure', label: 'Adventure & Nature', icon: Mountain },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'nightlife', label: 'Nightlife', icon: Moon },
];

const budgetOptions = [
  { value: 'budget', label: 'Budget', range: '$30–60 / day', num: '01' },
  { value: 'mid-range', label: 'Mid-range', range: '$60–120 / day', num: '02' },
  { value: 'luxury', label: 'Luxury', range: '$120+ / day', num: '03' },
];

const groupSizes = [
  { value: 'solo', label: 'Solo', num: '01' },
  { value: 'couple', label: 'Couple', num: '02' },
  { value: 'family', label: 'Family', num: '03' },
  { value: 'friends', label: 'Friends', num: '04' },
];

const cities = [
  {
    value: 'marrakesh',
    label: 'Marrakech',
    description: 'Medina, souks, rooftops, clubs',
    num: '01',
  },
  {
    value: 'casablanca',
    label: 'Casablanca',
    description: 'Corniche, Hassan II, nightlife',
    num: '02',
  },
];

export default function PlanPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<TripFormData>>({});

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleInputChange = (field: keyof TripFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDatesChange = (start: string, end: string) => {
    setFormData((prev) => ({ ...prev, startDate: start, endDate: end }));
  };

  const getGroupSizeNumber = (groupSize: string) => {
    const sizeMap: Record<string, number> = {
      solo: 1,
      couple: 2,
      family: 4,
      friends: 6,
    };
    return sizeMap[groupSize] || 2;
  };

  const handleSubmit = async () => {
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest');
      return;
    }
    if (
      !formData.city ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.groupSize ||
      !formData.budget
    ) {
      alert('Please fill in all required fields');
      return;
    }
    if (!isValidTripRange(formData.startDate, formData.endDate)) {
      alert('Pick a trip within the next year, up to 14 days.');
      return;
    }

    setIsLoading(true);
    try {
      const budgetMap: Record<string, number> = {
        budget: 50,
        'mid-range': 90,
        luxury: 150,
      };
      const daysDiff = Math.ceil(
        (new Date(formData.endDate!).getTime() -
          new Date(formData.startDate!).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      const itinerary = await generateItinerary({
        city: formData.city,
        startDate: formData.startDate!,
        endDate: formData.endDate!,
        groupSize: getGroupSizeNumber(formData.groupSize),
        interests: selectedInterests,
        budget: (budgetMap[formData.budget] || 90) * daysDiff,
        specialRequests: formData.specialRequests,
        userId: 'user123',
      });
      sessionStorage.setItem('currentItinerary', JSON.stringify(itinerary));
      router.push('/itinerary');
    } catch (error) {
      console.error(error);
      alert('Error generating itinerary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const optionRow = (
    selected: boolean,
    onClick: () => void,
    num: string,
    title: string,
    subtitle?: string
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left flex items-center gap-4 sm:gap-5 py-4 px-3 sm:px-4 rounded-2xl transition-all duration-300 ${
        selected
          ? 'liquid-glass-dark text-white scale-[1.01]'
          : 'liquid-chip text-white/90 hover:bg-white/25'
      }`}
    >
      <span className="text-3xl sm:text-4xl font-black tabular-nums w-12 shrink-0 glass-num">
        {num}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-lg sm:text-xl font-bold text-white">{title}</div>
        {subtitle && <div className="text-sm mt-0.5 text-white/60">{subtitle}</div>}
      </div>
      <span
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${
          selected
            ? 'border-[#E1B168] bg-[#E1B168] text-[#2C3E50]'
            : 'border-white/35'
        }`}
      >
        {selected && <Check className="w-4 h-4" strokeWidth={3} />}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen plan-scene relative pt-14 sm:pt-16">
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-3 sm:px-6 py-8 sm:py-10 md:py-14">
        <FadeIn>
          <Link
            href="/"
            className="liquid-chip inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 text-sm font-medium px-3 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <p className="text-[#E1B168] text-xs font-bold tracking-[0.28em] uppercase mb-3">
            Liquid plan
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
            Build your days
          </h1>
          <p className="text-white/75 text-base md:text-lg mb-8 max-w-md">
            Numbered picks. Frosted glass. Real spots on Maps — not emoji checklists.
          </p>
        </FadeIn>

        <div className="flex gap-2 mb-3">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                step <= currentStep ? 'bg-[#D93D3D] shadow-[0_0_12px_rgba(217,61,61,0.6)]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
        <p className="text-white/50 text-sm mb-6">Step {currentStep} / 3</p>

        {/* MAIN LIQUID PANEL — impossible to miss */}
        <FadeIn delay={0.05}>
          <div className="liquid-glass rounded-3xl p-5 sm:p-8">
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2 drop-shadow">
                  <MapPin className="w-5 h-5 text-[#E1B168]" />
                  Where & when
                </h2>
                <p className="text-white/65 mb-6 text-sm">City, then dates.</p>

                <div className="space-y-2 mb-8">
                  {cities.map((city) =>
                    optionRow(
                      formData.city === city.value,
                      () => handleInputChange('city', city.value),
                      city.num,
                      city.label,
                      city.description
                    )
                  )}
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/55 mb-2">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    Travel dates
                  </label>
                  <TripDateRange
                    startDate={formData.startDate}
                    endDate={formData.endDate}
                    onChange={handleDatesChange}
                  />
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isValidTripRange(formData.startDate, formData.endDate)) {
                        alert('Pick check-in and check-out (max 14 days, from today).');
                        return;
                      }
                      setCurrentStep(2);
                    }}
                    className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                    disabled={
                      !formData.city ||
                      !isValidTripRange(formData.startDate, formData.endDate)
                    }
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#E1B168]" />
                  Who & what
                </h2>
                <p className="text-white/65 mb-6 text-sm">Group · interests · budget</p>

                <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
                  Group
                </p>
                <div className="space-y-2 mb-8">
                  {groupSizes.map((size) =>
                    optionRow(
                      formData.groupSize === size.value,
                      () => handleInputChange('groupSize', size.value),
                      size.num,
                      size.label
                    )
                  )}
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
                  Interests
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {interests.map((interest) => {
                    const on = selectedInterests.includes(interest.id);
                    const Icon = interest.icon;
                    return (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => toggleInterest(interest.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                          on
                            ? 'bg-[#D93D3D] text-white shadow-[0_0_20px_rgba(217,61,61,0.45)]'
                            : 'liquid-chip text-white/90 hover:bg-white/25'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {interest.label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> Budget
                </p>
                <div className="space-y-2 mb-8">
                  {budgetOptions.map((budget) =>
                    optionRow(
                      formData.budget === budget.value,
                      () => handleInputChange('budget', budget.value),
                      budget.num,
                      budget.label,
                      budget.range
                    )
                  )}
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="btn-secondary w-full sm:w-auto"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                    disabled={
                      !formData.groupSize ||
                      !formData.budget ||
                      selectedInterests.length === 0
                    }
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Anything else?</h2>
                <p className="text-white/65 mb-6 text-sm">Optional notes for the plan.</p>
                <textarea
                  value={formData.specialRequests || ''}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={5}
                  className="input-field text-white placeholder:text-white/40 mb-8"
                  placeholder="Vegetarian, club nights, photography spots…"
                />
                <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="btn-secondary w-full sm:w-auto"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                    disabled={selectedInterests.length === 0 || isLoading}
                  >
                    {isLoading ? 'Building…' : 'Generate itinerary'}
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
