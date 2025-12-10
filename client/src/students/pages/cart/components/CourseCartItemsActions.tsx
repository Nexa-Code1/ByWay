import { Button } from "antd";

import type { ICourseCart } from "@/types";
import { useToggleWishedCourse } from "@/hooks/wishlist/useToggleWishedCourse";
import { useRemoveCartItem } from "@/hooks/cart/useRemoveCartItem";

type CourseCartItemsActionsProps = {
    course: ICourseCart;
};

function CourseCartItemsActions({ course }: CourseCartItemsActionsProps) {
    const { removeCartItem, isRemovingCartItem } = useRemoveCartItem();

    const { toggleWishedCourse, isTogglingWishedCourse } =
        useToggleWishedCourse();

    return (
        <div className="flex items-center gap-2">
            <Button
                type="text"
                className="text-primary-500! w-fit! hover:bg-transparent! p-0!"
                disabled={isTogglingWishedCourse}
                onClick={() =>
                    toggleWishedCourse({
                        courseId: course._id,
                        isFavourite: course.isFavourite,
                    })
                }
            >
                {isTogglingWishedCourse
                    ? "Loading..."
                    : course.isFavourite
                    ? "Remove from wishlist"
                    : "Add to wishlist"}
            </Button>
            <span className="text-gray-500">|</span>
            <Button
                type="text"
                className="text-error-800! w-fit! hover:bg-transparent! p-0!"
                onClick={() => removeCartItem({ courseId: course._id })}
                disabled={isRemovingCartItem}
            >
                {isRemovingCartItem ? "Removing..." : "Remove"}
            </Button>
        </div>
    );
}

export default CourseCartItemsActions;
