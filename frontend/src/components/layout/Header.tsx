import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-dark border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <span className="text-dark font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold text-accent hidden sm:block">ComentaApp</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-accent-gray hover:text-primary transition-colors">
              Feed
            </a>
            <a href="#" className="text-accent-gray hover:text-primary transition-colors">
              Minhas Reclamações
            </a>
            <a href="#" className="text-accent-gray hover:text-primary transition-colors">
              Mapa
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors relative">
              <Bell className="w-5 h-5 text-accent-gray" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            <div className="hidden md:flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <User className="w-5 h-5 text-accent-gray" />
              </button>
              <span className="text-accent-gray text-sm">
                {user?.firstName} {user?.lastName}
              </span>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              leftIcon={<LogOut className="w-4 h-4" />}
              className="hidden md:inline-flex"
            >
              Sair
            </Button>

            <Button size="sm" className="hidden sm:inline-flex">
              Nova Reclamação
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-accent-gray" />
              ) : (
                <Menu className="w-5 h-5 text-accent-gray" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-3">
              <div className="px-3 py-2 text-accent-gray text-sm">
                {user?.firstName} {user?.lastName}
              </div>
              <a href="#" className="text-accent-gray hover:text-primary transition-colors py-2">
                Feed
              </a>
              <a href="#" className="text-accent-gray hover:text-primary transition-colors py-2">
                Minhas Reclamações
              </a>
              <a href="#" className="text-accent-gray hover:text-primary transition-colors py-2">
                Mapa
              </a>
              <Button size="sm" className="mt-2">
                Nova Reclamação
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLogout}
                leftIcon={<LogOut className="w-4 h-4" />}
              >
                Sair
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
