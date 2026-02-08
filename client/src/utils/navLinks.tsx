import {
    AudioOutlined,
    // BarChartOutlined,
    CheckCircleOutlined,
    CopyOutlined,
    DiffOutlined,
    FileOutlined,
    // CreditCardOutlined,
    FileSearchOutlined,
    FileTextOutlined,
    HighlightOutlined,
    HomeOutlined,
    PlusCircleOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    VideoCameraOutlined,
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
        key: "blog",
        path: "/blogs",
        label: { en: "Blog", ar: "مقالات" },
        icon: <FileOutlined />,
    },
    {
        key: "search",
        path: "/search",
        label: { en: "Search", ar: "بحث" },
        icon: <FileSearchOutlined />,
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

export const instructorNavLinks = [
    // {
    //     key: "dashboard",
    //     path: "/instructor/dashboard",
    //     label: { en: "Dashboard", ar: "لوحة التحكم" },
    //     icon: <BarChartOutlined />,
    // },
    {
        key: "create-blog",
        path: "/instructor/create-blog",
        label: { en: "Create New Blog", ar: "انشاء مقالة جديدة" },
        icon: <DiffOutlined />,
    },
    {
        key: "create-course",
        path: "/instructor/create-course",
        label: { en: "Create New Course", ar: "انشاء كورس جديد" },
        icon: <PlusCircleOutlined />,
    },
    {
        key: "my-courses",
        path: "/instructor/my-courses",
        label: { en: "My Courses", ar: "كورساتى" },
        icon: <CopyOutlined />,
    },
    {
        key: "my-blogs",
        path: "/instructor/my-blogs",
        label: { en: "My Blogs", ar: "مقالاتى" },
        icon: <HighlightOutlined />,
    },
    // {
    //     key: "erarning",
    //     path: "/instructor/earning",
    //     label: { en: "Earning", ar: "الارباح" },
    //     icon: <CreditCardOutlined />,
    // },
    {
        key: "settings",
        path: "/instructor/settings",
        label: { en: "Settings", ar: "الاعدادات" },
        icon: <SettingOutlined />,
    },
];

export const createCourseNavLinks = [
    {
        key: "basic-information",
        path: "/instructor/create-course/basic-information",
        label: { en: "Basic Information", ar: "معلومات أساسية" },
        icon: <CopyOutlined />,
    },
    {
        key: "curriculum",
        path: "/instructor/create-course/curriculum",
        label: { en: "Curriculum", ar: "مقرر" },
        icon: <VideoCameraOutlined />,
    },
    {
        key: "publish-course",
        path: "/instructor/create-course/publish",
        label: { en: "Publish Course", ar: "نشر الكورس" },
        icon: <CheckCircleOutlined />,
    },
];
