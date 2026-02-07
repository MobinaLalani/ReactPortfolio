import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((url, i) => (
        <motion.div
          key={i}
          className="cursor-pointer overflow-hidden rounded-2xl shadow-md"
          whileHover={{ scale: 1.03 }}
          onClick={() => setSelected(url)}
        >
          <img
            src={url}
            alt="thumb"
            className="w-full h-32 object-cover rounded-2xl"
          />
        </motion.div>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.img
              src={selected}
              alt="full"
              className="max-w-full max-h-full rounded-2xl shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
