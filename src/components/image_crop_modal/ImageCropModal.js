"use client";
import Cropper from "react-easy-crop";
import Modal from "@mui/material/Modal";
import getCroppedImg from "@/utils/cropImage";
import { convertBlobToFile } from "@/utils/utilities";
import { useState } from "react";

const ImageCropModal = ({
  isOpen = false,
  onClose = () => {},
  file,
  onFileCrop,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = (_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCroppedImage = async () => {
    try {
      const imgBlob = await getCroppedImg(file, croppedAreaPixels, 0);
      console.log("donee", { imgBlob });
      const imageFile = convertBlobToFile(imgBlob, "selected-img");
      console.log("imageFile", imageFile);
      onFileCrop(imageFile);
    } catch (e) {
      console.error(e);
    }
  };

  if (!file) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="flex h-[100vh] w-[100vw]">
        <div className="m-auto flex h-[40vh] w-[60vh] flex-col rounded-xl border-1 border-b-emerald-50 bg-white p-4">
          <div className="relative h-full flex-1 border-2">
            <Cropper
              image={file}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="mt-2 flex w-full gap-2">
            <button
              onClick={onClose}
              className="secondary-button flex-1 rounded-[8px] py-1 text-[20px]"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCroppedImage}
              className="gradient-bg btn-hover-2 w-full flex-1 rounded-[8px] py-1 text-[20px] text-white"
            >
              save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageCropModal;
