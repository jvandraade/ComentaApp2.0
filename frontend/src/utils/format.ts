export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

export const formatTimeAgo = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const intervals = {
    ano: 31536000,
    mês: 2592000,
    semana: 604800,
    dia: 86400,
    hora: 3600,
    minuto: 60,
  };

  for (const [name, secondsInInterval] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInInterval);
    if (interval >= 1) {
      return `há ${interval} ${name}${interval !== 1 ? 's' : ''}`;
    }
  }

  return 'agora';
};
