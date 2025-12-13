import { NavLink } from "react-router";
import { LogoutOutlined } from "@ant-design/icons";

import { instructorNavLinks } from "@/utils/navLinks";
import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import { useLogout } from "@/hooks/auth/useLogout";

function NavSidebar() {
    const { logout, isLoggingout } = useLogout();

    return (
        <>
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
                <AppSubmitBtn
                    isLoading={isLoggingout}
                    className="bg-transparent! border-0! w-fit! my-4"
                >
                    <LogoutOutlined />
                    <span>Sign out</span>
                </AppSubmitBtn>
            </form>
        </>
    );
}

export default NavSidebar;
