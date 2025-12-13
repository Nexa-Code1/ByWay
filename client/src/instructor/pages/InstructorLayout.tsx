import { Outlet } from "react-router";

import Logo from "@/components/shared/Logo";
import NavSidebar from "./NavSidebar";
import LayoutHeader from "./LayoutHeader";

function InstructorLayout() {
    return (
        <div className="grid grid-cols-[auto_1fr]">
            <div className="flex flex-col min-h-screen">
                <div className="m-4">
                    <Logo textStyle="text-primary-700 font-bold text-xl" />
                </div>
                <NavSidebar />
            </div>
            <div className="mx-8">
                <LayoutHeader />
                <Outlet />
            </div>
        </div>
    );
}

export default InstructorLayout;
