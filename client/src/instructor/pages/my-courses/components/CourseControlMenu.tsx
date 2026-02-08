import { useNavigate } from "react-router";
import { Button, Dropdown, type MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";

import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { useDeleteCourse } from "@/hooks/courses/useDeleteCourse";

type CourseControlMenuProps = {
    courseId: string;
};

function CourseControlMenu({ courseId }: CourseControlMenuProps) {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["draftCourseId"]);

    const { deleteCourse } = useDeleteCourse();

    function editCourseHandler() {
        setCookie("draftCourseId", courseId);
        navigate("/instructor/create-course/basic-information", {
            state: { draftCourseId: courseId },
        });
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
