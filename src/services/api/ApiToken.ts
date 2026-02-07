import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../../setting/CookiesKey";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/zustand/store";

interface TokenPayload {
  username: string;
  role: string;
  exp?: number;
  [key: string]: any;
}


export const SetUserToken = async (token: string) => {
  const setToken = useStore.getState().setToken;
  const SetIsSharedFleet = useStore.getState().SetIsSharedFleet;
  return new Promise<void>((resolve) => {

    Cookies.set(ACCESS_TOKEN, token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });


    try {
      const decodedToken = jwtDecode<TokenPayload>(token);

      setToken(decodedToken);
      SetIsSharedFleet(decodedToken.IsSharedFleet);
    } catch (error) {
      console.error("Token decode failed:", error);
      setToken(null);
    }

    resolve();
  });
};

export const DecodeUserToken = (): TokenPayload | null => {
  const token = Cookies.get(ACCESS_TOKEN);
  if (!token) return null;

  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error("Invalid Token", error);
    return null;
  }
};

// فقط گرفتن توکن به شکل خام
export const GetUserToken = () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return token ?? null;
};

// حذف توکن از کوکی
export const RemoveUserToken = () => {
  Cookies.remove(ACCESS_TOKEN);
};

// حذف توکن و انتقال به لاگین
export const RemoveUserTokenAndRedirect = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove(ACCESS_TOKEN);
    useStore.getState().setToken(null);
    navigate("/login");
  };

  return handleLogout;
};
