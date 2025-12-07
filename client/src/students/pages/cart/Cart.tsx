import { Button } from "antd";

import NavBreadCrumb from "@/components/shared/NavBreadCrumb";
import PageSpinner from "@/components/shared/PageSpinner";
import SectionContainer from "@/components/shared/SectionContainer";
import { useGetMyCart } from "@/hooks/cart/useGetMyCart";
import CourseCartItem from "./components/CourseCartItem";
import type { ICourseCart } from "@/types";
import EmptyCart from "./components/EmptyCart";
import Error from "@/components/shared/Error";
import { useClearCart } from "@/hooks/cart/useClearCart";
import ConfirmationModal from "@/components/shared/ConfirmationModal";

function Cart() {
    const { myCart, isLoading, error } = useGetMyCart();
    const { clearCart, isClearingCart } = useClearCart();

    if (isLoading) return <PageSpinner />;
    if (!isLoading && error) return <Error />;

    const { totalCartPrice, cart } = myCart;

    return (
        <SectionContainer className="mt-4!">
            {/* Cart heading */}
            <div className="flex items-end gap-8">
                <h1 className="font-semibold text-xl md:text-2xl">
                    Shopping Cart
                </h1>
                <NavBreadCrumb
                    items={[
                        {
                            title: "Courses",
                            path: "/courses",
                        },
                        {
                            title: "Shopping Cart",
                        },
                    ]}
                />
            </div>

            {/* Cart content */}
            {!isLoading && !cart.courses?.length ? (
                <EmptyCart />
            ) : (
                <>
                    <div className="flex gap-4 md:gap-12">
                        <div className="flex-1">
                            <div className="flex items-end justify-between">
                                <p className="text-sm text-gray-600 mt-8">
                                    {cart.courses.length} Course in cart
                                </p>
                                <ConfirmationModal
                                    triggerBtnType="text"
                                    triggerBtnStyles="p-0! hover:bg-transparent! hover:text-error-800!"
                                    triggerBtnLabel={
                                        isClearingCart
                                            ? "Clearing..."
                                            : "Clear all cart"
                                    }
                                    onConfirm={clearCart}
                                />
                            </div>
                            <ul className="border-t border-gray-300 pt-4">
                                {cart.courses.map(
                                    ({ course }: { course: ICourseCart }) => (
                                        <CourseCartItem
                                            key={course._id}
                                            course={course}
                                        />
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="w-64 max-w-full flex flex-col gap-2">
                            <p className="text-gray-600 font-medium">Total:</p>
                            <p className="font-semibold text-2xl">
                                {totalCartPrice.toFixed(2)} EGP
                            </p>
                            <Button
                                type="primary"
                                className="bg-orange-100! h-10! hover:-translate-y-0.5 shadow-md!"
                            >
                                Proceed to checkout
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </SectionContainer>
    );
}

export default Cart;
