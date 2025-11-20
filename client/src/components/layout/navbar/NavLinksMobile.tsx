import { useState, type MouseEvent } from "react";
import { Link } from "react-router";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Dropdown from "antd/es/dropdown/dropdown";

import { navLinks } from "../../../utils/navLinks";
import RegisterBtns from "./RegisterBtns";
import { useUserProfile } from "../../../hooks/user/useUserProfile";
import type { MenuItemType } from "../../../types";
import UserProfileLink from "./UserProfileLink";

const baseItems: MenuItemType[] = [
    ...navLinks.map((link) => ({
        key: link.key,
        icon: link.icon,
        label: <Link to={link.path}>{link.label}</Link>,
    })),
];

function App() {
    const [collapse, setCollapse] = useState(true);
    const { userProfile, isLoading } = useUserProfile();

    const items: MenuItemType[] =
        !isLoading && userProfile
            ? [
                  {
                      key: "userProfile",
                      label: <UserProfileLink userProfile={userProfile} />,
                  },
                  ...baseItems,
              ]
            : [
                  ...baseItems,
                  {
                      key: "register",
                      label: (
                          <div className="flex items-center gap-2">
                              <RegisterBtns shape="round" />
                          </div>
                      ),
                  },
              ];

    function handleCollapseMenu(
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) {
        e.preventDefault();
        setCollapse((isCollapsed) => !isCollapsed);
    }

    return (
        <Dropdown menu={{ items }} trigger={["click"]} className="md:hidden">
            <button
                onClick={handleCollapseMenu}
                className="text-gray-300 cursor-pointer hover:text-orange-100 transition-all text-xl"
            >
                {collapse ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </button>
        </Dropdown>
    );
}

export default App;
