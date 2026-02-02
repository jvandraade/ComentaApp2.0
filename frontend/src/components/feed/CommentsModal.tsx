import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Complaint, CommentData } from '../../types/complaint';
import { commentService } from '../../services/commentService';
import { ApiError } from '../../types/error';
import { User, Send, Trash2 } from 'lucide-react';
import { formatTimeAgo } from '../../utils/format';
import { useAuth } from '../../hooks/useAuth';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaint: Complaint | null;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose, complaint }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && complaint) {
      loadComments();
    }
  }, [isOpen, complaint]);

  const loadComments = async () => {
    if (!complaint) return;
    setIsLoading(true);

    try {
      const data = await commentService.getComments(complaint.id);
      setComments(data);
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Erro ao carregar comentários');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaint || !newComment.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const comment = await commentService.createComment(complaint.id, {
        content: newComment.trim(),
      });
      setComments(prev => [...prev, comment]);
      setNewComment('');
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Erro ao criar comentário');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await commentService.deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Erro ao deletar comentário');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={complaint ? `Comentários - ${complaint.title}` : ''}
      size="lg"
    >
      {/* Error */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg mb-4">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
        {isLoading ? (
          <p className="text-accent-gray text-center py-4">Carregando comentários...</p>
        ) : comments.length === 0 ? (
          <p className="text-accent-darkGray text-center py-4">
            Nenhum comentário ainda. Seja o primeiro!
          </p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center flex-shrink-0">
                {comment.user.avatarUrl ? (
                  <img
                    src={comment.user.avatarUrl}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-dark" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-accent font-semibold text-sm">
                    {comment.user.firstName} {comment.user.lastName}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-accent-darkGray text-xs">
                      {formatTimeAgo(comment.createdAt)}
                    </p>
                    {/* Delete button - only for comment author */}
                    {user?.email === comment.user.id && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-accent-darkGray hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-accent-gray text-sm mt-0.5">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          placeholder="Escreva um comentário..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="sm" isLoading={isSubmitting} disabled={!newComment.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </Modal>
  );
};

export default CommentsModal;
