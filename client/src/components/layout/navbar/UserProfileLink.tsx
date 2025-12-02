import { Link } from "react-router";
import { CaretRightFilled } from "@ant-design/icons";

import UserAvatar from "./UserAvatar";
import type { IUser } from "../../../types";

type UserProfileLinkProps = {
    userProfile: IUser;
};

function UserProfileLink({ userProfile }: UserProfileLinkProps) {
    return (
        <Link
            to={userProfile.role === "student" ? "/profile" : "/instructor"}
            className="flex items-center gap-1"
        >
            <UserAvatar
                avatar={userProfile.avatar}
                userName={`${userProfile.firstName} ${userProfile.lastName}`}
            />
            <CaretRightFilled className="w-3 h-3" />
        </Link>
    );
}

export default UserProfileLink;
