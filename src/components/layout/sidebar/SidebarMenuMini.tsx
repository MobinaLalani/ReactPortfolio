import React from 'react';
import {Link, useLocation} from "react-router-dom";

interface MenuItem {
    title: string;
    path: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
}

interface MenuProps {
    items: MenuItem[];
    className?: string;
}

const NarrowMenu: React.FC<MenuProps> = ({items}) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path: string): boolean =>
        currentPath === path || currentPath.includes(`${path}/new`);

    const isParentActive = (path: string, children?: MenuItem[]): boolean => {
        if (currentPath.startsWith(path) || currentPath.includes(`${path}/new`)) return true; // بررسی شامل بودن /new
        if (children) {
            return children.some(child => isParentActive(child.path, child.children));
        }
        return false;
    };

    return (
        <div className="relative overflow-x-hidden">
            <ul className="menu rounded-xl gap-1 w-full bg-white max-w-[160px] mb-2">
                {items.map((item) => (
                    <li
                        key={item.path}
                        className={`hover:scale-105 active:scale-100 transition-all ${
                            isParentActive(item.path, item.children)
                                ? 'bg-[#FF4B4B] rounded-xl max-w-[100px] text-white'
                                : 'bg-transparent text-black bg-white hover:bg-gray-100 rounded-xl'
                        } `}
                    >
                        {item.children ? (
                            <details
                                className="group"
                                open={isParentActive(item.path, item.children)}
                            >
                                <summary className="flex items-center justify-between font-bold gap-10 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        {item.icon && (
                                            <span>
                                                {React.isValidElement(item.icon) &&
                                                    React.cloneElement(item.icon as React.ReactElement, {
                                                        strokeColor: isActive(item.path) ? '#FFF' : '#000',
                                                    })}
                                            </span>
                                        )}
                                    </div>
                                </summary>
                                <div
                                    className="relative left-6 rounded-xl overflow-hidden transition-all duration-300 ease-in-out group-open:max-h-[500px] group-open:opacity-100 max-h-0 opacity-0"
                                >
                                    <NarrowMenu items={item.children}/>
                                </div>
                            </details>
                        ) : (
                            <Link
                                to={item.path}
                                className={`flex items-center my-1 font-bold gap-2 break-words ${
                                    isActive(item.path) ? 'bg-[#FF4B4B] rounded-lg text-white' : ''
                                }`}
                            >
                                {item.icon && (
                                    <span>
                                        {React.isValidElement(item.icon) &&
                                            React.cloneElement(item.icon as React.ReactElement, {
                                                strokeColor: isActive(item.path) ? '#FFF' : '#000',
                                            })}
                                    </span>
                                )}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NarrowMenu;
