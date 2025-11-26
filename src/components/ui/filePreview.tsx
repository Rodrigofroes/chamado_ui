import { FileText, File, Video, Image as ImageIcon, X } from "lucide-react";
import { getFileType, getFileExtension } from "@/lib/utils/fileUtils";
import { Button } from "./button";

interface FilePreviewProps {
  file: File;
  onDelete: () => void;
}

export const FilePreview = ({ file, onDelete }: FilePreviewProps) => {
  const fileType = getFileType(file);
  const extension = getFileExtension(file.name);

  const renderIcon = () => {
    switch (fileType) {
      case "image":
        return <ImageIcon className="w-6 h-6 text-gray-600" />;
      case "video":
        return <Video className="w-6 h-6 text-gray-600" />;
      case "pdf":
        return <FileText className="w-6 h-6 text-red-500" />;
      case "document":
        return <FileText className="w-6 h-6 text-blue-500" />;
      default:
        return <File className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="relative flex items-center space-x-2 p-2 border border-border rounded-md">
      {renderIcon()}
      <div className="flex flex-col overflow-hidden">
        <span className="text-xs font-medium truncate">{file.name}</span>
        <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
      </div>

      {/* Botão de excluir */}
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};