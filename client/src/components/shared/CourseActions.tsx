import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { Button } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import { useToggleWishedCourse } from "@/hooks/wishlist/useToggleWishedCourse";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import type { ICourseDetails, IWishlistItem } from "@/types";

type CourseActionsProps = {
    courseDetails: ICourseDetails | IWishlistItem;
    btnColorClass: string;
};

function CourseActions({ courseDetails, btnColorClass }: CourseActionsProps) {
    const { _id, isFavourite, isInCart } = courseDetails;

    const navigate = useNavigate();

    const { toggleWishedCourse, isTogglingWishedCourse } =
        useToggleWishedCourse();
    const { addToCart, isAddingToCart } = useAddToCart();

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
            <div className="flex w-full items-center justify-between gap-2">
                {!isInCart ? (
                    <form onSubmit={handleAddCourseToCart} className="flex-1">
                        <AppSubmitBtn
                            isLoading={isAddingToCart}
                            type="primary"
                            className={`h-10! ${btnColorClass}`}
                        >
                            Add to cart
                        </AppSubmitBtn>
                    </form>
                ) : (
                    <Button
                        type="primary"
                        onClick={() => navigate("/cart")}
                        className={`flex-1! h-10! hover:-translate-y-0.5 ${btnColorClass}`}
                    >
                        Go to cart
                    </Button>
                )}
                <form onSubmit={handleToggleWishedCourse}>
                    <AppSubmitBtn
                        isLoading={isTogglingWishedCourse}
                        className="w-12! h-10! text-base! bg-transparent! text-gray-600!"
                    >
                        {isFavourite ? (
                            <HeartFilled className="text-error-800!" />
                        ) : (
                            <HeartOutlined />
                        )}
                    </AppSubmitBtn>
                </form>
            </div>
    );
}

export default CourseActions;
