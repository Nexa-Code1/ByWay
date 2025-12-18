import { Outlet } from "react-router";

import LayoutHeader from "./LayoutHeader";
import NavSidebar from "./NavSidebar";

function InstructorLayout() {
    return (
        <div className="grid grid-cols-[auto_1fr]">
            <NavSidebar />
            <div className="mr-8 ml-12 overflow-hidden">
                <LayoutHeader />
                <Outlet />
            </div>
        </div>
    );
}

export default InstructorLayout;
