import Stripe from "stripe";
import { DeleteOutlined } from "@ant-design/icons";

import { brandLogoSrc } from "@/utils/helper";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { useRemovePaymentMethod } from "@/hooks/payment/useRemovePaymentMethod";
import Spinner from "@/components/shared/Spinner";

type PaymentMethodItemProps = {
    item: Stripe.PaymentMethod;
};

function PaymentMethodItem({ item }: PaymentMethodItemProps) {
    const { removePaymentMethod, isRemovingPaymentMethod } =
        useRemovePaymentMethod();

    function handleDeletePayment() {
        removePaymentMethod({
            paymentMethodId: item.id,
        });
    }

    return (
        <div className="flex items-center gap-4 border border-gray-300 rounded-lg p-2">
            <div className="w-10">
                <img
                    src={brandLogoSrc(item.card?.brand)}
                    className="w-full object-cover border border-inherit px-1 rounded-sm"
                />
            </div>
            <div className="flex-1">
                <p className="text-sm">******{item.card?.last4}</p>
                <p className="text-sm text-gray-600">
                    Exp. date {item.card?.exp_month.toString().padStart(2, "0")}
                    /{item.card?.exp_year}
                </p>
            </div>
            <ConfirmationModal
                triggerBtnType="text"
                triggerBtnLabel={
                    isRemovingPaymentMethod ? (
                        <Spinner size="small" className="text-orange-100!" />
                    ) : (
                        <DeleteOutlined />
                    )
                }
                triggerBtnStyles="bg-transparent! hover:text-orange-100!"
                onConfirm={handleDeletePayment}
            />
        </div>
    );
}

export default PaymentMethodItem;
