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
import LoginwithPass from "../components/LoginwithPass";
import LoginwithOTP from "../components/LoginwithOTP";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../../components/tools/loading/Loading";
import { FieldTheme } from "../../../models/enums/FieldTheme";
import { LoginRequest } from "../../../setting/ApiUrl";

interface FormValues {
  phoneNumber: string;
  password: string;
}

const Login = () => {
    const [loginType, setLoginType] = useState<
      "OTP" | "PASS"
    >("OTP");
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
    verifyMutation.mutate({
      phoneNumber: toEnglishDigits(values.phoneNumber),
      password: toEnglishDigits(values.password),
    });
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center relative bg-cover bg-no-repeat"
      style={{
        backgroundColor: "#f9f2f2",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="flex flex-col items-center gap-[34px] m-4">
        <div className="w-[167px] h-[66px] flex items-center justify-center">
          <div className="mb-[35px]">
            <HalazIcon />
          </div>
        </div>
        <div className="relative h-[450px] max-w-md w-[350px] p-8 bg-white shadow-lg rounded-[28px] z-10">
          <div className="font-bold text-xl">ورود به حساب کاربری</div>
          {
            loginType ==='OTP' ?
            <LoginwithOTP/> :
            <LoginwithPass/>
          }

          {loginType === "OTP" ? (
            <button
              onClick={() => setLoginType("PASS")}
              className="text-sm font-semibold text-red-400 mt-5 text-start"
            >
              عبور با رمز ورود{" "}
            </button>
          ) : (
            <button
              onClick={() => setLoginType("OTP")}
              className="text-sm font-semibold text-red-400 mt-5 text-start"
            >
              ورود با کد یک بار مصرف
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
