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
]);
