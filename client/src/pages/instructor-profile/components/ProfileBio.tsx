import TextDescription from "@/components/shared/TextDescription";

type ProfileBioProps = {
    bio: string;
};

function ProfileBio({ bio }: ProfileBioProps) {
    return (
        <aside className="bg-white col-span-3 sm:col-span-1 border border-gray-300 p-4">
            <h2 className="font-medium text-primary-700 capitalize">
                About me
            </h2>
            <TextDescription>{bio}</TextDescription>
        </aside>
    );
}

export default ProfileBio;
