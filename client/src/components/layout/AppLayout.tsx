import { Outlet } from "react-router";

import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

function AppLayout() {
    return (
        <div className="flex flex-col">
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="min-h-[calc(100vh-80px)] w-full flex-1">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default AppLayout;
