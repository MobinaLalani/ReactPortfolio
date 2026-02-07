import React from "react";
import { useParams } from "react-router-dom";
import BaseViewLayout from "../../../components/layout/view/BaseViewLayout";
import ScannForm from "../components/form/ScanResultForm"
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
      <BaseViewLayout content={<ScannForm />}></BaseViewLayout>
    </>
  );
};

export default View;
