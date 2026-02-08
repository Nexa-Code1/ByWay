import { NavLink } from "react-router";
import { LogoutOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useState } from "react";

import { instructorNavLinks } from "@/utils/navLinks";
import { useLogout } from "@/hooks/auth/useLogout";
import Logo from "@/components/shared/Logo";

function NavSidebar() {
    const { logout, isLoggingout } = useLogout();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            className={`min-w-64 flex flex-col fixed md:sticky h-screen bg-white z-20 top-0 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform ease-linear duration-150 shadow-xl`}
        >
            <Button
                type="text"
                className={`w-fit absolute -right-64 top-6 shadow-2xl! inline-block! md:hidden! bg-gray-50! rounded-r-full! z-30!`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </Button>

            <div className="m-4 flex items-center justify-between gap-2">
                <Logo textStyle="text-primary-700 font-bold text-xl" />
            </div>

            <ul className="flex-1 flex flex-col">
                {instructorNavLinks.map((link) => (
                    <li key={link.key}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }: { isActive: boolean }) =>
                                `${
                                    isActive
                                        ? "bg-primary-700 text-gray-100"
                                        : ""
                                } flex gap-2 items-center px-8 py-2`
                            }
                        >
                            {link.icon}
                            <span>{link.label["en"]}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    logout();
                }}
            >
                <Button
                    htmlType="submit"
                    className="hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:text-gray-400! capitalize bg-transparent! border-0! w-fit my-4"
                    disabled={isLoggingout}
                >
                    <LogoutOutlined />
                    <span>Sign out</span>
                </Button>
            </form>
        </div>
    );
}

export default NavSidebar;
