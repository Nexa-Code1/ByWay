import { useState } from "react";
import { CreditCardFilled } from "@ant-design/icons";
import { Button } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import TextDescription from "@/components/shared/TextDescription";
import { useCreateSetupIntent } from "@/hooks/payment/useCreateSetupIntent";
import Spinner from "@/components/shared/Spinner";
import NewCardForm from "./components/NewCardForm";
import PaymentMethodsList from "./components/PaymentMethodsList";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PaymentMethods() {
    const { createSetupIntent, isCreatingSetupIntent } = useCreateSetupIntent();

    const [clientSecret, setClientSecret] = useState("");
    const [isAddingCard, setIsAddingCard] = useState(false);

    async function handleAddNewCard() {
        setIsAddingCard((prev) => !prev);
        const res = await createSetupIntent();
        setClientSecret(res.clientSecret);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-6">
            <div>
                <div className="flex items-center gap-2">
                    <CreditCardFilled className="text-gray-600!" />
                    <h1 className="font-semibold text-xl">Credit Cards(s)</h1>
                </div>
                <TextDescription>
                    Manage your credit cards and payment options
                </TextDescription>
                <Button
                    type="primary"
                    className="bg-orange-100! mt-3! mb-4"
                    onClick={handleAddNewCard}
                >
                    {isAddingCard ? "Cancel" : "Add New Card"}
                </Button>

                {isCreatingSetupIntent ? (
                    <Spinner className="text-primary-700! mt-8!" />
                ) : (
                    clientSecret && (
                        <Elements
                            stripe={stripePromise}
                            options={{ clientSecret }}
                        >
                            {isAddingCard && (
                                <NewCardForm
                                    onSetIsAddingCard={setIsAddingCard}
                                />
                            )}
                        </Elements>
                    )
                )}
            </div>
            <PaymentMethodsList />
        </div>
    );
}

export default PaymentMethods;
