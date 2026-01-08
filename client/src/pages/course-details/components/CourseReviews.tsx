import { StarFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

import CourseDetailWrapper from "./CourseDetailWrapper";
import CourseReview from "./CourseReview";
import { MAX_REVIEWS } from "@/utils/constants";
import type { IReview } from "@/types";

type CourseReviewsProps = {
    rate: number;
    reviews: IReview[];
};

function CourseReviews({ rate, reviews }: CourseReviewsProps) {
    const [isShowMore, setIsShowMore] = useState(false);
    const displayedReviews = isShowMore
        ? reviews
        : reviews.slice(0, MAX_REVIEWS);

    return (
        <CourseDetailWrapper title="Reviews">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <StarFilled className="text-warning-500!" />
                <span>
                    {rate} course rating - {reviews.length} ratings
                </span>
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
