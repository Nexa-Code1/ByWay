import type { MouseEvent } from "react";

import { useLogout } from "@/hooks/auth/useLogout";

function LogoutBtn() {
    const { logout } = useLogout();

    function handleLogout(
        e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
    ) {
        e.preventDefault();
        logout();
    }
    return (
        <a onClick={handleLogout} className="cursor-pointer logout">
            logout
        </a>
    );
}

export default LogoutBtn;
