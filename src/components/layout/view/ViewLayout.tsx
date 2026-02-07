import React from 'react';
import BottomSheet from "../bottom-sheet/BottomSheet";
import {ReactComponent as BackIcon} from '../../../components/icons/svg/backArrowIcon.svg';
import {useNavigate} from "react-router-dom";
import {useIsToggled} from "../../hooks/toggle/useToggle"

function ViewLayout({mapComponent, formComponent, formComponentResponsive, mapOverlay}: any) {
    const navigate = useNavigate();
    const IsToggled = useIsToggled();
    const handleClick = () => {
        navigate(-1);
    };
    return (
      <div className="lg:w-[calc(100%+40px)]  overflow-hidden w-full max-w-[1440px]  mx-auto rounded-lg lg:-ml-[40px] -my-[40px]">
          {mapComponent && mapComponent}
        
      </div>
    );
}

export default ViewLayout;