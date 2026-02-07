import React, { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import TextArea from "../../../components/tools/textArea/TextArea";
import TextField from "../../../components/tools/textField/TextField";
import { CreateToast } from "../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../models/enums/ToastType";
import * as Yup from "yup";
import {
  useReactMutation,
  useReactQuery,
} from "../../../components/hooks/query/useReactQuery";
import ToggleSwitch from "../../../components/tools/toggle-switch/ToggleSwitch";
import { HttpMethod } from "../../../models/enums/HttpMethod";
import {
  CreateDamageReports,
  GetDamageParcelTypes,
} from "../../../setting/ApiUrl";
import { ReactComponent as UploadIcon } from "../../../components/icons/svg/uploadIcon.svg";
import AutoComplete from "../../../components/tools/autoComplete/AutoComplete";
import { getEnum } from "../../../lib/enumHelper";
import { useLocation } from "react-router-dom";
import Loading from "../../../components/tools/loading/Loading";

function CreateNewDamage() {
  type UploadedFile = {
    name: string;
    base64: string;
    file: File;
  };

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  
  const damageTimeType = getEnum("damageTimeType");
  const damageParcelType = getEnum("damageParcelType");
  const { state } = useLocation();
  const passedBarcode = state?.barcode || "";
  const CreateDamageApiDetail = {
    url: CreateDamageReports,
    method: HttpMethod.POST,
  };

  const {
    mutate: CreateDamageMutate,
    data: CreateDamageData,
    isPending: CreateDamageLoading,
  } = useReactMutation(CreateDamageApiDetail);

  useEffect(() => {
    if (!CreateDamageData) return;

    if (CreateDamageData?.data?.requestStatus?.value === 0) {
      CreateToast(ToastType.SUCCESS, CreateDamageData?.data?.message);
    } else {
      CreateToast(ToastType.ERROR, CreateDamageData?.data?.message);
    }
  }, [CreateDamageData]);

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

const handleSubmitClick = (values: any) => {
  if (files.length === 0) {
    CreateToast(ToastType.ERROR, "لطفاً حداقل یک تصویر آپلود کنید");
    return;
  }

  const fd = new FormData();

  fd.append("barcode", String(values.barcode));
  fd.append("isSendable", String(!!values.IsSendable));
  fd.append("OtherCondition", values.OtherCondition || "");

  if (values.damageTimeTypeId != null) {
    fd.append("damageTimeTypeId", String(values.damageTimeTypeId));
  }

  if (values.damageParcelTypeId != null) {
    fd.append("damageParcelTypeId", String(values.damageParcelTypeId));
  }

  if (values.description) {
    fd.append("Description", values.description);
  }

  files.forEach((f) => {
    fd.append("Files", f.file, f.name);
  });

  CreateDamageMutate(fd);
};


const validationSchema = Yup.object().shape({
  barcode: Yup.string().required("لطفاً بارکد را وارد کنید"),

  IsSendable: Yup.boolean().required(
    "لطفاً وضعیت قابل ارسال بودن را مشخص کنید"
  ),

  damageTimeTypeId: Yup.number()
    .nullable()
    .required("لطفاً زمان کشف آسیب را انتخاب کنید"),

  damageParcelTypeId: Yup.number()
    .nullable()
    .required("لطفاً شرایط مرسوله را انتخاب کنید"),

  OtherCondition: Yup.string().when("damageParcelTypeId", (value, schema) => {
    return value[0] === 100
      ? schema.required("لطفاً سایر شرایط را وارد کنید")
      : schema.optional();
  }),

  description: Yup.string().nullable(),
});


  return (
    <div className="w-full p-4 bg-[#F9F2F2] min-h-screen">
      <Formik
        initialValues={{
          barcode: passedBarcode,
          IsSendable: true,
          description: "",
          OtherCondition: "",
          damageTimeTypeId: null,
          damageParcelTypeId: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitClick}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <TextField
              // className="border border-gray-300"
              name="barcode"
              placeholder="بارکد مرسوله"
            />

            <ToggleSwitch
              options={[
                { value: "true", label: "بله" },
                { value: "false", label: "خیر" },
              ]}
              name="IsSendable"
              label="قابل ارسال"
            />

            <AutoComplete
              name="damageTimeTypeId"
              options={damageTimeType}
              inputClassName="rounded-[13px] h-[35px]"
              // className="border border-gray-300 rounded-[13px]"
              placeholder="زمان کشف آسیب"
            />

            <AutoComplete
              inputClassName="rounded-[13px] h-[35px]"
              // className="border border-gray-300 rounded-[13px]"
              name="damageParcelTypeId"
              options={damageParcelType}
              placeholder="شرایط مرسوله"
            />

            {values.damageParcelTypeId === 100 && (
              <TextField
                // className="border border-gray-300"
                name="OtherCondition"
                placeholder="سایر شرایط مرسوله..."
              />
            )}

            <TextArea
              name="description"
              // className="border border-gray-300 rounded-[10px]"
              placeholder="توضیحات..."
            />

            {/* Upload Section */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                accept="image/*"
                capture="environment" // 🔹 دوربین پشت موبایل باز شود
                onChange={handleFileChange}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full mt-2 px-4 py-2 border border-[2px] bg-white text-black rounded-lg flex items-center justify-center"
              >
                <UploadIcon />
                <span className="p-[10px] font-semibold">افزودن تصویر</span>
              </button>

              {files.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 flex items-center gap-2 rounded-lg p-2 justify-between"
                    >
                      <img
                        src={file.base64}
                        alt={file.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="text-gray-500 hover:text-red-700"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={files.length === 0 || CreateDamageLoading}
              className={`px-4 py-2 rounded-[28px] w-full text-white
              ${files.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff7959]"}`}
            >
              {CreateDamageLoading ? <Loading /> : "ثبت گزارش"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateNewDamage;
