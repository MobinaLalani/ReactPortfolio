import React, { useState } from "react";
import { useEffect } from "react";
import { useReactMutation } from "../../../../components/hooks/query/useReactQuery";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { ToastType } from "../../../../models/enums/ToastType";
import { CreateToast } from "../../../../components/tools/toast/CreateToast";
import {
  SameDayGetParcel,
  ConfirmParcelsDelivery,
} from "../../../../setting/ApiUrl";
import ParcelCard from "./ParcelCard";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import Loading from "../../../../components/tools/loading/Loading";

type BundleListProps = {
  activeButton: string;
  className?: string;
};

function BundleList({ activeButton, className }: BundleListProps) {
  const apiDetails = {
    url: SameDayGetParcel,
    method: HttpMethod.GET,
  };
  const [openBundleIndex, setOpenBundleIndex] = useState<number | null>(null);
  const [selectedParcelIds, setSelectedParcelIds] = useState<number[]>([]);

  const { data, isLoading, refetch, isError } = useReactQuery(apiDetails);
  const ApiDetails = {
    url: ConfirmParcelsDelivery,
    method: HttpMethod.POST,
  };
  const { mutate: Mutate, data: Data ,isPending:ConfirmLoading } = useReactMutation(
   ApiDetails
  );



  useEffect(() => {
    if (!Data || !Data.data) return; // شرط داخل useEffect

    if (Data.data.requestStatus.value ===0) {
      CreateToast(ToastType.SUCCESS, Data.data.message);
      setSelectedParcelIds([]); // بعد از موفقیت انتخاب‌ها پاک بشه
      refetch?.();
    } else{
      CreateToast(ToastType.ERROR, Data.data.message);
    }
  }, [Data, refetch]);

  
  if (isLoading) return <Loading/>;
  if (isError) return <p>خطا در دریافت دیتا</p>;

  

  const handleSelectionChange = (ids: number[], bundleIndex: number) => {
    setSelectedParcelIds((prev) => {
      const bundleParcels =
        data?.data?.objectResult[bundleIndex]?.parcels || [];
      const bundleIds = bundleParcels.map((p: any) => p.id);

      const remaining = prev.filter((id) => !bundleIds.includes(id));
      return [...remaining, ...ids];
    });
  };

  
  const handleClick=()=>{
    Mutate({
      parcelIds: selectedParcelIds,
    });

  }
 
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6 ">
        <span className="font-semibold text-xl"></span>
        <button
          onClick={handleClick}
          disabled={selectedParcelIds.length === 0 || ConfirmLoading} // 👈 وقتی لود میشه هم غیرفعال
          className={`flex items-center gap-2 px-4 py-1 rounded-[12px] font-semibold
    ${
      selectedParcelIds.length === 0 || ConfirmLoading
        ? "bg-[#FF7959] text-white opacity-50 cursor-not-allowed"
        : "bg-[#FF7959] opacity-100 text-white"
    }`}
        >
          <span>{ConfirmLoading ? <Loading /> : "تایید تحویل"}</span>
        </button>
      </div>

      <div className={`overflow-y-auto h-[80vh] ${className}`}>
        {data?.data?.objectResult?.map((item: any, index: number) => (
          <ParcelCard
            key={index}
            lastNodeName={item.lastNodeName}
            orderTypeId={item.orderTypeId}
            totalCount={item.totalCount}
            customerBrandName={item.customerBrandName}
            receptionCount={item.receptionCount}
            deliveryCount={item.deliveryCount}
            parcels={item.parcels}
            isOpen={openBundleIndex === index}
            onToggle={() =>
              setOpenBundleIndex(openBundleIndex === index ? null : index)
            }
            onSelectionChange={(ids) => handleSelectionChange(ids, index)}
          />
        ))}
      </div>
    </>
  );
  
}

export default BundleList;
