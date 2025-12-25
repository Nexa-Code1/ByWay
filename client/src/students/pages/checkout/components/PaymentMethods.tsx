import { type Dispatch, type SetStateAction } from "react";
import { Radio, type RadioChangeEvent } from "antd";
import { WarningOutlined } from "@ant-design/icons";

import { useGetPaymentMethods } from "@/hooks/payment/useGetPaymentMethods";
import Spinner from "@/components/shared/Spinner";
import { brandLogoSrc } from "@/utils/helper";
import type Stripe from "stripe";

type PaymentMethodsProps = {
    selectedCardId: string;
    onSelectCard: Dispatch<SetStateAction<string>>;
    isAddingNewCard: boolean;
};

function PaymentMethods({
    selectedCardId,
    onSelectCard,
    isAddingNewCard,
}: PaymentMethodsProps) {
    const { paymentMethods, isLoading, error } = useGetPaymentMethods();

    if (isLoading) return <Spinner className="text-primary-700" />;
    if (!isLoading && (error || !paymentMethods)) return;

    const userPaymentMethods = paymentMethods.paymentMethods.data;

    if (!userPaymentMethods.length)
        return (
            <p className="flex gap-1 items-center justify-center mb-4 text-sm text-error-800">
                <WarningOutlined />
                <span>No available cards please add new card</span>
            </p>
        );

    const options = userPaymentMethods.map((pm: Stripe.PaymentMethod) => ({
        value: pm.id,
        label: (
            <div>
                <div className="flex items-center gap-3">
                    <img
                        src={brandLogoSrc(pm.card?.brand)}
                        alt={pm.card?.brand}
                        className="h-8 w-auto"
                    />
                    <span className="font-semibold flex-1">
                        •••• {pm.card?.last4}
                    </span>
                </div>
                <span className="text-sm truncate text-secondary-500">
                    Exp. date {pm.card?.exp_month.toString().padStart(2, "0")}/
                    {pm.card?.exp_year}
                </span>
            </div>
        ),
    }));

    const onChange = (e: RadioChangeEvent) => {
        onSelectCard(e.target.value);
    };

    return (
        <div className="flex-1">
            <Radio.Group
                onChange={onChange}
                value={selectedCardId}
                className="mb-4!"
                options={options}
                disabled={isAddingNewCard}
            />
        </div>
    );
}

export default PaymentMethods;
