import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { PostCard } from '../components/feed/PostCard';
import { CommentsModal } from '../components/feed/CommentsModal';
import { Skeleton } from '../components/ui/Skeleton';
import { complaintService } from '../services/complaintService';
import { Complaint } from '../types/complaint';
import { ApiError } from '../types/error';

export const FeedPage: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setIsLoading(true);
      const data = await complaintService.getComplaints();
      setComplaints(data);
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Erro ao carregar reclamações');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentClick = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsCommentsOpen(true);
  };

  // Skeleton loading state
  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-dark-lighter rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" className="w-10 h-10" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-48 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold text-accent">
            Feed de <span className="text-primary">Reclamações</span>
          </h1>
          <p className="text-accent-gray mt-1">Veja as reclamações da sua cidade</p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500 rounded-xl">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Feed */}
        {complaints.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-accent-darkGray text-lg">Nenhuma reclamação ainda.</p>
            <p className="text-accent-darkGray text-sm mt-2">Seja o primeiro a registrar uma!</p>
          </div>
        ) : (
          complaints.map(complaint => (
            <PostCard
              key={complaint.id}
              complaint={complaint}
              onCommentClick={handleCommentClick}
            />
          ))
        )}
      </div>

      {/* Comments Modal */}
      <CommentsModal
        isOpen={isCommentsOpen}
        onClose={() => {
          setIsCommentsOpen(false);
          setSelectedComplaint(null);
        }}
        complaint={selectedComplaint}
      />
    </MainLayout>
  );
};
