import { useCallback, useRef } from "react";

export type ScanProcessor = (barcode: string) => Promise<void>;

export interface UseScanQueueOptions {
  cooldown?: number;
  preventDuplicate?: boolean;
}

export function useScanQueue(
  processor: ScanProcessor,
  options?: UseScanQueueOptions
) {
  const { cooldown = 1500, preventDuplicate = true } = options || {};

  const scannedSetRef = useRef<Set<string>>(new Set());
  const queueRef = useRef<string[]>([]);
  const isProcessingRef = useRef(false);
  const lastScanRef = useRef<string | null>(null);

  const processQueue = useCallback(async () => {
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;

    while (queueRef.current.length > 0) {
      const barcode = queueRef.current.shift();
      if (!barcode) continue;

      await processor(barcode);
    }

    isProcessingRef.current = false;
  }, [processor]);

  const enqueueScan = useCallback(
    (barcode: string) => {
      if (!barcode) return;

      // cooldown
      if (lastScanRef.current === barcode) return;

      // duplicate check
      if (preventDuplicate && scannedSetRef.current.has(barcode)) return;

      lastScanRef.current = barcode;
      setTimeout(() => {
        lastScanRef.current = null;
      }, cooldown);

      if (preventDuplicate) {
        scannedSetRef.current.add(barcode);
      }

      queueRef.current.push(barcode);
      processQueue();
    },
    [cooldown, preventDuplicate, processQueue]
  );

  const reset = useCallback(() => {
    scannedSetRef.current.clear();
    queueRef.current = [];
    lastScanRef.current = null;
  }, []);

  return {
    enqueueScan,
    reset,
    scannedSet: scannedSetRef, // optional – اگه جایی خواستی
    queue: queueRef, // optional
  };
}
