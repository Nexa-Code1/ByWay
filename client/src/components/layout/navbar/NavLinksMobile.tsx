import { useState, type MouseEvent } from "react";
import { Link } from "react-router";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Dropdown from "antd/es/dropdown/dropdown";

import { navLinks } from "../../../utils/navLinks";
import RegisterBtns from "./RegisterBtns";

const items = [
    ...navLinks.map((link) => ({
        key: link.key,
        icon: link.icon,
        label: <Link to={link.path}>{link.label}</Link>,
    })),
    {
        key: "register",
        label: (
            <div className="flex items-center gap-2">
                <RegisterBtns />
            </div>
        ),
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
