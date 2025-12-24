import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useBuyCourseIntent } from "@/hooks/payment/useBuyCourseIntent";
import SectionContainer from "@/components/shared/SectionContainer";
import PageSpinner from "@/components/shared/PageSpinner";
import { useGetMyCart } from "@/hooks/cart/useGetMyCart";
import Error from "@/components/shared/Error";
import type { ICourseCartRes } from "@/types";
import CourseSummaryCard from "./components/CourseSummaryCard";
import PaymentForm from "./components/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
    const [clientSecret, setClientSecret] = useState("");

    const { buyCourseIntent, isCreatingIntent } = useBuyCourseIntent();
    const { myCart, isLoading: isLoadingCart, error } = useGetMyCart();

    useEffect(() => {
        (async () => {
            if (isLoadingCart) return;
            if (!isLoadingCart && (error || !myCart)) return <Error />;

            const coursesIds = myCart.cart.courses.map(
                (course: ICourseCartRes) => course.course._id
            );

            const res = await buyCourseIntent({
                coursesIds,
                options: {
                    amount: Math.round(myCart?.totalCartPrice * 100),
                    currency: "egp",
                    automatic_payment_methods: {
                        enabled: true,
                    },
                },
            });

            setClientSecret(res.paymentIntent.client_secret);
        })();
    }, [isLoadingCart, error, myCart]);

    if (!clientSecret) return;
    if (isCreatingIntent || isLoadingCart) return <PageSpinner />;

    return (
        <SectionContainer className="mt-4! grid grid-cols-3 gap-10">
            <div className="col-span-2 shadow-lg p-6 rounded-2xl">
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm />
                </Elements>
            </div>

            <div className="col-span-1 flex flex-col gap-4">
                <h2 className="mb-3">Summary</h2>
                {myCart.cart.courses.map((course: ICourseCartRes) => (
                    <CourseSummaryCard
                        key={course._id}
                        course={course.course}
                    />
                ))}
                <div className="flex items-center gap-4 justify-between font-semibold border-t border-t-gray-300 pt-2">
                    <p>Total</p>
                    <p>{myCart.totalCartPrice} EGP</p>
                </div>
            </div>
        </SectionContainer>
    );
}

export default Checkout;
