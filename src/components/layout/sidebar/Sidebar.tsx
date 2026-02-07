import React, {useState,useEffect} from "react";
import {ReactComponent as SearchIcon} from "../../icons/svg/searchIcon.svg";
import {ReactComponent as UserAvatarIcon} from "../../icons/svg/userAvatar.svg";
import {ReactComponent as SupportIcon} from "../../icons/svg/supportIcon.svg";
import {ReactComponent as NewOrderIcon} from "../../icons/svg/newOrderIcon.svg";
import {ReactComponent as UserIcon} from "../../icons/svg/user.svg";
import {ReactComponent as LogoutIcon} from "../../icons/svg/logoutIcon.svg";
import {ReactComponent as ZoneIcon} from "../../icons/svg/zoneIcon.svg";
import {ReactComponent as FleetIcon} from "../../icons/svg/fleetIcon.svg";
import {ReactComponent as MicroHubIcon} from "../../icons/svg/microhubIcone.svg";
import {ReactComponent as PackageIcon} from "../../icons/svg/packageIcon.svg";
import {ReactComponent as UserMiniIcon} from "../../icons/svg/userMiniIcon.svg";
import {ReactComponent as TaskManagerIcon} from "../../icons/svg/taskManagerIcon.svg";
import {ReactComponent as NotificationIcon} from "../../icons/svg/notificationIcon.svg";
import {ReactComponent as Policy} from "../../icons/svg/policy.svg";
import ProgressBar from "../../icons/ProgressBar";
import SidebarMenuDesktop from "./SidebarMenuDesktop";
import { menuData, SupervisorMenuData } from "./menuData";
import SidebarMenuMini from "./SidebarMenuMini";
import {useLocation} from "react-router-dom";
import { useTheme } from "../../../components/hooks/theme/ThemeContext";
import {RemoveUserTokenAndRedirect} from "../../../services/api/ApiToken";
import {useFetch} from "../../hooks/fetch/useFetch";
import {GetUserInfo} from "../../../setting/ApiUrl";
import {HttpMethod} from "../../../models/enums/HttpMethod";
import {AuthApiHeader} from "../../../services/api/ApiHeader";
import SkeletonDiv from "../../tools/loading/SkeletonDiv";
import { useReactQuery } from "../../../components/hooks/query/useReactQuery";
import useStore from "../../../store/zustand/store";
import  sidebarWidget  from "./sidebarWidgets";


export const Sidebar: React.FC = ({mini, setMini}: any) => {
  const userData = useStore((state)=>(state.userData));

    const SidebarComponent = sidebarWidget[userData?.Role]?.Component;

    const { colors } = useTheme();
    const [roleAccess,setRoleAccess]=useState(false);
    const location = useLocation();
    const handleLogout = RemoveUserTokenAndRedirect();

    const miniDashboardSidebarButton = [
        {
            id: 1,
            icon: <UserMiniIcon/>,
            label: "کاربر"
        },
        {
            id: 2,
            icon: <MicroHubIcon/>,
            label: "میکروهاب"
        },
        {
            id: 3,
            icon: <PackageIcon/>,
            label: "پکیج"
        },
        {
            id: 4,
            icon: <FleetIcon/>,
            label: "ناوگان"
        },
        {
            id: 5,
            icon: <ZoneIcon/>,
            label: "زون"
        },
        {
            id:6,
            icon:<TaskManagerIcon/>,
            label:"مدیریت تسک"
        }
    ]
    const [activeTab, setActiveTab] = useState("pending");

    const tabItems = [
        {id: "pending", label: "نیاز به انجام"},
        {id: "inProgress", label: "در حال انجام"},
        {id: "distributed", label: "توزیع شده"},
    ];

    const handleTabClick = (tabId: any) => {
        setActiveTab(tabId);
    };

    return (
      <div
        className=" m-[40px] mt-0 pt-10 mb-0 pb-10 -ml-5 rounded-lg overflow-y-auto max-w-[260px] transition-all"
        style={{ width: mini ? 72 : 260 }}
      >
        <div className="flex justify-start items-center bg-[#ff4b4b] transition-all w-full h-[56px] px-8 rounded-[12px]">
          <div className="w-[50px] transition-all flex items-center justify-center">
            <NotificationIcon />
          </div>
          {!mini && (
            <button className="w-full input input-ghost transition-all text-sm pr-2 text-white bg-transparent focus:outline-none border-none focus:ring-0 focus:bg-transparent text-right">
              <span>اعلان</span>
            </button>
          )}
        </div>

        <div
          className={`collapse rounded-[12px] bg-white mt-[25px] ${
            !mini && "collapse-arrow"
          }`}
        >
          <input type="checkbox" />
        
          <div className="collapse-content flex  w-full items-center justify-center flex-col">
            <button
              className={
                "flex gap-2 items-center w-full justify-start rounded p-2 hover:scale-105 active:scale-100 transition-all"
              }
            >
              <UserIcon className={"w-[18px] h-[18px]"} />
              {!mini && (
                <span className={"text-right text-[#111928] text-sm font-bold"}>
                  حساب کاربری
                </span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className={
                "flex gap-2 items-center w-full justify-start rounded p-2 hover:scale-105 active:scale-100 transition-all"
              }
            >
              <LogoutIcon className={"w-[18px] h-[18px] opacity-75"} />
              {!mini && (
                <span className={"text-right text-[#111928] text-sm font-bold"}>
                  خروج
                </span>
              )}
            </button>
          </div>
        </div>
        {SidebarComponent && <SidebarComponent mini={mini} />}
      </div>
    );
};
