import React from "react";
import { useParams } from "react-router-dom";
import MissionDetailLayout from "../../../components/layout/view/MissionDetailLayout";
import ProfileForm from "../components/form/ProfileForm";
import { useToggle } from "../../../components/hooks/toggle/useToggle";



const View: React.FC = () => {
  const toggle = useToggle();
  const handleButtonClick = (id: string): void => {

  };
  const handleClick = () => {
    toggle();
  };

  return (
    <>
    <MissionDetailLayout Title="پروفایل" content={<ProfileForm/>}/>
      </>
  );
};

export default View;
