import React from "react";
import { useParams } from "react-router-dom";
import Tag from "../../../../components/tools/tags/Tag";
import { SearchParcel } from "../../../../setting/ApiUrl";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";

const ScanResultForm = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error, refetch } = useReactQuery({
    url: id ? SearchParcel(id) : "",
    method: "GET",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-700 font-semibold">در حال بارگذاری...</span>
      </div>
    );
  }

  if (isError || !data || !data.data?.objectResult?.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-700 font-semibold">
          دیتایی برای نمایش وجود ندارد.
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 mt-[50px]">
      <h1 className="font-bold text-xl mb-3">
        {data?.data?.objectResult[0].parcelBarcode}
      </h1>
      <div className="min-h-[70vh] overflow-y-auto flex flex-col gap-2">
        {data.data?.objectResult.map((item: any, index: number) => (
          <div
            key={index}
            className="p-4 rounded-[16px] border border-[#ff7959] shadow-md bg-white flex flex-col gap-1"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-row gap-2 items-center">
                <span className="bg-[#ff7959] min-w-8 min-h-8 flex items-center justify-center rounded-full text-white font-semibold px-3 py-2">
                  {item.sort}
                </span>

                <span className="font-semibold text-gray-800 ">
                  {item.parcelBarcode}
                </span>
              </div>

              <span className="text-sm font-medium text-gray-blue-500 flex flex-row gap-1">
                <Tag categoryName="parcelStatus" id={item.parcelStatusId} />
                <Tag categoryName="orderType" id={item.orderTypeId} />
              </span>
            </div>
            <div className="text-gray-500 font-semibold flex flex-row gap-2 justify-between">
              <span>
                {item.customerName} - {item.fleetName}
              </span>
              <span>{item.orderDate}</span>
            </div>
            <div className="text-gray-500 font-semibold flex flex-row gap-2 justify-between">
              <span> زمان پذیرش: {item.receptionTimeWindow}</span>
              <span> زمان تحویل :{item.deliverTimeWindow}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScanResultForm;
