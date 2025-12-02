import { Link } from "react-router";
import { AppstoreOutlined, ClockCircleOutlined } from "@ant-design/icons";

import Card from "./Card";
import TextDescription from "./TextDescription";
import courseImg from "@/assets/images/course.jpg";
import UserAvatar from "../layout/navbar/UserAvatar";

function CourseCard() {
    return (
        <Card className="text-start!">
            <Link to={`/courses/${1}`}>
                <img src={courseImg} alt="course image" />
                <div className="flex items-center justify-between my-4">
                    <div className="flex items-center gap-1">
                        <AppstoreOutlined className="text-lg text-gray-300!" />
                        <span className="text-xs font-semibold text-gray-500">
                            Design
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ClockCircleOutlined className="text-lg text-gray-300!" />
                        <span className="text-xs font-semibold text-gray-500">
                            3 Month
                        </span>
                    </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-4">
                    AWS Certified solutions Architect
                </h3>
                <TextDescription>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Soluta sapiente velit.
                </TextDescription>
                <div className="flex gap-2 items-center justify-between mt-4">
                    <UserAvatar avatar="" userName="Wael" size={30} />
                    <div className="flex items-center gap-1 text-sm">
                        <p className="line-through text-gray-300 italic">
                            4000 EGP
                        </p>
                        <p className="text-primary-700 font-bold">1660 EGP</p>
                    </div>
                </div>
            </Link>
        </Card>
    );
}

export default CourseCard;
