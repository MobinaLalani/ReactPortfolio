import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AutoComplete from "../../../../../components/tools/autoComplete/AutoComplete";
import BarcodeScannerListener from "../../../../../components/tools/scanner/BarcodeScannerListener";
import BarcodeScannerZXing from "../../../../../components/tools/scanner/Scanner";
import { ToastType } from "../../../../../models/enums/ToastType";
import { CreateToast } from "../../../../../components/tools/toast/CreateToast";
import { HttpMethod } from "../../../../../models/enums/HttpMethod";
import {
  GetCustomerDropDown,
  CreateOvernightBufferBySupervisor,
} from "../../../../../setting/ApiUrl";
import {
  useReactQuery,
  useReactMutation,
} from "../../../../../components/hooks/query/useReactQuery";

function CreateOrder() {
  const location = useLocation();
  const orderTypeEnum: number = location.state?.orderType ?? 2;
  const { data } = useReactQuery({
    url: GetCustomerDropDown,
    method: HttpMethod.GET,
  });

  const [barcodes, setBarcodes] = useState<string[]>([]);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [duplicateScanned, setDuplicateScanned] = useState<string | null>(null);
  const navigate = useNavigate();
  const barcodeRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const lastCameraScan = useRef<string | null>(null);
  
  const {
    mutate,
    data: result,
    isPending,
  } = useReactMutation({
    url: CreateOvernightBufferBySupervisor,
    method: HttpMethod.POST,
  });

  const handleScan = (code: string) => {
    if (!code) return;
    if (lastCameraScan.current === code) return;
    lastCameraScan.current = code;
    setTimeout(() => (lastCameraScan.current = null), 800);

    setBarcodes((prev) => {
      if (prev.includes(code)) {
        setDuplicateScanned(code);
        barcodeRefs.current[code]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setTimeout(() => setDuplicateScanned(null), 1500);
        return prev;
      }
      setLastScanned(code);
      setTimeout(() => setLastScanned(null), 2000);
      return [code, ...prev];
    });
  };

  const handleRemoveBarcode = (code: string) => {
    setBarcodes((prev) => prev.filter((b) => b !== code));
  };

  const handleSubmit = (values: { customerId: number }) => {
    mutate({
      customerId: values.customerId,
      orderTypeEnum,
      barcodes,
    });
  };

  useEffect(() => {
    if (!result?.data) return;

    if (result.data.requestStatus.value === 0) {
      CreateToast(ToastType.SUCCESS, result.data.message);
      setBarcodes([]);
      setCameraEnabled(false);
    } else {
      CreateToast(ToastType.ERROR, result.data.message);
    }
  }, [result]);

  return (
    <div className="w-full max-w-full sm:max-w-lg lg:max-w-3xl mx-0 bg-white shadow-lg rounded-xl py-6  px-2 my-12 mt-10 h-[70vh] max-h-[70vh] overflow-y-auto">
      {orderTypeEnum === 2 ? (
        <div className="relative flex items-center justify-between mb-8 h-10">
          {/* دکمه سمت چپ */}
          <button
            onClick={() => navigate("/scanner", { state: "delivery" })}
            className="absolute left-0 px-4 py-2 bg-[#ff7959] text-sm  font-semibold  text-white rounded-lg "
          >
            رفتن به صفحه تحویل
          </button>

          {/* عنوان وسط */}
          <h2 className=" text-lg font-semibold">ثبت سفارش بافر</h2>
        </div>
      ) : (
        <h2 className="text-lg font-semibold mb-4 text-center">
          ثبت سفارش بافر شبانه
        </h2>
      )}

      {/* -------- Camera Scanner (Only Overnight) -------- */}
      {orderTypeEnum === 2 && (
        <div className="mb-4 border border-blue-300 bg-blue-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-blue-700">
              اسکن با دوربین
            </span>
            <button
              type="button"
              onClick={() => setCameraEnabled((p) => !p)}
              className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white"
            >
              {cameraEnabled ? "بستن دوربین" : "باز کردن دوربین"}
            </button>
          </div>

          {cameraEnabled && (
            <div className="h-[200px] sm:h-[150px] overflow-hidden rounded-[16px] mt-2">
              <BarcodeScannerZXing
                onScan={handleScan}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      )}

      <Formik initialValues={{ customerId: 0 }} onSubmit={handleSubmit}>
        <Form className="space-y-4">
          <BarcodeScannerListener onScan={handleScan} />

          <AutoComplete
            name="customerId"
            label="مشتری"
            innerClassName="border border-gray-300 rounded-[13px]"
            options={data?.data || []}
            placeholder="نام مشتری"
          />

          {barcodes.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">بارکدهای اسکن‌شده</span>
                <span className="text-sm text-gray-500">
                  تعداد: <b>{barcodes.length}</b>
                </span>
              </div>

              <ul className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                {barcodes.map((code) => (
                  <li
                    key={code}
                    ref={(el) => (barcodeRefs.current[code] = el)}
                    className={`flex justify-between items-center px-3 py-2 rounded-[12px] border transition-all
                      ${
                        lastScanned === code
                          ? "border-green-400 bg-green-50"
                          : duplicateScanned === code
                          ? "border-red-400 bg-red-50 animate-pulse"
                          : "border-gray-200 bg-gray-50"
                      }`}
                  >
                    <span className="font-mono">{code}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBarcode(code)}
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending || barcodes.length === 0}
            className="bg-[#ff7959] text-white px-4 py-2 w-full rounded-[12px] disabled:opacity-50"
          >
            {isPending ? "در حال ثبت..." : "ثبت سفارش"}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateOrder;
