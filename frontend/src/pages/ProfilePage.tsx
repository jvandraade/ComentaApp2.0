import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Skeleton } from '../components/ui/Skeleton';
import { userService } from '../services/userService';
import { useAuth } from '../hooks/useAuth';
import { UserProfile, UpdateProfile } from '../types/user';
import { ApiError } from '../types/error';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { formatDate } from '../utils/format';

export const ProfilePage: React.FC = () => {
  const { user: authUser, login } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<UpdateProfile>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const data = await userService.getProfile();
      setProfile(data);
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber || '',
        address: data.address || '',
        city: data.city,
        state: data.state,
      });
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Erro ao carregar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const updatedProfile = await userService.updateProfile(formData);
      setProfile(updatedProfile);
      setIsEditing(false);
      setSuccess('Perfil atualizado com sucesso!');

      // Update auth context with new name
      if (authUser) {
        login(localStorage.getItem('token') || '', {
          ...authUser,
          firstName: updatedProfile.firstName,
          lastName: updatedProfile.lastName,
        });
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Erro ao atualizar perfil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber || '',
        address: profile.address || '',
        city: profile.city,
        state: profile.state,
      });
    }
    setIsEditing(false);
    setError('');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="flex items-center gap-6 mb-6">
              <Skeleton variant="circular" className="w-24 h-24" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </Card>
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <Card>
            <p className="text-red-500">Erro ao carregar perfil</p>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-accent">Meu Perfil</h1>
            <p className="text-accent-gray mt-1">Gerencie suas informações pessoais</p>
          </div>
          {!isEditing && <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>}
        </div>

        {/* Messages */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500 rounded-xl">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-500/10 border border-green-500 rounded-xl">
            <p className="text-green-500">{success}</p>
          </div>
        )}

        {/* Profile Card */}
        <Card>
          <div className="flex items-start gap-6 mb-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-dark text-3xl font-bold">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="Avatar"
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  `${profile.firstName[0]}${profile.lastName[0]}`
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-accent">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-accent-gray flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {profile.email}
              </p>
              <p className="text-accent-darkGray text-sm mt-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Membro desde {formatDate(profile.createdAt)}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome"
                leftIcon={<User className="w-4 h-4" />}
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!isEditing}
                required
              />

              <Input
                label="Sobrenome"
                leftIcon={<User className="w-4 h-4" />}
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                disabled={!isEditing}
                required
              />
            </div>

            <Input
              label="Email"
              type="email"
              leftIcon={<Mail className="w-4 h-4" />}
              value={profile.email}
              disabled
            />

            <Input
              label="Telefone"
              type="tel"
              leftIcon={<Phone className="w-4 h-4" />}
              placeholder="(79) 99999-9999"
              value={formData.phoneNumber}
              onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
              disabled={!isEditing}
            />

            <Input
              label="Endereço"
              leftIcon={<MapPin className="w-4 h-4" />}
              placeholder="Rua exemplo, 123"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              disabled={!isEditing}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Cidade"
                leftIcon={<MapPin className="w-4 h-4" />}
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                disabled={!isEditing}
                required
                className="md:col-span-2"
              />

              <Input
                label="Estado"
                maxLength={2}
                leftIcon={<MapPin className="w-4 h-4" />}
                value={formData.state}
                onChange={e => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                disabled={!isEditing}
                required
              />
            </div>

            {/* Actions */}
            {isEditing && (
              <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="ghost" onClick={handleCancel} disabled={isSaving}>
                  Cancelar
                </Button>
                <Button type="submit" isLoading={isSaving}>
                  Salvar Alterações
                </Button>
              </div>
            )}
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
