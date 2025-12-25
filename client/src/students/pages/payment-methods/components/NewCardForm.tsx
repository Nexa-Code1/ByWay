import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import type { Dispatch, FormEvent, SetStateAction } from "react";

import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import { useAddPaymentMethod } from "@/hooks/payment/useAddPaymentMethod";

type NewCardFormProps = {
    onSetIsAddingCard: Dispatch<SetStateAction<boolean>>;
};

function NewCardForm({ onSetIsAddingCard }: NewCardFormProps) {
    const stripe = useStripe();
    const elements = useElements();

    const { addPaymentMethod, isAddingPaymentMethod } = useAddPaymentMethod();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!stripe || !elements) return;

            const { setupIntent, error } = await stripe.confirmSetup({
                elements,
                confirmParams: {},
                redirect: "if_required", // stay on page
            });

            if (error || !setupIntent) {
                console.error(error.message);
            } else if (setupIntent.status === "succeeded") {
                addPaymentMethod({
                    paymentMethodId: setupIntent.payment_method as string,
                });
                onSetIsAddingCard(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <AppSubmitBtn isLoading={isAddingPaymentMethod} className="mt-4">
                Add Card
            </AppSubmitBtn>
        </form>
    );
}

export default NewCardForm;
