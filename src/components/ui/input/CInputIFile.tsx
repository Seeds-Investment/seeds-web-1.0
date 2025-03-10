import React, { useRef, useState } from 'react';
import { CgAddR } from 'react-icons/cg';
interface CInputFileProps {
  accept?: string; // Tipe file yang diterima (contoh: "image/*" untuk semua gambar)
  width?: string; // Lebar input (contoh: "100%", "500px")
  height?: string; // Tinggi input (contoh: "200px", "300px")
  placeholderText?: string; // Teks saat belum ada file
}

const CInputFile: React.FC<CInputFileProps> = ({
  accept = 'image/*',
  width = '100%',
  height = '200px',
  placeholderText = 'Add Cover'
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      handleFile(event.dataTransfer.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith(accept.split('/')[0])) {
      setFile(selectedFile);
    }
  };

  const handleClick = (): void => {
    if (fileInputRef.current != null) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className="bg-[#DCFCE4] rounded-lg flex items-center justify-center cursor-pointer relative"
      style={{ width, height }}
      onClick={handleClick}
      onDragOver={event => {
        event.preventDefault();
      }}
      onDrop={handleDrop}
    >
      {/* Input File (Hidden) */}
      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        className="hidden"
        onChange={event => {
          if (event.target.files?.[0] != null) {
            handleFile(event.target.files[0]);
          }
        }}
      />

      {/* Jika file belum dipilih */}
      {file == null ? (
        <div className="flex flex-col items-center text-green-600">
          <CgAddR size={28} />
          <span className="mt-2">{placeholderText}</span>
        </div>
      ) : (
        // Jika file sudah dipilih
        <div
          className="w-full h-full bg-cover bg-center rounded-lg"
          style={{
            backgroundImage: `url(${URL.createObjectURL(file)})`
          }}
        />
      )}
    </div>
  );
};

export default CInputFile;
