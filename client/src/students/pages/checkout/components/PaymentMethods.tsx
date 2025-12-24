import { useState, type Dispatch, type SetStateAction } from "react";
import { Button, Radio, type RadioChangeEvent } from "antd";

import { useGetPaymentMethods } from "@/hooks/payment/useGetPaymentMethods";
import Spinner from "@/components/shared/Spinner";
import type { CardBrand } from "@/types";
import visaImg from "@/assets/images/visa.png";
import mastercardImg from "@/assets/images/mastercard.png";

const brandLogoSrc = (brand: CardBrand) => {
    switch (brand) {
        case "visa":
            return visaImg;
        case "mastercard":
            return mastercardImg;
    }
};

type PaymentMethodsProps = {
    selectedCardId: string;
    onSelectCard: Dispatch<SetStateAction<string>>;
};

function PaymentMethods({ selectedCardId, onSelectCard }: PaymentMethodsProps) {
    const [isAddingNewCard, setIsAddingNewCard] = useState(false);
    const { paymentMethods, isLoading, error } = useGetPaymentMethods();

    if (isLoading) return <Spinner className="text-primary-700" />;
    if (!isLoading && (error || !paymentMethods)) return;

    const userPaymentMethods = paymentMethods.paymentMethods.data;

    if (!userPaymentMethods.length) return;

    const options = userPaymentMethods.map((pm) => ({
        value: pm.id,
        label: (
            <div>
                <img
                    src={brandLogoSrc(pm.card?.brand)}
                    alt={pm.brand}
                    className="h-8 w-auto"
                />
                <span className="text-sm truncate text-secondary-500">
                    Exp. date {pm.card?.exp_month.toString().padStart(2, "0")}/
                    {pm.card?.exp_year}
                </span>
                <span className="font-semibold flex-1">
                    •••• {pm.card?.last4}
                </span>
            </div>
        ),
    }));

    const onChange = (e: RadioChangeEvent) => {
        onSelectCard(e.target.value);
    };

    function handleAddNewCard() {
        setIsAddingNewCard((prev) => {
            if (!prev) onSelectCard("");
            return !prev;
        });
    }

    return (
        <div className="flex-1">
            {isAddingNewCard && (
                <Radio.Group
                    onChange={onChange}
                    value={selectedCardId}
                    className="mb-4!"
                    options={options}
                />
            )}
            <Button
                className="w-full border-dashed border-primary-100 text-primary-100 cursor-pointer hover:text-primary-100 mb-4"
                onClick={handleAddNewCard}
            >
                {isAddingNewCard ? "Cancel" : "+ Add new card"}
            </Button>
        </div>
    );
}

export default PaymentMethods;
