import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "../../../../Types/enums/menuItem";
import { useNavigate } from "react-router-dom";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex z-50 backdrop-blur-sm bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="
              relative bg-white
              w-[50%] 
              max-w-[250px]
              h-90vh
              my-4
              mb-[95px] mr-4
              rounded-2xl
              shadow-xl
              p-4
              z-10
              flex flex-col
            "
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mt-2 mb-6 text-center border-b border-gray-200 pb-3">
              منو
            </h2>
            <ul className="flex flex-col gap-2 text-center mt-2">
              {menuItems.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      navigate(item.url, {
                        state: item.orderType
                          ? { orderType: item.orderType }
                          : undefined,
                      });
                      onClose();
                    }}
                    className="py-3 rounded-lg text-sm hover:bg-gray-100 active:bg-gray-200 transition cursor-pointer flex items-center gap-1 justify-center"
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
