import { NavLink } from "react-router";

const profileLinks = [
    { label: "Courses", path: "/profile/student-courses" },
    { label: "Wishlist", path: "/profile/wishlist" },
    { label: "Purchase History", path: "/profile/purchase-history" },
    { label: "Payment Methods", path: "/profile/payment-methods" },
    { label: "Settings", path: "/profile/settings" },
];

function ProfileNav() {
    return (
        <nav className="flex flex-wrap items-center md:justify-between gap-2">
            {profileLinks.map((link) => (
                <NavLink
                    key={link.label}
                    to={link.path}
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "text-black border-b-2 border-b-orange-100"
                                : "text-gray-700"
                        } px-4 py-2 md:px-8 font-medium`
                    }
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
}

export default ProfileNav;
