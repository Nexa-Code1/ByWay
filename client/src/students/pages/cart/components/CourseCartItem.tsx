import StarsRate from "@/components/shared/StarsRate";
import type { ICourseCart } from "@/types";
import CourseCartItemsActions from "./CourseCartItemsActions";
import ListItemImg from "@/components/shared/ListItemImg";
import { Link } from "react-router";
import { calcPriceAfterDiscount } from "@/utils/helper";

type CourseCartItemProps = {
    course: ICourseCart;
};

function CourseCartItem({ course }: CourseCartItemProps) {
    return (
        <li key={course._id} className="flex items-start gap-4">
            <Link to={`/courses/${course._id}`}>
                <ListItemImg image={course.image} alt={course.title} />
            </Link>

            <div className="flex-1 flex flex-col gap-2">
                <Link to={`/courses/${course._id}`}>
                    <h2 className="font-semibold">{course.title}</h2>
                </Link>
                <p className="text-sm">
                    By {course.instructor.firstName}{" "}
                    {course.instructor.lastName}
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-warning-500 text-sm">
                        {course.rate.toFixed(1)}
                    </span>
                    <StarsRate rate={course.rate} />
                </div>
                <CourseCartItemsActions course={course} />
            </div>

            <p className="font-semibold text-primary-500 text-xl">
                {calcPriceAfterDiscount(course.price, course.discount)} EGP
            </p>
        </li>
    );
}

export default CourseCartItem;
