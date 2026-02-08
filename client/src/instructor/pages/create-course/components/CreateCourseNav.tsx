import { NavLink } from "react-router";

import { createCourseNavLinks } from "@/utils/navLinks";

function CreateCourseNav() {
    return (
        <ul className="flex justify-between items-center gap-8 border-b-2 border-b-gray-200 mb-8 touch-pan-x whitespace-nowrap overflow-auto scroll-m-0">
            {createCourseNavLinks.map((link) => (
                <li key={link.key}>
                    <NavLink
                        to={link.path}
                        className={({ isActive }: { isActive: boolean }) =>
                            `${
                                isActive
                                    ? "text-primary-700 border-b-2 border-b-orange-100"
                                    : "text-gray-600"
                            } font-medium px-4 pb-[calc(15px)] flex items-center gap-2`
                        }
                    >
                        {link.icon}
                        <span>{link.label.en}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default CreateCourseNav;
