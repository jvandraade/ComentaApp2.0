import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { StatsCard } from '../components/dashboard/StatsCard';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { dashboardService } from '../services/dashboardService';
import { Statistics } from '../types/dashboard';
import { ApiError } from '../types/error';
import { FileText, Users, Clock, RefreshCw, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { formatTimeAgo } from '../utils/format';

export const DashboardPage: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setIsLoading(true);
      const data = await dashboardService.getStatistics();
      setStatistics(data);
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Erro ao carregar estatísticas');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-32 w-full rounded-2xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96 w-full rounded-2xl" />
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !statistics) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto">
          <div className="p-4 bg-red-500/10 border border-red-500 rounded-xl">
            <p className="text-red-500">{error || 'Erro ao carregar dados'}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-accent">
            Dashboard de <span className="text-primary">Estatísticas</span>
          </h1>
          <p className="text-accent-gray mt-1">Visão geral do sistema</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total de Reclamações"
            value={statistics.totalComplaints}
            icon={FileText}
            color="#00D9FF"
          />

          <StatsCard
            title="Usuários Cadastrados"
            value={statistics.totalUsers}
            icon={Users}
            color="#8B5CF6"
          />

          <StatsCard
            title="Pendentes"
            value={statistics.pendingComplaints}
            icon={Clock}
            color="#F59E0B"
          />

          <StatsCard
            title="Resolvidas"
            value={statistics.resolvedComplaints}
            icon={CheckCircle}
            color="#10B981"
          />
        </div>

        {/* Status Breakdown */}
        <Card>
          <h2 className="text-xl font-bold text-accent mb-4">Status das Reclamações</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
              <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-accent">{statistics.pendingComplaints}</p>
              <p className="text-accent-darkGray text-sm">Pendentes</p>
            </div>

            <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <RefreshCw className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-accent">{statistics.inProgressComplaints}</p>
              <p className="text-accent-darkGray text-sm">Em Andamento</p>
            </div>

            <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-accent">{statistics.resolvedComplaints}</p>
              <p className="text-accent-darkGray text-sm">Resolvidas</p>
            </div>

            <div className="text-center p-4 bg-red-500/10 rounded-xl border border-red-500/20">
              <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-accent">{statistics.rejectedComplaints}</p>
              <p className="text-accent-darkGray text-sm">Rejeitadas</p>
            </div>
          </div>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Complaints by Category */}
          <Card>
            <h2 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Reclamações por Categoria
            </h2>
            <div className="space-y-3">
              {statistics.complaintsByCategory.map((cat, index) => {
                const percentage = (cat.count / statistics.totalComplaints) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-accent text-sm font-medium">{cat.categoryName}</span>
                      <span className="text-accent-gray text-sm">
                        {cat.count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-dark-lighter rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: cat.categoryColor,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Recent Complaints */}
          <Card>
            <h2 className="text-xl font-bold text-accent mb-4">Reclamações Recentes</h2>
            <div className="space-y-3">
              {statistics.recentComplaints.map(complaint => (
                <div
                  key={complaint.id}
                  className="p-3 bg-dark-lighter rounded-lg border border-white/10 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-accent font-medium text-sm line-clamp-1">
                        {complaint.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-accent-darkGray text-xs">
                          {complaint.categoryName}
                        </span>
                        <span className="text-accent-darkGray text-xs">•</span>
                        <span className="text-accent-darkGray text-xs">
                          {formatTimeAgo(complaint.createdAt)}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
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
                        ? 'Pendente'
                        : complaint.status === 'InProgress'
                          ? 'Em Andamento'
                          : complaint.status === 'Resolved'
                            ? 'Resolvida'
                            : 'Rejeitada'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
