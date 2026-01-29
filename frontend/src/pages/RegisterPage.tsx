import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { ApiError } from '../types/error';
import { Mail, Lock, User, Phone, MapPin } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    phoneNumber: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.register(formData);
      login(response.token, {
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role,
      });
      navigate('/');
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-4 py-12">
      <Card className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4">
            <span className="text-dark font-bold text-2xl">C</span>
          </div>
          <h1 className="text-3xl font-bold text-accent mb-2">Crie sua conta</h1>
          <p className="text-accent-gray">Junte-se a nós para melhorar sua cidade</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome"
              placeholder="João"
              leftIcon={<User className="w-4 h-4" />}
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              required
            />

            <Input
              label="Sobrenome"
              placeholder="Silva"
              leftIcon={<User className="w-4 h-4" />}
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            leftIcon={<Mail className="w-4 h-4" />}
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              value={formData.confirmPassword}
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Cidade"
              placeholder="Aracaju"
              leftIcon={<MapPin className="w-4 h-4" />}
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
              required
              className="md:col-span-2"
            />

            <Input
              label="Estado"
              placeholder="SE"
              maxLength={2}
              leftIcon={<MapPin className="w-4 h-4" />}
              value={formData.state}
              onChange={e => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
              required
            />
          </div>

          <Input
            label="Telefone (opcional)"
            type="tel"
            placeholder="(79) 99999-9999"
            leftIcon={<Phone className="w-4 h-4" />}
            value={formData.phoneNumber}
            onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
          />

          <Input
            label="Endereço (opcional)"
            placeholder="Rua exemplo, 123"
            leftIcon={<MapPin className="w-4 h-4" />}
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Criar Conta
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-accent-gray text-sm">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
