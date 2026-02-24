import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { Button, message } from "antd";
import { useState, type FormEvent } from "react";

import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import PaymentMethods from "./PaymentMethods";
import { useBuyCourseIntent } from "@/hooks/payment/useBuyCourseIntent";
import { useCreateOrder } from "@/hooks/orders/useCreateOrder";

type PaymentFormProps = {
    cartTotalPrice: number;
    customerId: string;
    coursesIds: string[];
    studentId: string;
};

function PaymentForm({
    cartTotalPrice,
    customerId,
    coursesIds,
    studentId,
}: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();

    const [selectedCardId, setSelectedCardId] = useState<string>("");
    const [isAddingNewCard, setIsAddingNewCard] = useState(false);

    const { createOrder, isCreatingOrder } = useCreateOrder();
    const { buyCourseIntent, isCreatingIntent } = useBuyCourseIntent();

    async function handleSubmitPayment(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!stripe || !elements) return;

        // Order Data
        const orderData = {
            student_ID: studentId,
            course_IDs: coursesIds,
        };

        // if user selected saved card
        if (!isAddingNewCard && !selectedCardId) {
            message.error("Please select payment method or add new one.");
        } else if (selectedCardId) {
            const res = await buyCourseIntent({
                coursesIds,
                options: {
                    amount: Math.round(cartTotalPrice * 100),
                    currency: "egp",
                    customer: customerId,
                    payment_method: selectedCardId,
                    off_session: true,
                    confirm: true,
                },
            });
            // Create Order API
            await createOrder({
                orderData: {
                    ...orderData,
                    payment_intent_id: res.paymentIntent.id,
                    amount: res.paymentIntent.amount / 100,
                    status: res.paymentIntent.status,
                },
            });
        } else {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
            });
            if (error) {
                return message.error(error.message as string);
            } else {
                // Create Order API
                await createOrder({
                    orderData: {
                        ...orderData,
                        payment_intent_id: paymentIntent.id,
                        amount: paymentIntent.amount / 100,
                        status: paymentIntent.status,
                    },
                });
            }
        }
    }

    function handleAddNewCard() {
        setIsAddingNewCard((prev) => {
            if (!prev) setSelectedCardId("");
            return !prev;
        });
    }

    return (
        <form onSubmit={handleSubmitPayment}>
            <PaymentMethods
                selectedCardId={selectedCardId}
                onSelectCard={setSelectedCardId}
                isAddingNewCard={isAddingNewCard}
            />

            <Button
                className="w-full border-dashed border-primary-100 text-primary-100 cursor-pointer hover:text-primary-100 mb-4"
                onClick={handleAddNewCard}
            >
                {isAddingNewCard ? "Cancel" : "+ Add new card"}
            </Button>

            {isAddingNewCard && <PaymentElement className="mb-4!" />}
            <AppSubmitBtn
                isLoading={isCreatingOrder || isCreatingIntent}
                type="primary"
                className="bg-orange-100!"
            >
                Confirm Payment
            </AppSubmitBtn>
        </form>
    );
}

export default PaymentForm;
