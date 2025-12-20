import UserAvatar from "@/components/layout/navbar/UserAvatar";
import type { IUser } from "@/types";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";

type ProfileHeaderProps = {
    user: IUser;
};

function ProfileHeader({ user }: ProfileHeaderProps) {
    const fullUserName = user.firstName + " " + user.lastName;

    return (
        <header className="col-span-3 bg-white flex flex-wrap items-center justify-between gap-2 p-4 md:px-8 border border-gray-300 mt-4">
            <UserAvatar
                avatar={user.image}
                userName={fullUserName}
                size={100}
                key={user.image}
            />
            <div className="flex-1">
                <p className="font-semibold">{fullUserName}</p>
                <p className="text-gray-500 text-sm">{user.headLine}</p>
            </div>
            <a href={user.links[0].link} target="_blank">
                <FacebookOutlined className="bg-gray-100! p-3 text-gray-600! text-lg" />
            </a>
            <a href={user.links[1].link} target="_blank">
                <InstagramOutlined className="bg-gray-100! p-3 text-gray-600! text-lg" />
            </a>
        </header>
    );
}

export default ProfileHeader;
