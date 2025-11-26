import { useState, useEffect } from "react";
import { FileUp, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatFileSize } from "@/lib/utils/fileUtils";
import { FilePreview } from "./filePreview";

interface DocumentosProps {
  onChange?: (files: File[]) => void;
  maxFiles?: number;
}

export default function Documentos({
  onChange,
  maxFiles = 10,
}: DocumentosProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const totalFiles = files.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      addFiles(filesArray);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const availableSlots = maxFiles - totalFiles;
    if (availableSlots <= 0) return;

    const filesToAdd = newFiles.slice(0, availableSlots);
    setFiles((prev) => [...prev, ...filesToAdd]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  useEffect(() => {
    onChange?.(files);
  }, [files]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        const url = URL.createObjectURL(file);
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {totalFiles}/{maxFiles} arquivo{totalFiles !== 1 ? 's' : ''}
        </span>
      </div>

      <Card className="p-6 shadow-md transition-shadow hover:shadow-lg">
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center gap-4
            transition-all duration-300 ease-in-out
            ${dragOver
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
            }
            ${totalFiles >= maxFiles ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {totalFiles < maxFiles && (
            <input
              type="file"
              multiple
              accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={totalFiles >= maxFiles}
            />
          )}

          <div
            className={`
              p-4 rounded-full transition-all duration-300
              ${dragOver ? "bg-primary/10 scale-110" : "bg-muted"}
            `}
          >
            {dragOver ? (
              <Upload className="w-10 h-10 text-primary animate-bounce" />
            ) : (
              <FileUp className="w-10 h-10 text-muted-foreground" />
            )}
          </div>

          <div className="text-center space-y-2">
            <p className="text-base font-medium text-foreground">
              {totalFiles >= maxFiles
                ? "Limite de arquivos atingido"
                : dragOver
                  ? "Solte os arquivos aqui"
                  : "Arraste arquivos ou clique para selecionar"}
            </p>
            <p className="text-sm text-muted-foreground">
              Imagens, vídeos, PDFs e documentos
            </p>
          </div>

          {totalFiles < maxFiles && (
            <Button
              variant="outline"
              size="lg"
              className="pointer-events-none mt-2"
            >
              Escolher arquivos
            </Button>
          )}
        </div>
      </Card>

      {totalFiles > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file, idx) => (
            <FilePreview
              key={idx}
              file={file}
              onDelete={() => {
                const newFiles = [...files];
                newFiles.splice(idx, 1);
                setFiles(newFiles);
              }}
            />
          ))}
        </div>
      )}


      {totalFiles === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Nenhum arquivo adicionado</p>
          <p className="text-sm mt-1">
            Faça upload de até {maxFiles} arquivos
          </p>
        </div>
      )}
    </div>
  );
}