import { ClockCircleOutlined } from "@ant-design/icons";

import courseImg from "@/assets/images/course-details.jpg";
import type { ICourseDetails } from "@/types";
import ShareCourse from "./ShareCourse";
import ApplyCoupon from "./ApplyCoupon";
import CourseActions from "@/components/shared/CourseActions";

type CoursePurchasePanelprops = {
    courseDetails: ICourseDetails;
};

function CoursePurchasePanel({ courseDetails }: CoursePurchasePanelprops) {
    const { title, discount, price } = courseDetails;

    const priceAfterDiscount =
        discount || discount !== 0 ? price - price * (discount / 100) : price;

    return (
        <>
            <div className="lg:absolute max-w-2xl lg:max-w-96 lg:top-6 lg:right-6 z-10 lg:bg-white lg:text-gray-900 lg:shadow-xl overlfow-hidden lg:rounded-lg mt-4 lg:mt-0">
                {/* Course preview */}
                <div className="w-full h-52 shadow-lg">
                    <img
                        src={courseImg}
                        alt={title}
                        className="w-full h-full object-cover object-bottom-left"
                    />
                </div>

                <div className="px-4 py-8">
                    {/* Course price + discount if exist */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-2xl">
                            {priceAfterDiscount.toFixed(2)} L.E
                        </span>
                        {discount !== 0 && (
                            <>
                                <span className="line-through text-gray-600">
                                    {price.toFixed(2)} L.E
                                </span>
                                <span>{discount}% off</span>
                            </>
                        )}
                    </div>

                    {/* Discount end time */}
                    {discount !== 0 && (
                        <p className="flex items-center gap-2 text-error-800 text-sm my-2">
                            <ClockCircleOutlined />
                            <span>22 hours left at this price!</span>
                        </p>
                    )}

                    {/* Add to cart button OR Go to cart link */}
                    <CourseActions
                        courseDetails={courseDetails}
                        btnColorClass="bg-primary-700!"
                    />

                    {/* Coupon input */}
                    <ApplyCoupon />

                    <div className="text-sm text-center mt-4 text-gray-600 flex flex-col items-center gap-2">
                        <p>30-Day Money-Back Guarantee</p>
                        <p>Full Lifetime Access</p>
                    </div>

                    {/* Share */}
                    <ShareCourse />
                </div>
            </div>
        </>
    );
}

export default CoursePurchasePanel;
