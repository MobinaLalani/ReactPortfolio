// import React from 'react'

// function LoginwithOTP() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default LoginwithOTP

import Cookies from "js-cookie";
import { Form, Formik } from "formik";
import { useState } from "react";
import TextField from "../../../components/tools/textField/TextField";
import Button from "../../../components/tools/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { SetUserToken } from "../../../services/api/ApiToken";
import { CreateToast } from "../../../components/tools/toast/CreateToast";
import { ToastType } from "../../../models/enums/ToastType";
import { ReactComponent as HalazIcon } from "../../../components/icons/svg/halazFullLogoIcon.svg";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../../components/tools/loading/Loading";
import { FieldTheme } from "../../../models/enums/FieldTheme";
import { LoginRequest } from "../../../setting/ApiUrl";

interface FormValues {
  phoneNumber: string;
  password: string;
}

const LoginwithPass = () => {
  const [loginType, setLoginType] = useState<"OTP" | "PASS">("OTP");
  // const [loginType, setLoginType] = useState<['OTP' , 'PASS']>();
  const navigate = useNavigate();
  const verifyMutation = useMutation({
    mutationFn: async ({ phoneNumber, password }: FormValues) => {
      const response = await fetch(LoginRequest, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, password: password }),
      });
      if (!response.ok) {
        throw new Error("Failed to verify OTP");
      }
      return response.json();
    },
    onSuccess: (data) => {
      if (data?.isSuccess) {
        SetUserToken(data.token ?? "");
        navigate("/home");
      } else {
        CreateToast(ToastType.ERROR, data?.message ?? "کد تأیید اشتباه است");
      }
    },
    onError: () => {
      CreateToast(ToastType.ERROR, "خطا در ارسال درخواست تأیید");
    },
  });

  const toEnglishDigits = (str: string): string =>
    str.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728));

  const submitHandler = (values: FormValues) => {
    console.log("values", values);
    verifyMutation.mutate({
      phoneNumber: toEnglishDigits(values.phoneNumber),
      password: toEnglishDigits(values.password),
    });
  };

  return (
    <Formik
      initialValues={{ phoneNumber: "", password: "" }}
      onSubmit={submitHandler}
    >
      {({ values }) => (
        <Form>
          <TextField
            className="pt-[30px]"
            theme={FieldTheme.Secondary}
            name="phoneNumber"
            placeholder="09193758860"
            label="شماره موبایل"
            innerClassName="bg-gray-200 rounded-[13px]"
          />

          <TextField
            theme={FieldTheme.Secondary}
            name="password"
            placeholder="رمز ورود"
            type="password"
            label={"رمز ورود"}
          />

          <Button
            className="mt-4 w-full bg-[#FF7959] text-white py-2 rounded-[12px]"
            type="submit"
          >
            {verifyMutation.isPending ? <Loading size="sm" /> : "ورود"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginwithPass;
