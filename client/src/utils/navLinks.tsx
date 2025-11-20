import {
    AudioOutlined,
    FileOutlined,
    FileSearchOutlined,
    FileTextOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";

export const navLinks = [
    {
        key: "home",
        path: "/",
        label: "Home",
        icon: <HomeOutlined />,
    },
    {
        key: "courses",
        path: "/courses",
        label: "Courses",
        icon: <FileTextOutlined />,
    },
    {
        key: "search",
        path: "/courses/search",
        label: "Search",
        icon: <FileSearchOutlined />,
    },
    {
        key: "blog",
        path: "/blogs",
        label: "Blog",
        icon: <FileOutlined />,
    },
    {
        key: "cart",
        path: "/cart",
        label: "Cart",
        icon: <ShoppingCartOutlined />,
    },
    {
        key: "become-instructor",
        path: "/become-instructor",
        label: "Become Instructor",
        icon: <AudioOutlined />,
    },
];
