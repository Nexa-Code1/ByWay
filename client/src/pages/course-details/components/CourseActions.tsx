import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { Button } from "antd";
import {
    HeartOutlined,
    ClockCircleOutlined,
    HeartFilled,
} from "@ant-design/icons";

import courseImg from "@/assets/images/course-details.jpg";
import type { ICourseDetails } from "@/types";
import { useToggleWishedCourse } from "@/hooks/wishlist/useToggleWishedCourse";
import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import ShareCourse from "./ShareCourse";
import ApplyCoupon from "./ApplyCoupon";

type AddCourseToCartprops = {
    courseDetails: ICourseDetails;
};

function AddCourseToCart({ courseDetails }: AddCourseToCartprops) {
    const navigate = useNavigate();

    const { toggleWishedCourse, isTogglingWishedCourse, contextHolder } =
        useToggleWishedCourse();

    const { addToCart, isAddingToCart } = useAddToCart();

    const { _id, title, discount, price, isFavourite, isInCart } =
        courseDetails;

    const priceAfterDiscount =
        discount || discount !== 0 ? price - price * (discount / 100) : price;

    function handleToggleWishedCourse(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        toggleWishedCourse({
            courseId: _id,
            isFavourite,
        });
    }

    function handleAddCourseToCart(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        addToCart({
            courseId: _id,
        });
    }

    return (
        <>
            {contextHolder}
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
                    <div className="flex items-center gap-2">
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
                    <div className="flex w-full items-center justify-between gap-2 mt-4">
                        {!isInCart ? (
                            <form
                                onSubmit={handleAddCourseToCart}
                                className="flex-1"
                            >
                                <AppSubmitBtn
                                    isLoading={isAddingToCart}
                                    type="primary"
                                    className="h-10! bg-primary-700!"
                                >
                                    Add to cart
                                </AppSubmitBtn>
                            </form>
                        ) : (
                            <Button
                                type="primary"
                                onClick={() => navigate("/cart")}
                                className="flex-1! h-10! hover:-translate-y-0.5 bg-primary-700!"
                            >
                                Go to cart
                            </Button>
                        )}
                        <form onSubmit={handleToggleWishedCourse}>
                            <AppSubmitBtn
                                isLoading={isTogglingWishedCourse}
                                className="w-12! h-10! text-base! bg-transparent!"
                            >
                                {isFavourite ? (
                                    <HeartFilled className="text-error-800!" />
                                ) : (
                                    <HeartOutlined />
                                )}
                            </AppSubmitBtn>
                        </form>
                    </div>

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

export default AddCourseToCart;
