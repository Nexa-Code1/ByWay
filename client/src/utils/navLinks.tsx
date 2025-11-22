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
        label: { en: "Home", ar: "الرئيسية" },
        icon: <HomeOutlined />,
    },
    {
        key: "courses",
        path: "/courses",
        label: { en: "Courses", ar: "الدورات التدريبية" },
        icon: <FileTextOutlined />,
    },
    {
        key: "search",
        path: "/courses/search",
        label: { en: "Search", ar: "بحث" },
        icon: <FileSearchOutlined />,
    },
    {
        key: "blog",
        path: "/blogs",
        label: { en: "Blog", ar: "مقالات" },
        icon: <FileOutlined />,
    },
    {
        key: "cart",
        path: "/cart",
        label: { en: "Cart", ar: "عربة التسوق" },
        icon: <ShoppingCartOutlined />,
    },
    {
        key: "become-instructor",
        path: "/become-instructor",
        label: { en: "Become Instructor", ar: "أصبح مدربا" },
        icon: <AudioOutlined />,
    },
];
