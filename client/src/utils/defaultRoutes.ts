interface RoutesMap {
    [key: string]: string;
}

const defaultRoutes: RoutesMap = {
    guest: "/",
    student: "/",
    instructor: "/instructor",
    admin: "/admin",
};

export default defaultRoutes;
