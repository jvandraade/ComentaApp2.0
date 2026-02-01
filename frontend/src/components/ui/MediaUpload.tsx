import React, { useState, useRef } from 'react';
import { cn } from '../../utils/cn';
import { uploadService } from '../../services/uploadService';
import { Upload, X, Image, Loader2 } from 'lucide-react';

interface MediaPreview {
  file: File;
  url: string; // local preview URL
  serverUrl?: string; // URL returned by backend after upload
}

interface MediaUploadProps {
  onChange: (urls: string[]) => void;
  maxFiles?: number;
  className?: string;
}

export const MediaUpload: React.FC<MediaUploadProps> = ({ onChange, maxFiles = 5, className }) => {
  const [previews, setPreviews] = useState<MediaPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/mov',
    'video/webm',
  ];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError('');

    // Validate max files
    if (previews.length + files.length > maxFiles) {
      setError(`Máximo de ${maxFiles} arquivos permitidos`);
      return;
    }

    // Validate file types and sizes
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        setError('Tipo de arquivo não permitido. Use imagens ou vídeos.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Arquivo maior que 10MB não é permitido.');
        return;
      }
    }

    // Create local previews
    const newPreviews: MediaPreview[] = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviews(prev => [...prev, ...newPreviews]);

    // Upload files to backend
    setIsUploading(true);
    try {
      const { urls } = await uploadService.uploadImages(files);

      // Update previews with server URLs
      setPreviews(prev => {
        const updated = [...prev];
        let urlIndex = 0;
        for (let i = prev.length - files.length; i < prev.length; i++) {
          updated[i] = { ...updated[i], serverUrl: urls[urlIndex] };
          urlIndex++;
        }
        return updated;
      });

      // Notify parent with all server URLs
      const allServerUrls = [
        ...previews.filter(p => p.serverUrl).map(p => p.serverUrl as string),
        ...urls,
      ];
      onChange(allServerUrls);
    } catch (err) {
      setError('Erro ao upload dos arquivos');
      // Remove failed previews
      setPreviews(prev => prev.slice(0, prev.length - files.length));
      console.error(err);
    } finally {
      setIsUploading(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);

    // Notify parent with remaining server URLs
    const remainingUrls = updated.filter(p => p.serverUrl).map(p => p.serverUrl as string);
    onChange(remainingUrls);

    // Revoke object URL
    URL.revokeObjectURL(previews[index].url);
  };

  return (
    <div className={cn('space-y-3', className)}>
      <label className="block text-sm font-medium text-accent-gray">
        Fotos / Vídeos (opcional)
      </label>

      {/* Upload Button */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer',
          'hover:border-primary/50 transition-all duration-300',
          isUploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          disabled={isUploading || previews.length >= maxFiles}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2">
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-accent-gray" />
          )}
          <p className="text-accent-gray text-sm">
            {isUploading ? 'Enviando arquivos...' : 'Clique para adicionar fotos ou vídeos'}
          </p>
          <p className="text-accent-darkGray text-xs">
            Máximo {maxFiles} arquivos • 10MB cada • Imagens ou vídeos
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Previews Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="w-full h-32 rounded-xl overflow-hidden bg-dark-lighter border border-white/10">
                {preview.file.type.startsWith('video/') ? (
                  <div className="w-full h-full flex items-center justify-center bg-dark-lighter">
                    <Image className="w-8 h-8 text-accent-gray" />
                    <span className="text-accent-darkGray text-xs absolute bottom-2 left-2">
                      Vídeo
                    </span>
                  </div>
                ) : (
                  <img
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Upload status indicator */}
              <div className="absolute bottom-2 left-2">
                {preview.serverUrl ? (
                  <span className="text-xs bg-green-500/80 text-white px-2 py-0.5 rounded-full">
                    ✅ Enviado
                  </span>
                ) : (
                  <span className="text-xs bg-yellow-500/80 text-white px-2 py-0.5 rounded-full">
                    ⏳ Enviando
                  </span>
                )}
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
