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
import PageSpinner from "@/components/shared/PageSpinner";

type PaymentFormProps = {
    cartTotalPrice: number;
    customerId: string;
};

function PaymentForm({ cartTotalPrice, customerId }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();

    const [selectedCardId, setSelectedCardId] = useState<string>("");
    const [isAddingNewCard, setIsAddingNewCard] = useState(true);

    const { buyCourseIntent, isCreatingIntent } = useBuyCourseIntent();

    async function handleSubmitPayment(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!stripe || !elements) return;

        // if user selected saved card
        if (!isAddingNewCard && !selectedCardId) {
            message.error("Please select payment method or add new one.");
        } else if (selectedCardId) {
            const res = await buyCourseIntent({
                coursesIds: [],
                options: {
                    amount: Math.round(cartTotalPrice * 100),
                    currency: "egp",
                    customer: customerId,
                    payment_method: selectedCardId,
                    off_session: true,
                    confirm: true,
                },
            });
            // Purchase courses API
        } else {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
            });
            if (error) {
                return message.error(error.message as string);
            } else {
                // Purchase courses API
            }
        }
    }

    function handleAddNewCard() {
        setIsAddingNewCard((prev) => {
            if (!prev) setSelectedCardId("");
            return !prev;
        });
    }

    if (isCreatingIntent) return <PageSpinner />;

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
                isLoading={false}
                type="primary"
                className="bg-orange-100!"
            >
                Confirm Payment
            </AppSubmitBtn>
        </form>
    );
}

export default PaymentForm;
