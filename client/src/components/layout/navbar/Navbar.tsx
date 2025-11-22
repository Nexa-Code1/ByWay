import { Link } from "react-router";
import { Header } from "antd/es/layout/layout";

import NavLinks from "./NavLinks";
import Logo from "../../shared/Logo";
import NavLinksMobile from "./NavLinksMobile";
import RegisterBtns from "./RegisterBtns";
import UserMenu from "./UserMenu";
import Spinner from "../../shared/Spinner";
import { useUserProfile } from "../../../hooks/user/useUserProfile";
import SectionContainer from "../../shared/SectionContainer";

function Navbar() {
    const { userProfile, isLoading } = useUserProfile();

    return (
        <Header className="bg-gray-900! h-auto! flex items-center justify-center px-0!">
            <SectionContainer className="flex items-center justify-between gap-2 my-0!">
                <Link to="/">
                    <Logo />
                </Link>
                <NavLinks />
                <div className="hidden md:flex items-center gap-2">
                    {isLoading ? (
                        <Spinner />
                    ) : userProfile ? (
                        <UserMenu user={userProfile} />
                    ) : (
                        <RegisterBtns shape="round" />
                    )}
                </div>
                <NavLinksMobile />
            </SectionContainer>
        </Header>
    );
}

export default Navbar;
