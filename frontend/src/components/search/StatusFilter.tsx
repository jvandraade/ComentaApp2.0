import React from 'react';

interface StatusFilterProps {
  selectedStatus: string;
  onSelect: (status: string) => void;
}

const statuses = [
  { value: '', label: 'Todos', color: '#6B7280' },
  { value: 'Pending', label: '⏳ Pendente', color: '#F59E0B' },
  { value: 'InProgress', label: '🔄 Em andamento', color: '#3B82F6' },
  { value: 'Resolved', label: '✅ Resolvido', color: '#10B981' },
  { value: 'Rejected', label: '❌ Rejeitado', color: '#EF4444' },
];

export const StatusFilter: React.FC<StatusFilterProps> = ({ selectedStatus, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {statuses.map(status => (
        <button
          key={status.value}
          onClick={() => onSelect(status.value)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedStatus === status.value
              ? 'text-dark font-semibold'
              : 'bg-dark-lighter border border-white/10 text-accent-gray hover:border-white/20'
          }`}
          style={selectedStatus === status.value ? { backgroundColor: status.color } : {}}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};
