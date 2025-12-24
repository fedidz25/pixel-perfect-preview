import { useState, useEffect, useRef, useCallback } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

interface UseBarcodeScanner {
  isScanning: boolean;
  barcode: string | null;
  error: string | null;
  startScanning: () => void;
  stopScanning: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export function useBarcodeScanner(): UseBarcodeScanner {
  const [isScanning, setIsScanning] = useState(false);
  const [barcode, setBarcode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  const startScanning = useCallback(async () => {
    setError(null);
    setBarcode(null);
    
    try {
      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;
      
      const videoInputDevices = await codeReader.listVideoInputDevices();
      
      if (videoInputDevices.length === 0) {
        setError("Aucune caméra détectée");
        return;
      }

      // Prefer back camera on mobile
      const backCamera = videoInputDevices.find(
        device => device.label.toLowerCase().includes("back") || 
                  device.label.toLowerCase().includes("arrière")
      );
      const selectedDevice = backCamera || videoInputDevices[0];

      setIsScanning(true);

      codeReader.decodeFromVideoDevice(
        selectedDevice.deviceId,
        videoRef.current!,
        (result, err) => {
          if (result) {
            setBarcode(result.getText());
            stopScanning();
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error(err);
          }
        }
      );
    } catch (err) {
      console.error("Scanner error:", err);
      setError("Impossible d'accéder à la caméra");
      setIsScanning(false);
    }
  }, []);

  const stopScanning = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
    setIsScanning(false);
  }, []);

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  return {
    isScanning,
    barcode,
    error,
    startScanning,
    stopScanning,
    videoRef,
  };
}
