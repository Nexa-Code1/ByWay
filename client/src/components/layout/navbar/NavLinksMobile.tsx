import { useState, type MouseEvent } from "react";
import { Link } from "react-router";
import {
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";

import { navLinks } from "../../../utils/navLinks";

const items = [
    ...navLinks.map((link) => ({
        key: link.key,
        icon: link.icon,
        label: <Link to={link.path}>{link.label}</Link>,
    })),
    {
        key: "login",
        label: <a>Login</a>,
        icon: <LoginOutlined />,
    },
    {
        key: "signup",
        label: <a>Signup</a>,
        icon: <UserAddOutlined />,
    },
];

function App() {
    const [collapse, setCollapse] = useState(true);

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
