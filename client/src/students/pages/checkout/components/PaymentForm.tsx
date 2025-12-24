import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { message } from "antd";
import { useState, type FormEvent } from "react";

import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import PaymentMethods from "./PaymentMethods";

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [selectedCardId, setSelectedCardId] = useState<string>("");

    async function handleSubmitPayment(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            return message.error(error.message as string);
        }

        console.log(paymentIntent);
        // Purchase courses
    }

    return (
        <form onSubmit={handleSubmitPayment}>
            <PaymentMethods
                selectedCardId={selectedCardId}
                onSelectCard={setSelectedCardId}
            />

            <PaymentElement />
            <AppSubmitBtn
                isLoading={false}
                type="primary"
                className="bg-orange-100! mt-6"
            >
                Confirm Payment
            </AppSubmitBtn>
        </form>
    );
}

export default PaymentForm;
