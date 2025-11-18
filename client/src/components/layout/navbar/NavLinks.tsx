import { NavLink } from "react-router";
import { navLinks } from "../../../utils/navLinks";

function NavLinks() {
    return (
        <ul className="items-center justify-between gap-2 flex-1 max-w-xl hidden md:flex">
            {navLinks.map((link) => (
                <li key={link.key}>
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                            `${
                                isActive ? "text-orange-100!" : "text-gray-300!"
                            } px-2 text-sm focus-within:text-orange-100! hover:text-orange-100! transition-all block`
                        }
                    >
                        {link.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default NavLinks;
