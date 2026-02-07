import React, { useEffect, useState } from "react";
import { useTheme } from "../../hooks/theme/ThemeContext";
import Navigation from "../navigation/Navigation";
import Header from "../header/header";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { GetUserToken } from "../../../services/api/ApiToken";

import "aos/dist/aos.css";
// @ts-ignore
import AOS from "aos";
const ALLOWED_ROUTES = ["/login", "/register", "/forgot-password"];
const HIDE_HEADER_ROUTES = [
  "/profile",
  "/parcels",
  "/SearchResult",
  "/DeclarationDamage",
  "/Order/createOrder",
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colors } = useTheme();
  const location = useLocation();

  const unMountLayout =
    ALLOWED_ROUTES.includes(location.pathname) || location.pathname === "/404";

  const showDefaultHeader = !HIDE_HEADER_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );

  const hideNavigation =
    unMountLayout || location.pathname.startsWith("/profile");

  useEffect(() => {
    if (!unMountLayout) {
      const token = Cookies.get("AccessToken");
      if (!token) {
        window.location.replace("/login");
      }
    }
  }, [location.pathname, unMountLayout]);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease",
      once: true,
    });
  }, []);

  if (unMountLayout) {
    return <div>{children}</div>;
  }

  return (
    <div
      dir="rtl"
      className="w-full h-screen flex flex-col"
      style={{ backgroundColor: colors.background }}
    >
      <Header showDefault={showDefaultHeader} />
      <div className="flex-grow flex flex-col">
        <div className="flex-grow">{children}</div>
        {!hideNavigation && (
          <div className="lg:flex fixed bottom-0 left-0 w-full z-50">
            <Navigation />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
