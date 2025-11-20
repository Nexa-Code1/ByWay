import { Link } from "react-router";
import { Header } from "antd/es/layout/layout";

import NavLinks from "./NavLinks";
import Logo from "../../shared/Logo";
import NavLinksMobile from "./NavLinksMobile";
import RegisterBtns from "./RegisterBtns";

function Navbar() {
    return (
        <Header className="bg-gray-900! h-auto! flex items-center justify-center px-0!">
            <div className="container flex items-center justify-between gap-2 p-2">
                <Link to="/">
                    <Logo />
                </Link>
                <NavLinks />
                <div className="hidden md:flex items-center gap-2">
                    <RegisterBtns shape="round" />
                </div>
                <NavLinksMobile />
            </div>
        </Header>
    );
}

export default Navbar;
