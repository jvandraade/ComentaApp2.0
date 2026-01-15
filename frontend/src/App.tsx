import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { Search, Plus } from 'lucide-react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-5xl font-bold text-accent mb-4">
            Bem-vindo ao <span className="text-primary">ComentaApp</span>
          </h1>
          <p className="text-accent-gray text-lg max-w-2xl mx-auto">
            Plataforma de reclamações urbanas para tornar nossa cidade melhor
          </p>
        </div>

        {/* Components Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buttons */}
          <Card>
            <h3 className="text-xl font-bold text-accent mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button isLoading>Loading</Button>
              <Button leftIcon={<Plus className="w-4 h-4" />}>With Icon</Button>
            </div>
          </Card>

          {/* Inputs */}
          <Card>
            <h3 className="text-xl font-bold text-accent mb-4">Inputs</h3>
            <div className="space-y-4">
              <Input placeholder="Email" type="email" />
              <Input
                label="Search"
                placeholder="Buscar reclamações..."
                leftIcon={<Search className="w-4 h-4" />}
              />
              <Input label="With Error" placeholder="Email" error="Email inválido" />
            </div>
          </Card>

          {/* Cards */}
          <Card variant="glass">
            <h3 className="text-xl font-bold text-accent mb-2">Glass Card</h3>
            <p className="text-accent-gray">Card com efeito de vidro usando glassmorphism</p>
          </Card>

          <Card variant="solid">
            <h3 className="text-xl font-bold text-accent mb-2">Solid Card</h3>
            <p className="text-accent-gray">Card sólido sem transparência</p>
          </Card>

          {/* Modal Trigger */}
          <Card>
            <h3 className="text-xl font-bold text-accent mb-4">Modal</h3>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          </Card>

          {/* Skeleton Loaders */}
          <Card>
            <h3 className="text-xl font-bold text-accent mb-4">Skeleton Loaders</h3>
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Example Modal">
        <p className="text-accent-gray mb-4">Este é um exemplo de modal com animações suaves!</p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>Confirmar</Button>
        </div>
      </Modal>
    </MainLayout>
  );
}

export default App;
