import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { getCroppedImg } from './utils/cropImage';

interface Props {
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
}

const ImageCropperModal: React.FC<Props> = ({ imageSrc, onClose, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
  };

  return (
    <Dialog open fullWidth maxWidth="sm" onClose={onClose}>
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>
      <div className="px-4 py-3">
        <label>Zoom</label>
        <Slider value={zoom} min={1} max={3} step={0.1} onChange={(_, z) => setZoom(Number(z))} />
        <div className="d-flex justify-content-end mt-3">
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={handleDone} color="primary" variant="contained" className="ms-3">Insert</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageCropperModal;
