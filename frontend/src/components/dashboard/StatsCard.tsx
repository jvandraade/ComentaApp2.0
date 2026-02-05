import React from 'react';
import { Card } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}) => {
  return (
    <Card variant="solid" className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-accent-darkGray text-sm font-medium mb-1">{title}</p>
          <p className="text-accent text-3xl font-bold">{value}</p>
          {subtitle && <p className="text-accent-darkGray text-xs mt-1">{subtitle}</p>}
        </div>

        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: color }} />
    </Card>
  );
};
