import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SupportIcon } from "../../icons/svg/supportIcon.svg";
import { ReactComponent as NotificationIcon } from "../../icons/svg/notificationBlack.svg";
import { ReactComponent as HalazoneLogo } from "../../icons/svg/halazoneLogo.svg";
import { ReactComponent as SearchIcon } from "../../icons/svg/searchIcon.svg";
import { ReactComponent as BackArrowIcon } from "../../icons/svg/backArrowIcon.svg";
import SearchModal from "./component/SearchModal"; 
import Menu from "./component/Menu";

function Header({ showDefault = true }) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleBackIcon = () => {
    navigate(-1);
  };

  const handleSearch = (query:any) => {
    console.log("در حال جستجو برای:", query);
    setIsSearchOpen(false); 
    
  };

  return (
    <>
      <div className="fixed bg-[#f9f5f2] pb-6 pt-4 top-0 left-0 w-full flex items-center justify-between px-4 z-10">
        <div className="flex flex-row gap-2">
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)} // ✅ درست
            className="w-8 h-8 bg-white rounded-[8px] flex items-center justify-center p-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 7L4 7"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M20 12L4 12"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M20 17L4 17"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div
            onClick={() => setIsSearchOpen(true)}
            className="w-8 h-8 bg-white rounded-[8px] flex items-center justify-center p-2 transition-transform duration-300 hover:scale-125 cursor-pointer"
          >
            <SearchIcon className="w-5 h-5" />
          </div>

          <div className="w-8 h-8 bg-white rounded-[8px] flex items-center justify-center p-2 cursor-pointer">
            <NotificationIcon className="w-5 h-5" />
          </div>
        </div>

        {showDefault ? (
          <div>
            <HalazoneLogo className="mr-auto" />
          </div>
        ) : (
          <div
            onClick={handleBackIcon}
            className="items-center bg-white rounded-[8px] p-2 cursor-pointer"
          >
            <BackArrowIcon className="w-5 h-5" />
          </div>
        )}
      </div>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

export default Header;
