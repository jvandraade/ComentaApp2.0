import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Skeleton } from '../components/ui/Skeleton';
import { complaintService } from '../services/complaintService';
import { Category } from '../types/complaint';
import { ApiError } from '../types/error';
import { AlertCircle, MapPin } from 'lucide-react';
import { MediaUpload } from '../components/ui/MediaUpload';

export const NewComplaintPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    address: '',
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
  });

  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await complaintService.getCategories();
      setCategories(data);
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Erro ao carregar categorias');
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.categoryId) {
      setError('Selecione uma categoria');
      setIsSubmitting(false);
      return;
    }

    try {
      await complaintService.createComplaint({
        categoryId: formData.categoryId,
        title: formData.title,
        description: formData.description,
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude,
        mediaUrls: mediaUrls,
      });

      navigate('/'); // Redireciona para home após criar
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Erro ao criar reclamação');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingCategories) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <Card>
            <Skeleton className="h-8 w-64 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-accent">Nova Reclamação</h1>
          <p className="text-accent-gray mt-1">Relate um problema urbano na sua região</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-accent-gray mb-3">Categoria *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map(category => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, categoryId: category.id })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.categoryId === category.id
                        ? 'border-primary bg-primary/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className="w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${category.color}20`, color: category.color }}
                      >
                        🏗️
                      </div>
                      <p className="text-accent text-sm font-medium">{category.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <Input
              label="Título *"
              placeholder="Ex: Buraco grande na Av. Principal"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
              maxLength={200}
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-accent-gray mb-2">Descrição *</label>
              <textarea
                className="w-full px-4 py-3 bg-dark-lighter border border-white/10 rounded-xl text-accent placeholder:text-accent-darkGray focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 min-h-[120px]"
                placeholder="Descreva o problema com mais detalhes..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                required
                maxLength={2000}
              />
              <p className="text-accent-darkGray text-xs mt-1">
                {formData.description.length}/2000 caracteres
              </p>
            </div>

            {/* Media Upload */}
            <MediaUpload onChange={urls => setMediaUrls(urls)} maxFiles={5} />

            {/* Address */}
            <Input
              label="Endereço *"
              placeholder="Ex: Rua das Flores, 123 - Centro"
              leftIcon={<MapPin className="w-4 h-4" />}
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              required
              maxLength={500}
            />

            {/* Location Note */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-blue-400 text-sm">
                💡 <strong>Dica:</strong> Seja o mais específico possível no endereço para facilitar
                a localização do problema.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/')}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" isLoading={isSubmitting}>
                Enviar Reclamação
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};
export default NewComplaintPage;
