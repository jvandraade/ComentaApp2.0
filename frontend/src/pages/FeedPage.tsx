import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { PostCard } from '../components/feed/PostCard';
import { CommentsModal } from '../components/feed/CommentsModal';
import { Skeleton } from '../components/ui/Skeleton';
import { SearchBar } from '../components/search/SearchBar';
import { CategoryFilter } from '../components/search/CategoryFilter';
import { StatusFilter } from '../components/search/StatusFilter';
import { Button } from '../components/ui/Button';
import { complaintService } from '../services/complaintService';
import { Complaint, Category } from '../types/complaint';
import { ApiError } from '../types/error';
import { Filter, ChevronUp, ChevronDown } from 'lucide-react';

export const FeedPage: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Search & Filter state
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Comments Modal
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  // Search whenever filters change
  useEffect(() => {
    setPage(1);
    searchComplaints(1);
  }, [keyword, selectedCategory, selectedStatus]);

  // Load when page changes
  useEffect(() => {
    if (page > 1) {
      searchComplaints(page);
    }
  }, [page]);

  const loadCategories = async () => {
    try {
      const data = await complaintService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories', err);
    }
  };

  const searchComplaints = async (currentPage: number) => {
    try {
      setIsLoading(true);
      const result = await complaintService.searchComplaints({
        keyword: keyword || undefined,
        categoryId: selectedCategory || undefined,
        status: selectedStatus || undefined,
        page: currentPage,
        pageSize: 10,
      });

      setComplaints(result.data);
      setTotalPages(result.totalPages);
      setHasNextPage(result.hasNextPage);
      setHasPreviousPage(result.hasPreviousPage);
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Erro ao buscar reclamações');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentClick = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsCommentsOpen(true);
  };

  const clearFilters = () => {
    setKeyword('');
    setSelectedCategory('');
    setSelectedStatus('');
  };

  const hasActiveFilters = keyword || selectedCategory || selectedStatus;

  // Skeleton loading state
  if (isLoading && page === 1) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-12 w-full" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-9 w-24 rounded-full" />
            ))}
          </div>
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
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Header */}
        <div className="text-center py-2">
          <h1 className="text-3xl font-bold text-accent">
            Feed de <span className="text-primary">Reclamações</span>
          </h1>
          <p className="text-accent-gray mt-1">Veja as reclamações da sua cidade</p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={setKeyword} />

        {/* Filter Toggle (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-accent-gray hover:text-primary transition-colors text-sm"
        >
          <Filter className="w-4 h-4" />
          <span>Filtros</span>
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {hasActiveFilters && <span className="ml-2 w-2 h-2 bg-primary rounded-full"></span>}
        </button>

        {/* Filters Panel */}
        {showFilters && (
          <div className="space-y-4 p-4 bg-dark-lighter rounded-xl border border-white/10">
            {/* Categories */}
            <div>
              <p className="text-accent-gray text-sm font-medium mb-2">Categorias</p>
              <CategoryFilter
                categories={categories}
                selectedCategoryId={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            {/* Status */}
            <div>
              <p className="text-accent-gray text-sm font-medium mb-2">Status</p>
              <StatusFilter selectedStatus={selectedStatus} onSelect={setSelectedStatus} />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpar filtros
              </Button>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500 rounded-xl">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Results Count */}
        <p className="text-accent-darkGray text-sm">
          {complaints.length === 1
            ? 'Reclamação encontrada'
            : `Reclamações encontradas (${complaints.length})`}
        </p>

        {/* Feed */}
        {complaints.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-accent-darkGray text-lg">Nenhuma reclamação encontrada.</p>
            <p className="text-accent-darkGray text-sm mt-2">
              {hasActiveFilters ? 'Tente alterar os filtros.' : 'Seja o primeiro a registrar uma!'}
            </p>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-4">
                Limpar filtros
              </Button>
            )}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 py-4">
            <Button
              variant="secondary"
              size="sm"
              disabled={!hasPreviousPage}
              onClick={() => setPage(prev => prev - 1)}
            >
              Anterior
            </Button>

            <span className="text-accent-gray text-sm">
              Página {page} de {totalPages}
            </span>

            <Button
              variant="secondary"
              size="sm"
              disabled={!hasNextPage}
              onClick={() => setPage(prev => prev + 1)}
            >
              Próxima
            </Button>
          </div>
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
