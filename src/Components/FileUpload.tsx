import React, { ChangeEvent } from "react";

interface FileUploadProps {
  setImage: (file: File | null) => void;
  className: string;
  className2: string;
  img: string;
  imageUrl?: string; 
  onFileUpload?: (file: File) => void; 
}

const FileUpload: React.FC<FileUploadProps> = ({
  setImage,
  className,
  img,
  imageUrl,
  onFileUpload,
  className2,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
      if (onFileUpload) {
        onFileUpload(file);
      }
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById("file-upload");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex flex-col items-start">
      <input
        type="file"
        className="hidden"
        id="file-upload"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div
        className={`${className} flex items-center justify-center border-dashed border-2 border-gray-300 p-2 mb-4 bg-upload text-white bg-orange-500 rounded-md cursor-pointer hover:bg-orange-600 active:bg-orange-700`}
        onClick={handleClick}
      >
        <img
          src={imageUrl || img}
          alt="Upload Icon"
          className={`${className2} `}
        />
      </div>
    </div>
  );
};

export default FileUpload;
