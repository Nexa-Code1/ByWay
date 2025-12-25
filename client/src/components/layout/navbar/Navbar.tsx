import { Link } from "react-router";
import { Header } from "antd/es/layout/layout";

import NavLinks from "./NavLinks";
import NavLinksMobile from "./NavLinksMobile";
import RegisterBtns from "./RegisterBtns";
import UserMenu from "./UserMenu";
import SectionContainer from "@/components/shared/SectionContainer";
import Logo from "@/components/shared/Logo";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import PageSpinner from "@/components/shared/PageSpinner";

function Navbar() {
    const { userProfile, isLoading, error } = useUserProfile();

    if (isLoading) return <PageSpinner />;

    return (
        <Header className="bg-gray-900! h-20! flex items-center justify-center px-0!">
            <SectionContainer className="flex items-center justify-between gap-2 my-0!">
                <Link to="/">
                    <Logo />
                </Link>
                <NavLinks />
                <div className="hidden md:flex items-center gap-2">
                    {!isLoading && (error || !userProfile) ? (
                        <RegisterBtns shape="round" />
                    ) : (
                        <UserMenu user={userProfile.user} />
                    )}
                </div>
                <NavLinksMobile />
            </SectionContainer>
        </Header>
    );
}

export default Navbar;
