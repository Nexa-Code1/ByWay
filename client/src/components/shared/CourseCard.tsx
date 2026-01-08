import { Link } from "react-router";
import { AppstoreOutlined } from "@ant-design/icons";

import Card from "./Card";
import TextDescription from "./TextDescription";
import courseImg from "@/assets/images/course.jpg";
import UserAvatar from "../layout/navbar/UserAvatar";
import type { ICourseDetails } from "@/types";

type CourseCardProps = {
    course: ICourseDetails;
};

function CourseCard({ course }: CourseCardProps) {
    const lang = "en";

    return (
        <Card className="text-start!">
            <Link
                to={`/courses/${course._id}`}
                className="h-full flex flex-col gap-4"
            >
                <img src={courseImg} alt="course image" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <AppstoreOutlined className="text-lg text-gray-300!" />
                        <span className="text-xs font-semibold text-gray-500">
                            {course.category.name[lang]}
                        </span>
                    </div>
                    {/* <div className="flex items-center gap-1">
                        <ClockCircleOutlined className="text-lg text-gray-300!" />
                        <span className="text-xs font-semibold text-gray-500">
                            3 Month
                        </span>
                    </div> */}
                </div>
                <h3 className="font-semibold text-gray-800">{course.title}</h3>
                <TextDescription className="flex-1!">
                    {course.subTitle}
                </TextDescription>
                <div className="flex gap-2 items-center text-sm">
                    <UserAvatar
                        avatar={course.instructor.image}
                        userName={course.instructor.firstName}
                        size={30}
                    />
                    <p className="font-medium text-xs flex-1">
                        {course.instructor.firstName}
                    </p>
                    {course.discount !== 0 && (
                        <p className="line-through text-gray-300 italic">
                            {course.price} EGP
                        </p>
                    )}
                    <p className="text-primary-700 font-bold">
                        {course.price - (course.price * course.discount) / 100}{" "}
                        EGP
                    </p>
                </div>
            </Link>
        </Card>
    );
}

export default CourseCard;
