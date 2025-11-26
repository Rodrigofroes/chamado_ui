export type FileType = 'image' | 'video' | 'pdf' | 'document' | 'other';

export const getFileType = (file: File): FileType => {
  const type = file.type.toLowerCase();
  
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  if (type === 'application/pdf') return 'pdf';
  if (
    type.includes('document') ||
    type.includes('word') ||
    type.includes('excel') ||
    type.includes('spreadsheet') ||
    type.includes('presentation') ||
    type.includes('powerpoint') ||
    type.includes('text')
  ) return 'document';
  
  return 'other';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'FILE';
};