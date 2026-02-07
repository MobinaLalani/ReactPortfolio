import React, { useState } from "react";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { ReactComponent as EmptyTaskManagementIcon } from "../../../../components/icons/svg/EmptyTaskIcon.svg";
import { GetJobs } from "../../../../setting/ApiUrl";
import BundleCard from "./BundleCard";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { useActiveButton } from "../../../../components/context/ActiveButtonContext";
import Loading from "../../../../components/tools/loading/Loading";

function BundleList() {
  const { activeButton } = useActiveButton(); 
  const apiDetails = {
    url: GetJobs,
    method: HttpMethod.POST,
    body: {
      bundleStatusIds: [0],
      orderTypeIds: [0],
      timeWindowIds: [0],
      nodeIds: [0],
    },
  };

  const { data, isLoading, isError } = useReactQuery(apiDetails);

  if (isLoading) return <Loading />;
  if (isError) return <p>خطا در دریافت دیتا</p>;

  let filteredData: any[] = [];

  if (activeButton === "acceptance") {
    filteredData = data?.data?.acceptance ?? [];
  } else {
    filteredData = data?.data?.delivery ?? [];
  }


  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10 text-gray-500">
        <EmptyTaskManagementIcon className="w-80 h-80 mb-4" />
        <p className="text-lg font-medium">فعلا خبری نیست!</p>
        <p className="text-sm">هنوز هیچ تسکی تعریف نشده است.</p>
      </div>
    );
  }

  return (
    <div>
      {filteredData?.map((item: any, index: number) => (
        <BundleCard key={index} {...item} />
      ))}
    </div>
  );
}

export default BundleList;
