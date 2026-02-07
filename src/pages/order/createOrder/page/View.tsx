import React from "react";
import { useParams } from "react-router-dom";
import BaseViewLayout from "../../../../components/layout/view/BaseViewLayout";
import CreateOrder from "../components/form/CreateOrder";



const View: React.FC = () => {
  return (
    <>
      <BaseViewLayout content={<CreateOrder />}></BaseViewLayout>
    </>
  );
};

export default View;
