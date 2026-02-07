import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchParcel } from "../../../../setting/ApiUrl";
import SearchSvg from "../../../icons/components/SearchSvg";
import useStore from "../../../../store/zustand/store";
import { useNavigate } from "react-router-dom";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (result: any) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setHandleScan = useStore((state) => state.setHandleScan);
  const handleScanEnabled = useStore((state) => state.handleScan);

  const inputRef = useRef<HTMLInputElement>(null); 

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);

    try {
      const url = SearchParcel(query.trim());
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) throw new Error("خطا در درخواست");

      const data = await res.json();
      onSearch(data);

      if (data) {
        navigate(`/SearchResult/${encodeURIComponent(query.trim())}`);
        onClose();
        setQuery(""); 
      }
    } catch (err) {
      console.error(err);
      onSearch(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHandleScan(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setHandleScan(true);
    }
  }, [isOpen]);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    setQuery(pasteData.trim());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-start justify-center z-50 pt-16 backdrop-blur-sm bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="relative bg-white w-[92%] sm:w-[85%] md:w-[600px] rounded-2xl shadow-lg p-6 z-10 mx-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">
              جستجو بارکد مرسوله
            </h2>

            <div className="flex items-center gap-2 w-full">
              <input
                ref={inputRef} 
                type="text"
                placeholder="بارکد مورد نظر را وارد کنید..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onPaste={handlePaste}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none text-gray-700 min-w-[100px] sm:min-w-[200px]"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-[#FF7959] text-white w-[44px] sm:w-auto px-0 sm:px-4 py-[10px] flex flex-row gap-2 hover:bg-[#f07658] transition items-center justify-center rounded-[10px]"
              >
                <SearchSvg strokeColor="white" />
                <span className="hidden sm:inline">
                  {isLoading ? "در حال جستجو..." : "جستجو"}
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
