import { Link } from "react-router";
import { formatDistanceToNowStrict } from "date-fns";
import { Rate } from "antd";

import UserAvatar from "@/components/layout/navbar/UserAvatar";

function CourseReview({ review }) {
    return (
        <div className="border-t border-t-gray-200 py-4">
            <header className="flex items-center gap-4 mb-4">
                <UserAvatar
                    avatar={review.user.avatar}
                    userName="test user"
                    size={40}
                />
                <div className="grid grid-cols-2 gap-y-1 gap-x-2 items-center text-sm">
                    <Link
                        to={`/students/${review.user._id}`}
                        className="col-span-2 font-semibold"
                    >
                        {review.user.name}
                    </Link>
                    <Rate
                        allowHalf
                        disabled
                        defaultValue={review.rate}
                        className="text-warning-500! text-sm!"
                    />
                    <p className="text-gray-600">
                        {formatDistanceToNowStrict(new Date(review.createdAt))}{" "}
                        ago
                    </p>
                </div>
            </header>
            <p>{review.comment}</p>
        </div>
    );
}

export default CourseReview;
