import { Button } from "antd";
import Dropdown from "antd/es/dropdown/dropdown";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";

import type { IUser } from "../../../types";
import UserAvatar from "./UserAvatar";
import { profileLinks } from "../../../utils/profileLinks";
import LogoutBtn from "./LogoutBtn";

type UserMenuProps = {
    user: IUser;
};

function UserMenu({ user }: UserMenuProps) {
    return (
        <Dropdown
            menu={{
                items: [
                    ...profileLinks,
                    {
                        key: "logout",
                        icon: <LogoutOutlined />,
                        label: <LogoutBtn />,
                    },
                ],
            }}
            trigger={["click"]}
            className="md:hidden"
            placement="topRight"
        >
            <Button
                type="text"
                className="flex items-center gap-1 text-gray-300! group"
            >
                <UserAvatar
                    avatar={user.avatar}
                    userName={`${user.firstName} ${user.lastName}`}
                />
                <p className="text-sm">{user.firstName}</p>
                <DownOutlined className="w-3 h-3 group-hover:scale-115 transition-all" />
            </Button>
        </Dropdown>
    );
}

export default UserMenu;
