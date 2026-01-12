import { NavLink } from "react-router";

import { navLinks } from "@/utils/navLinks";
import { useUserProfile } from "@/hooks/user/useUserProfile";

function NavLinks() {
    const lang = "en";

    const { userProfile, isLoading, error } = useUserProfile();

    if (isLoading) return;

    const filteredNavLinks =
        !userProfile || error
            ? navLinks.filter((link) => link.key !== "cart")
            : navLinks;

    return (
        <ul className="items-center justify-between gap-2 flex-1 max-w-xl hidden md:flex">
            {filteredNavLinks.map((link) => (
                <li key={link.key}>
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                            `${
                                isActive ? "text-orange-100!" : "text-gray-300!"
                            } px-2 text-sm focus-within:text-orange-100! hover:text-orange-100! transition-all block`
                        }
                    >
                        {link.label[lang]}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default NavLinks;
