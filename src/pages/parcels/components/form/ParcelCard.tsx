import React from "react";
import Tag from "../../../../components/tools/tags/Tag";
import { useNavigate } from "react-router-dom";

function BundleCard(item: any) {
    const navigate = useNavigate();
    const handleClick = () => {
      // رفتن به صفحه جزئیات و ارسال id یا barcode به عنوان پارامتر
      navigate(`/SearchResult/${encodeURIComponent( item.barcode)}`, {
        // state: { searchData: item },
      });
    };
  return (
    <div className="relative bg-white rounded-[13px] flex flex-col w-full px-4 py-3 mb-4 shadow-md overflow-hidden">
      {/* ✅ لیبل قرمز چسبیده به راست */}
      <div
        onClick={handleClick}
        className="absolute top-0 right-0 h-full w-16 bg-[#FF7959] flex items-center justify-center text-sm font-bold text-white"
      >
        {item.sort}
      </div>

      {/* ✅ بخش محتوای اصلی */}
      <div className="flex flex-col gap-2 pr-20">
        <div className="flex flex-row justify-between gap-2">
          <span className="font-semibold text-base">{item.barcode}</span>
          <Tag categoryName="parcelStatus" id={item.parcelStatusId} />
        </div>
        <div className="flex flex-row justify-between gap-2">
          <span>{item.fleetName}</span>
          <span className="font-semibold text-base">
            {item.deliverTimeWindow}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BundleCard;
