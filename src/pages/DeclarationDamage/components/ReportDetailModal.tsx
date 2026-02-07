import React from "react";
import BaseModal from "../../../components/tools/modal/BaseModal";
import ImageGallery from "../../../components/tools/ImageGallery/ImageGallery";
import TextField from "../../../components/tools/textField/TextField";
import { Formik, Form } from "formik";

export type DamageReport = {
  damageReportId: number;
  parcelId: number;
  orderTypeTitle: string;
  customerBrandName: string;
  barcode: string;
  microhubName: string;
  createdDateTime: string;
  isSendable: string;
  damageTimeTypeTitle: string;
  damageParcelTypeTitle: string;
  parcelStatusTitle: string;
  fileUrls: string[];
};

interface ReportDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedData: DamageReport;
}

function ReportDetailModal({
  isOpen,
  onClose,
  selectedData,
}: ReportDetailModalProps) {
  const resolvedImages = selectedData.fileUrls?.map((u) =>
    u?.startsWith("http") ? u : `https://dev-storage.halaz.ir/${u}`
  );

  const initialValues = {
    barcode: selectedData.barcode || "",
    customerBrandName: selectedData.customerBrandName || "",
    microhubName: selectedData.microhubName || "",
    createdDateTime: selectedData.createdDateTime || "",
    damageParcelTypeTitle: selectedData.damageParcelTypeTitle || "",
    parcelStatusTitle: selectedData.parcelStatusTitle || "",
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center w-full">
        <div
          className="
            w-full 
            max-w-[800px] 
            p-4 
            md:p-6 
            flex flex-col 
            gap-4 
            max-h-[60vh] 
            overflow-y-auto
          "
        >
          <Formik initialValues={initialValues} onSubmit={() => {}}>
            {() => (
              <Form className="flex flex-col gap-4 w-full">
                {/* فرم اطلاعات - موبایل تک ستونه، دسکتاپ دو ستونه */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    innerClassName="border border-gray-300"
                    name="barcode"
                    label="کد مرسوله"
                    readonly
                  />
                  <TextField
                    innerClassName="border border-gray-300"
                    name="customerBrandName"
                    label="نام مشتری"
                    readonly
                  />
                  <TextField
                    innerClassName="border border-gray-300"
                    name="microhubName"
                    label="میکروهاب"
                    readonly
                  />
                  <TextField
                    innerClassName="border border-gray-300"
                    name="createdDateTime"
                    label="تاریخ ایجاد"
                    readonly
                  />
                  <TextField
                    innerClassName="border border-gray-300"
                    name="damageParcelTypeTitle"
                    label="نوع آسیب"
                    readonly
                  />
                  <TextField
                    innerClassName="border border-gray-300"
                    name="parcelStatusTitle"
                    label="وضعیت مرسوله"
                    readonly
                  />
                </div>

                {/* گالری تصاویر */}
                {resolvedImages?.length > 0 && (
                  <div className="mt-2">
                    <span className="font-semibold mb-2 block text-sm md:text-base">
                      فایل‌ها
                    </span>
                    <ImageGallery images={resolvedImages} />
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </BaseModal>
  );
}

export default ReportDetailModal;
