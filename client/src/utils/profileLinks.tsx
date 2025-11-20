import { Link } from "react-router";
import {
    CreditCardOutlined,
    FileTextOutlined,
    HistoryOutlined,
    LikeOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";

import type { MenuItemType } from "../types";

export const profileLinks: MenuItemType[] = [
    {
        key: "profile",
        icon: <UserOutlined />,
        label: <Link to="/profile">profile</Link>,
    },
    {
        key: "my-learnings",
        icon: <FileTextOutlined />,
        label: <Link to="/profile/student-courses">my learnings</Link>,
    },
    {
        key: "wishlist",
        icon: <LikeOutlined />,
        label: <Link to="/profile/wishlist">wishlist</Link>,
    },
    {
        key: "purchase-history",
        icon: <HistoryOutlined />,
        label: <Link to="/profile/purchase-history">purchase history</Link>,
    },
    {
        key: "payment-methods",
        icon: <CreditCardOutlined />,
        label: <Link to="/profile/payment-methods">payment methods</Link>,
    },
    {
        key: "settings",
        icon: <SettingOutlined />,
        label: <Link to="/profile/settings">settings</Link>,
    },
    {
        key: "logout",
        icon: <LogoutOutlined />,
        label: <a>logout</a>,
    },
];
