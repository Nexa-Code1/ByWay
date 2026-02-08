import { createBrowserRouter, Navigate } from "react-router";

import {
    Courses,
    CourseDetails,
    Home,
    NotFound,
    Search,
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
    StudentCourseDetails,
    StudentCourses,
    Success,
    Wishlist,
    StudentSettings,
} from "./students/pages";

import {
    CreateBlog,
    CreateCourse,
    CreateCourseBasicInfo,
    CreateCourseCurriculum,
    CreateCoursePublish,
    // Earning,
    // InstructorDashboard,
    MyBlogDetails,
    MyBlogs,
    MyCourseDetails,
    MyCourses,
    InstructorLayout,
    InstructorSettings,
} from "./instructor/pages";

import AppLayout from "@/components/layout/AppLayout";

export const router = createBrowserRouter([
    // Public
    { path: "*", Component: NotFound },
    {
        path: "/",
        element: (
            <ProtectedRoute roles={["guest", "student"]}>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            // PUBLIC (GUESTS, STUDENTS)
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
                ],
            },
            {
                path: "search",
                Component: Search,
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
            // STUDENT
            // PRIVATE STUDENTS ONLY
            // CART
            {
                path: "cart",
                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoute roles={["student"]}>
                                <Cart />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "checkout",
                        Component: Checkout,
                    },
                    {
                        path: "success",
                        Component: Success,
                    },
                ],
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute roles={["student"]}>
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
            <ProtectedRoute roles={["instructor"]}>
                <InstructorLayout />
            </ProtectedRoute>
        ),
        children: [
            // {
            //     path: "dashboard",
            //     Component: InstructorDashboard,
            // },
            {
                path: "create-course",
                Component: CreateCourse,
                children: [
                    {
                        index: true,
                        element: (
                            <Navigate
                                to="/instructor/create-course/basic-information"
                                replace
                            />
                        ),
                    },
                    {
                        path: "basic-information",
                        Component: CreateCourseBasicInfo,
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
            // {
            //     path: "earning",
            //     Component: Earning,
            // },
            {
                path: "settings",
                Component: InstructorSettings,
            },
        ],
    },
]);
