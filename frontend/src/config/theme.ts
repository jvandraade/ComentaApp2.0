export const theme = {
  colors: {
    primary: {
      DEFAULT: '#00D9FF',
      dark: '#0AC8E8',
      light: '#33E1FF',
      gradient: 'linear-gradient(135deg, #00D9FF 0%, #0AC8E8 100%)',
    },
    dark: {
      DEFAULT: '#0A0E27',
      lighter: '#1A1F3A',
      light: '#2A2F4A',
      gradient: 'linear-gradient(180deg, #0A0E27 0%, #1A1F3A 100%)',
    },
    accent: {
      DEFAULT: '#FFFFFF',
      gray: '#E5E7EB',
      darkGray: '#9CA3AF',
    },
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    glow: '0 0 20px rgba(0, 217, 255, 0.3)',
    glowHover: '0 0 30px rgba(0, 217, 255, 0.5)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    cardHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export type Theme = typeof theme;
