import { Link } from "react-router";
import { Progress } from "antd";

import Card from "@/components/shared/Card";
import UserAvatar from "@/components/layout/navbar/UserAvatar";
import courseImg from "@/assets/images/course.jpg";

function ContinueCourseCard() {
    return (
        <Card className="text-start! max-w-lg!">
            <Link to="/">
                <img src={courseImg} alt="course" />
                <h3 className="font-semibold my-3">
                    AWS Certified Solutions Architect
                </h3>
                <UserAvatar avatar="" userName="Wael" size={30} />
                <Progress
                    percent={30}
                    className="mt-2!"
                    strokeColor="#2F327D"
                />
            </Link>
        </Card>
    );
}

export default ContinueCourseCard;
