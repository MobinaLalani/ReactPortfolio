import React, { useState } from "react";
import SearchSvg from "../../../components/icons/components/SearchSvg";
import { HttpMethod } from "../../../models/enums/HttpMethod";
import {ReactComponent as EmptyParcelIcon} from '../../../components/icons/svg/emptyIcon.svg'
import { useReactMutation } from "../../../components/hooks/query/useReactQuery";
import { useNavigate } from "react-router-dom";
import { GetByBarcode } from "../../../setting/ApiUrl";
import DamageDetailCard from "./DamageDetailCard";
import Loading from "../../../components/tools/loading/Loading";
function DeclarationDamage() {
  const [barcode, setBarcode] = useState("");
  const navigate = useNavigate();
  const scanApiDetail = {
    url: GetByBarcode,
    method: HttpMethod.POST,
  };

  const {
    mutate: Mutate,
    data: Data,
    isPending: ConfirmLoading,
  } = useReactMutation(scanApiDetail);

  const handleSubmitClick = () => {
    const trimmedBarcode = barcode.trim();
    if (!trimmedBarcode) return;

    Mutate({ barcode: trimmedBarcode });
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            const trimmed = barcode.trim();
            if (trimmed) {
              navigate("/CreateNewDamage", { state: { barcode: trimmed } });
            } else {
              navigate("/CreateNewDamage");
            }
          }}
          className="bg-[#FF7959] font-semibold text-white px-4 py-2 rounded-[18px]"
        >
          افزودن گزارش
        </button>
      </div>

      <div className="flex flex-row my-6 gap-3">
        <input
          placeholder="بارکد مرسوله را وارد کنید"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="w-full border border-gray-300 rounded-[12px] p-2 
             focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none"
        />

        <div
          onClick={handleSubmitClick}
          className="w-12 h-12 bg-[#FF7959] rounded-full flex items-center justify-center p-2 transition-transform duration-300 cursor-pointer"
        >
          {ConfirmLoading ? <Loading color="white" /> : <SearchSvg strokeColor="#fff" />}
        </div>
      </div>

      {Data?.data?.objectResult && Data.data.objectResult.length > 0 && (
        <DamageDetailCard data={Data} />
      )}

      {Data?.data?.requestStatus.value === 4 && (
        <div className="flex flex-col justify-center items-center mt-16 text-gray-500">
          <EmptyParcelIcon className="w-40 h-40 mb-4" />
          <p className="font-semibold">هیچ موردی یافت نشد</p>
        </div>
      )}
    </div>
  );
}

export default DeclarationDamage;
