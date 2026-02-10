import { useNavigate } from "react-router";
import { Button, Dropdown, type MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { useDeleteCourse } from "@/hooks/courses/useDeleteCourse";
import { handleGetCourseDetails } from "@/api/courses/courses";
import { useNewCourseContext } from "@/instructor/context/NewCourseContext";

type CourseControlMenuProps = {
    courseId: string;
};

function CourseControlMenu({ courseId }: CourseControlMenuProps) {
    const navigate = useNavigate();
    const { setEditMode, updateBasicInfo, updateCourseContent } =
        useNewCourseContext();
    const { deleteCourse } = useDeleteCourse();

    async function editCourseHandler() {
        try {
            // Fetch course details first
            const courseDetails = await handleGetCourseDetails(courseId);

            // Set edit mode
            setEditMode(true, courseId);

            if (courseDetails && courseDetails.course) {
                const course = courseDetails.course;

                // Update basic info
                updateBasicInfo({
                    title: course.title,
                    subTitle: course.subTitle,
                    price: course.price,
                    description: course.description,
                    requirements: course.requirements,
                    category: course.category?._id,
                    imagePreview: course.image,
                });

                // Update course content if available
                if (course.content) {
                    updateCourseContent(course.content);
                }
            }

            // Navigate to basic information page
            navigate("/instructor/create-course/basic-information");
        } catch {
            // Still navigate even if there's an error
            setEditMode(true, courseId);
            navigate("/instructor/create-course/basic-information");
        }
    }

    const items: MenuProps["items"] = [
        // {
        //     label: (
        //         <NavLink
        //             to={`/instructor/my-courses/${courseId}`}
        //             className="p-0! bg-transparent!"
        //         >
        //             View Details
        //         </NavLink>
        //     ),
        //     key: "0",
        // },
        {
            label: (
                <Button
                    type="text"
                    className="p-0! bg-transparent!"
                    onClick={editCourseHandler}
                >
                    Edit Course
                </Button>
            ),
            key: "1",
        },
        {
            label: (
                <ConfirmationModal
                    triggerBtnType="text"
                    triggerBtnStyles="p-0! bg-transparent!"
                    triggerBtnLabel="Delete Course"
                    onConfirm={() => deleteCourse(courseId)}
                />
            ),
            key: "2",
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
                <MoreOutlined />
            </a>
        </Dropdown>
    );
}

export default CourseControlMenu;
