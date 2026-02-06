import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Complaint } from '../../types/complaint';
import { likeService } from '../../services/likeService';
import { ApiError } from '../../types/error';
import { Heart, MessageCircle, MapPin, User } from 'lucide-react';
import { formatTimeAgo } from '../../utils/format';

interface PostCardProps {
  complaint: Complaint;
  onCommentClick: (complaint: Complaint) => void;
}

export const PostCard = React.memo<PostCardProps>(({ complaint, onCommentClick }) => {
  const [isLiked, setIsLiked] = useState(complaint.isLikedByCurrentUser);
  const [likesCount, setLikesCount] = useState(complaint.likesCount);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      const response = await likeService.toggleLike(complaint.id);
      setIsLiked(response.isLiked);
      setLikesCount(response.likesCount);
    } catch (err) {
      const error = err as ApiError;
      console.error(error.response?.data?.message || 'Error toggling like');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Card variant="solid" hover={false} className="overflow-hidden">
      {/* User Info */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            {complaint.user.avatarUrl ? (
              <img
                src={complaint.user.avatarUrl}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-dark" />
            )}
          </div>
          <div>
            <p className="text-accent font-semibold text-sm">
              {complaint.user.firstName} {complaint.user.lastName}
            </p>
            <p className="text-accent-darkGray text-xs">{formatTimeAgo(complaint.createdAt)}</p>
          </div>
        </div>

        {/* Category Badge */}
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            backgroundColor: `${complaint.category.color}20`,
            color: complaint.category.color,
          }}
        >
          {complaint.category.name}
        </span>
      </div>

      {/* Title & Description */}
      <div className="mb-4 px-1">
        <h3 className="text-accent font-bold text-lg">{complaint.title}</h3>
        <p className="text-accent-gray text-sm mt-1">{complaint.description}</p>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 mb-4 px-1">
        <MapPin className="w-4 h-4 text-primary" />
        <p className="text-accent-darkGray text-xs">{complaint.address}</p>
      </div>

      {/* Media */}
      {complaint.media.length > 0 && (
        <div className={`mb-4 ${complaint.media.length === 1 ? '' : 'grid grid-cols-2 gap-1'}`}>
          {complaint.media.slice(0, 4).map((media, index) => (
            <div
              key={media.id}
              className={`relative overflow-hidden bg-dark-lighter ${
                complaint.media.length === 1 ? 'rounded-xl h-64' : 'rounded-lg h-40'
              }`}
            >
              {media.mediaType === 'Image' ? (
                <img
                  src={`http://localhost:5281${media.mediaUrl}`}
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-dark-lighter">
                  <p className="text-accent-darkGray text-sm">🎥 Vídeo</p>
                </div>
              )}

              {/* Show +X more indicator */}
              {index === 3 && complaint.media.length > 4 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <p className="text-white font-bold text-xl">+{complaint.media.length - 4}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Status Badge */}
      <div className="px-1 mb-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            complaint.status === 'Pending'
              ? 'bg-yellow-500/20 text-yellow-500'
              : complaint.status === 'InProgress'
                ? 'bg-blue-500/20 text-blue-500'
                : complaint.status === 'Resolved'
                  ? 'bg-green-500/20 text-green-500'
                  : 'bg-red-500/20 text-red-500'
          }`}
        >
          {complaint.status === 'Pending'
            ? '⏳ Pendente'
            : complaint.status === 'InProgress'
              ? '🔄 Em andamento'
              : complaint.status === 'Resolved'
                ? '✅ Resolvido'
                : '❌ Rejeitado'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/10 px-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : ''}`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          <span>{likesCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCommentClick(complaint)}
          className="flex items-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{complaint.commentsCount}</span>
        </Button>
      </div>
    </Card>
  );
});

export default PostCard;
