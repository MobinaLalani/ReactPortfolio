import React from "react";
import Tag from "../../../../components/tools/tags/Tag";
import { useNavigate } from "react-router-dom";

function BundleCard(item: any) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-[13px] flex flex-col w-full px-4 py-3 mb-3 shadow-md">
      <div className="flex flex-col gap-2">
        {/* ردیف اول */}
        <div className="flex flex-row justify-between items-center">
          <span className="font-semibold text-xl">{item.barcode}</span>

          <div className="flex flex-row gap-2">
            <Tag categoryName="orderType" id={item.orderType.id} />
            <Tag categoryName="bundleStatus" id={item.bundleStatus.id} />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center text-sm text-[#6B7280]">
          <span className="justify-self-start font-semibold">
            <span className=" text-red-600  font-bold">
              {item.scannedCount}
            </span>
            <span className="mx-1 text-gray-500">/</span>
            <span className=" text-green-600">{item.totalParcelCount}</span>
          </span>
          <span className="justify-self-end font-semibold text-[#6B7280]">
            {item.deliverTimeWindowTitle} -{item.customer}
          </span>
        </div>
      </div>

      <button
        onClick={() =>
          navigate(`/parcels/${item.bundleId}`, {
            state: {
              bundleBarcode: item.barcode,
            },
          })
        }
        className="w-full rounded-[13px] px-4 py-2 mt-3 font-semibold text-white bg-[#FF7959]"
      >
        مشاهده مرسوله ها
      </button>
    </div>
  );
}

export default BundleCard;
