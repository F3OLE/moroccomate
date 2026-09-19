'use client';

import { LucideIcon } from 'lucide-react';

interface RatingButtonProps {
  rating: 'loved' | 'neutral' | 'disliked';
  icon: LucideIcon;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function RatingButton({
  rating,
  icon: Icon,
  label,
  isSelected,
  onClick,
}: RatingButtonProps) {
  const getColorClasses = () => {
    if (!isSelected) {
      return 'bg-gray-100 text-gray-600 hover:bg-gray-200';
    }

    const colors: Record<string, string> = {
      loved: 'bg-green-100 text-green-700 border-green-500',
      neutral: 'bg-yellow-100 text-yellow-700 border-yellow-500',
      disliked: 'bg-red-100 text-red-700 border-red-500',
    };

    return colors[rating] || 'bg-gray-100 text-gray-600';
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 ${getColorClasses()}`}
    >
      <Icon className={`w-6 h-6 ${isSelected ? 'scale-110' : ''}`} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

