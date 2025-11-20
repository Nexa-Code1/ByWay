import { createBrowserRouter } from "react-router";

import {
    Courses,
    CourseDetails,
    Home,
    NotFound,
    SearchCourses,
    Blogs,
    BlogDetails,
    BecomeInstructor,
    InstructorProfile,
    StudentProfile,
    ProtectedRoute,
    ContactUs,
    FAQ,
    AuthVerification,
} from "./pages";

import {
    Cart,
    Checkout,
    CourseLesson,
    PaymentMethods,
    Profile,
    PurchaseHistory,
    StudentSettings,
    StudentCourseDetails,
    StudentCourses,
    Success,
    Wishlist,
} from "./students/pages";

import {
    CreateBlog,
    CreateCourse,
    CreateCourseAdvancedInfo,
    CreateCourseBasicInfo,
    CreateCourseCurriculum,
    CreateCoursePublish,
    Earning,
    InstructorDashboard,
    InstructorSettings,
    MyBlogDetails,
    MyBlogs,
    MyCourseDetails,
    MyCourses,
    InstructorLayout,
} from "./instructor/pages";

import AppLayout from "./components/layout/AppLayout";

export const router = createBrowserRouter([
    // Public
    { path: "*", Component: NotFound },
    {
        path: "/",
        Component: AppLayout,
        children: [
            // PUBLIC (GUESTS, STUDENTS, INSTRUCTORS)
            { index: true, Component: Home },
            {
                path: "auth/verification/:verifyEmailToken",
                Component: AuthVerification,
            },
            {
                path: "courses",
                children: [
                    { index: true, Component: Courses },
                    {
                        path: ":courseId",
                        Component: CourseDetails,
                    },
                    {
                        path: "search",
                        Component: SearchCourses,
                    },
                ],
            },
            {
                path: "blogs",
                children: [
                    { index: true, Component: Blogs },
                    {
                        path: ":blogId",
                        Component: BlogDetails,
                    },
                ],
            },
            {
                path: "become-instructor",
                Component: BecomeInstructor,
            },
            {
                path: "instructors/:instructorId",
                Component: InstructorProfile,
            },
            {
                path: "students/:studentId",
                Component: StudentProfile,
            },
            {
                path: "contact-us",
                Component: ContactUs,
            },
            {
                path: "faq",
                Component: FAQ,
            },
            // CART
            {
                path: "cart",
                children: [
                    { index: true, Component: Cart },
                    // PRIVATE STUDENTS ONLY
                    {
                        path: "checkout",
                        children: [
                            {
                                index: true,
                                element: (
                                    <ProtectedRoute role="student">
                                        <Checkout />
                                    </ProtectedRoute>
                                ),
                            },
                            {
                                path: "success",
                                Component: Success,
                            },
                        ],
                    },
                ],
            },
            // STUDENT
            // PRIVATE STUDENTS ONLY
            {
                path: "profile",
                element: (
                    <ProtectedRoute role="student">
                        <Profile />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "student-courses",
                        children: [
                            { index: true, Component: StudentCourses },
                            {
                                path: ":courseId",
                                children: [
                                    {
                                        index: true,
                                        Component: StudentCourseDetails,
                                    },
                                    {
                                        path: ":lessonId",
                                        Component: CourseLesson,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: "wishlist",
                        Component: Wishlist,
                    },
                    {
                        path: "purchase-history",
                        Component: PurchaseHistory,
                    },
                    {
                        path: "payment-methods",
                        Component: PaymentMethods,
                    },
                    {
                        path: "settings",
                        Component: StudentSettings,
                    },
                ],
            },
        ],
    },
    // INSTRUCTOR
    // PRIVATE INSTRUCTORS ONLY
    {
        path: "/instructor",
        element: (
            <ProtectedRoute role="instructor">
                <InstructorLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "dashboard",
                Component: InstructorDashboard,
            },
            {
                path: "create-course",
                Component: CreateCourse,
                children: [
                    {
                        path: "basic-information",
                        Component: CreateCourseBasicInfo,
                    },
                    {
                        path: "advanced-information",
                        Component: CreateCourseAdvancedInfo,
                    },
                    {
                        path: "curriculum",
                        Component: CreateCourseCurriculum,
                    },
                    {
                        path: "publish",
                        Component: CreateCoursePublish,
                    },
                ],
            },
            {
                path: "create-blog",
                Component: CreateBlog,
            },
            {
                path: "my-blogs",
                children: [
                    { index: true, Component: MyBlogs },
                    { path: ":blogId", Component: MyBlogDetails },
                ],
            },
            {
                path: "my-courses",
                children: [
                    { index: true, Component: MyCourses },
                    { path: ":courseId", Component: MyCourseDetails },
                ],
            },
            {
                path: "earning",
                Component: Earning,
            },
            {
                path: "settings",
                Component: InstructorSettings,
            },
        ],
    },
]);
