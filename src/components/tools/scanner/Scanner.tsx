import { useEffect, useRef, useState, useCallback } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import type { Result } from "@zxing/library";
import Loading from "../loading/Loading";

interface BarcodeScannerProps {
  onScan: (scannedValue: string) => void;
  isLoading?: boolean;
  className?: string;
  height?: number;
}

const BarcodeScannerZXing: React.FC<BarcodeScannerProps> = ({
  onScan,
  className,
  isLoading,
  height = 200,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const isLockedRef = useRef(false);
  const [error, setError] = useState("");

  const handleScan = useCallback(
    (value: string) => {
      if (isLockedRef.current) return;

      isLockedRef.current = true;
      onScan(value);

      // ⏸ توقف اسکن برای debounce
      setTimeout(() => {
        isLockedRef.current = false;
      }, 2000);
    },
    [onScan]
  );

  useEffect(() => {
    if (isLoading) return;

    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;

        reader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result: Result | undefined) => {
            if (result) {
              handleScan(result.getText());
            }
          }
        );
      })
      .catch(() => {
        setError("خطا در دسترسی به دوربین");
      });

    return () => {
      // متوقف کردن و آزادسازی stream
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      readerRef.current = null;
    };
  }, [handleScan, isLoading]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className || ""}`}
      style={{ height }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}

      {error && (
        <p className="absolute bottom-2 left-2 text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
};

export default BarcodeScannerZXing;
