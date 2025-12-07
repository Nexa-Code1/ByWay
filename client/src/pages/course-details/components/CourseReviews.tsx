import { StarFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

import CourseDetailWrapper from "./CourseDetailWrapper";
import CourseReview from "./CourseReview";
import { MAX_REVIEWS } from "@/utils/constants";

const reviews = [
    {
        _id: "1",
        user: {
            _id: "1",
            name: "Test User",
            avatar: "",
        },
        rate: 4.5,
        createdAt: "12/4/2025",
        comment: "Lorem ipsum dolor",
    },
    {
        _id: "2",
        user: {
            _id: "2",
            name: "Test User 2",
            avatar: "",
        },
        rate: 4.3,
        createdAt: "12/1/2025",
        comment:
            "I am cs student and i intrested in this course which can help me more in my career",
    },
];

function CourseReviews() {
    const [isShowMore, setIsShowMore] = useState(false);
    const displayedReviews = isShowMore
        ? reviews
        : reviews.slice(0, MAX_REVIEWS);

    return (
        <CourseDetailWrapper title="Reviews">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <StarFilled className="text-warning-500!" />
                <span>4.3 course rating - 14 ratings</span>
            </h2>
            <div className="max-h-90 grid grid-cols-2 gap-4 justify-between mb-4 overflow-y-auto">
                {displayedReviews.map((review) => (
                    <CourseReview review={review} key={review._id} />
                ))}
            </div>
            {reviews.length > MAX_REVIEWS && (
                <Button
                    type="primary"
                    className="mx-auto! bg-primary-700! hover:-translate-y-0.5"
                    onClick={() =>
                        setIsShowMore((currentState) => !currentState)
                    }
                >
                    {isShowMore ? "Show less" : "Show more"}
                </Button>
            )}
        </CourseDetailWrapper>
    );
}

export default CourseReviews;
