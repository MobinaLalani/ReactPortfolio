import React, { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import TextArea from "../../../components/tools/textArea/TextArea";
import TextField from "../../../components/tools/textField/TextField";
import { CreateToast } from "../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../models/enums/ToastType";
import * as Yup from "yup";
import { useReactMutation } from "../../../components/hooks/query/useReactQuery";
import ToggleSwitch from "../../../components/tools/toggle-switch/ToggleSwitch";
import { HttpMethod } from "../../../models/enums/HttpMethod";
import { DeliverParcelByPOD } from "../../../setting/ApiUrl";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/tools/loading/Loading";

function DeliverParcelPOD() {
  type UploadedFile = {
    name: string;
    base64: string;
    file: File;
  };

  const navigate = useNavigate();
  const { state } = useLocation();

  const passedBarcode = state?.barcode || "";

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const DeliverParcelByPODApiDetail = {
    url: DeliverParcelByPOD,
    method: HttpMethod.POST,
  };

  const {
    mutate: DeliverParcelByPODMutate,
    data: DeliverParcelByPODData,
    isPending: DeliverParcelByPODLoading,
  } = useReactMutation(DeliverParcelByPODApiDetail);

  /* -------------------- HANDLE API RESULT -------------------- */
  useEffect(() => {
    if (!DeliverParcelByPODData) return;

    if (DeliverParcelByPODData?.data?.requestStatus?.value === 0) {
      CreateToast(
        ToastType.SUCCESS,
        DeliverParcelByPODData?.data?.message || "عملیات با موفقیت انجام شد"
      );

      // برگشت به صفحه قبل بعد از موفقیت
      const timer = setTimeout(() => {
        navigate(-1);
      }, 800);

      return () => clearTimeout(timer);
    }

    CreateToast(
      ToastType.ERROR,
      DeliverParcelByPODData?.data?.message || "خطا در ثبت اطلاعات"
    );
  }, [DeliverParcelByPODData, navigate]);

  /* -------------------- FILE HANDLERS -------------------- */
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded) return;

    const filesArray = Array.from(uploaded);
    const validFiles: UploadedFile[] = [];

    for (const file of filesArray) {
      if (file.size > MAX_FILE_SIZE) {
        CreateToast(
          ToastType.ERROR,
          `حجم فایل «${file.name}» بیشتر از ۵ مگابایت است.`
        );
        continue;
      }

      const base64 = await toBase64(file);
      validFiles.push({ name: file.name, base64, file });
    }

    setFiles((prev) => [...prev, ...validFiles]);
    e.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /* -------------------- FORM -------------------- */
  const validationSchema = Yup.object().shape({
    barcode: Yup.string().required("لطفاً بارکد را وارد کنید"),
    podCode: Yup.string().required("لطفاً کد را وارد کنید"),
  });

  const handleSubmit = (values: any) => {


    DeliverParcelByPODMutate(values);
  };

  return (
    <div className="w-full p-4 bg-[#F9F2F2] min-h-screen">
      <Formik
        initialValues={{
          barcode: "",
          podCode: "",

        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <TextField name="barcode" placeholder="بارکد مرسوله" />

            <TextField name="podCode" placeholder="کد POD" />

            <button
              type="submit"
              disabled={DeliverParcelByPODLoading}
              className={`px-4 py-2 rounded-[28px] w-full text-white transition
                ${
                  DeliverParcelByPODLoading
                    ? "bg-[#FFA18B] cursor-not-allowed"
                    : "bg-[#ff7959] hover:bg-[#ff5c36]"
                }`}
            >
              {DeliverParcelByPODLoading ? <Loading /> : "ثبت گزارش"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DeliverParcelPOD;
