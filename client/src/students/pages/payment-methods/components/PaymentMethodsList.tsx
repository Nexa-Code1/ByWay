import Stripe from "stripe";

import Spinner from "@/components/shared/Spinner";
import { useGetPaymentMethods } from "@/hooks/payment/useGetPaymentMethods";
import PaymentMethodItem from "./PaymentMethodItem";
import Error from "@/components/shared/Error";
import NoCards from "./NoCards";

function PaymentMethodsList() {
    const { paymentMethods, isLoading, error } = useGetPaymentMethods();

    if (isLoading) return <Spinner className="text-primary-700" />;
    if (!isLoading && (error || !paymentMethods)) return <Error />;

    if (!paymentMethods.paymentMethods.data.length) return <NoCards />;
    return (
        <div className="flex flex-col gap-2">
            {paymentMethods.paymentMethods.data.map(
                (item: Stripe.PaymentMethod) => (
                    <PaymentMethodItem item={item} key={item.id} />
                )
            )}
        </div>
    );
}

export default PaymentMethodsList;
