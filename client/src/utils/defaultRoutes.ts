interface RoutesMap {
    [key: string]: string;
}

const defaultRoutes: RoutesMap = {
    guest: "/",
    student: "/",
    instructor: "/instructor/dashboard",
    admin: "/admin",
};

export default defaultRoutes;
