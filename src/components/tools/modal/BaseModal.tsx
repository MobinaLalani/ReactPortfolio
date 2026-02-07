import React from "react";

interface BaseModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function BaseModal({ children, isOpen, onClose }: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="
          bg-white rounded-2xl  shadow-lg relative 
          inline-block max-w-[90vw] max-h-[90vh] overflow-auto p-7
        "
      >
        <button
          className="absolute top-4 left-5 text-gray-500 hover:text-black  "
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export default BaseModal;
