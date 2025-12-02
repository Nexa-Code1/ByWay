import { Avatar } from "antd";
import { useState } from "react";

import userPlaceholder from "@/assets/images/user-placeholder.png";

type UserAvatarProps = {
    avatar: string;
    userName: string;
    size?: number;
};

function UserAvatar({ avatar, userName, size = 40 }: UserAvatarProps) {
    const [img, setImg] = useState(avatar || userPlaceholder);

    return (
        <Avatar
            src={
                <img
                    draggable={false}
                    src={img}
                    onError={() => setImg(userPlaceholder)}
                    alt={userName}
                />
            }
            size={size}
        />
    );
}

export default UserAvatar;
