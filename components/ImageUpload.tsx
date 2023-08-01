import { FC, use, useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onchange: (value: string) => void;
  disabled?: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({
  value,
  onchange,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        onUpload={(result: any) => onchange(result.info.secure_url)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="h2ymc5fp"
      >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-70 transition flex flex-col space-y-2 items-center justify-center">
          <div className="h-40 w-40 relative">
            <Image
              fill
              src={value || "/placeholder.svg"}
              alt={"Upload"}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
