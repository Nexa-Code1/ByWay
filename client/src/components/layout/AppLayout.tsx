import { Outlet } from "react-router";

import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="container mx-auto flex-1 px-2">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
