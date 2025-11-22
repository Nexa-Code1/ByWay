import {
    CalendarOutlined,
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

import type { IAllInOneEle } from "../types";
import testimonialImg1 from "../assets/images/testimonial-1.jpg";
import testimonialImg2 from "../assets/images/testimonial-2.jpg";
import testimonialImg3 from "../assets/images/testimonial-3.jpg";

export const whatIsByway = {
    en: "Our platform is a learning hub where students can easily purchase courses, track their progress, and share their feedback. It offers multiple secure payment options for a smooth learning experience. Instructors can also upload their own courses, manage their content, and reach a wide community of learners — all in one place.",
    ar: "منصتنا منصة تعليمية تُمكّن الطلاب من شراء الدورات بسهولة، ومتابعة تقدمهم، ومشاركة ملاحظاتهم. كما تُوفر خيارات دفع آمنة ومتعددة لتجربة تعليمية سلسة. كما يُمكن للمدرسين تحميل دوراتهم الخاصة، وإدارة محتواها، والوصول إلى قاعدة واسعة من المتعلمين - كل ذلك في مكان واحد.",
};

export const stats = [
    {
        statistic: "15K+",
        label: { en: "students", ar: "طلاب" },
    },
    {
        statistic: "75%",
        label: { en: "total success", ar: "نسبة النجاح" },
    },
    {
        statistic: "35",
        label: { en: "Main questions", ar: "أسئلة رئيسية" },
    },
    {
        statistic: "26",
        label: { en: "Chief experts", ar: "كبار الخبراء" },
    },
    {
        statistic: "16",
        label: { en: "years of experience", ar: "سنوات من الخبرة" },
    },
];

export const allInOne: IAllInOneEle[] = [
    {
        icon: <FileTextOutlined />,
        iconBgColor: "#5B72EE",
        title: {
            en: "Online Courses Marketplace",
            ar: "سوق الدورات التدريبية عبر الإنترنت",
        },
        content: {
            en: "Browse a wide range of courses across different specialties. Students can easily purchase courses, access learning materials instantly, and study at their own pace.",
            ar: "تصفح مجموعة واسعة من الدورات في مختلف التخصصات. يمكن للطلاب شراء الدورات بسهولة، والوصول إلى المواد التعليمية فورًا، والدراسة بالسرعة التي تناسبهم.",
        },
    },
    {
        icon: <CalendarOutlined />,
        iconBgColor: "#F48C06",
        title: {
            en: "Progress Tracking & Learning Management",
            ar: "تتبع التقدم وإدارة التعلم",
        },
        content: {
            en: "Students can monitor their completed lessons, quizzes, and certificates in real time. The system keeps detailed records of progress across all enrolled courses.",
            ar: "يمكن للطلاب متابعة دروسهم واختباراتهم وشهاداتهم المكتملة آنيًا. يحتفظ النظام بسجلات مفصلة لتقدم جميع الدورات المسجلة.",
        },
    },
    {
        icon: <DashboardOutlined />,
        iconBgColor: "#29B9E7",
        title: {
            en: "Instructor Dashboard & Earnings",
            ar: "لوحة معلومات المدرب والأرباح",
        },
        content: {
            en: "Instructors can upload video lessons, resources, and quizzes. They can track course performance and receive earnings directly in their accounts.",
            ar: "يمكن للمدرسين تحميل دروس فيديو وموارد واختبارات. كما يمكنهم متابعة أداء الدورة واستلام الأرباح مباشرةً في حساباتهم.",
        },
    },
];

export const testimonials = [
    {
        image: testimonialImg1,
        userName: "Lina Ahmed",
        comment:
            "Thank you so much for your help. It's exactly what I've been looking for. You won't regret it. It really saves me time and effort. ByWay is exactly what our business has been lacking.",
    },
    {
        image: testimonialImg2,
        userName: "Mohamed Khaled",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dignissimos dicta, necessitatibus doloremque enim, libero molestias repellendus.",
    },
    {
        image: testimonialImg3,
        userName: "Ali Mohamed",
        comment:
            "Sunt, earum. Perferendis nulla et optio quam aliquam libero accusantium dolores amet, magnam eum culpa doloribus laborum iste minima nostrum atque voluptate!",
    },
];
