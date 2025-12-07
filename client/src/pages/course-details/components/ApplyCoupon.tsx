import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import { Button } from "antd";
import Input from "antd/es/input/Input";
import { useState, type FormEvent } from "react";

function ApplyCoupon() {
    const [isAddingCoupon, setIsAddingCoupon] = useState(false);

    const coupon = "COUPON12";

    function handleApplyCoupon(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsAddingCoupon(false);
    }

    return (
        <>
            {isAddingCoupon ? (
                <form
                    className="flex w-full items-center justify-between mt-4 gap-2"
                    onSubmit={handleApplyCoupon}
                >
                    <Input placeholder="Enter coupon" className="h-10!" />
                    <AppSubmitBtn
                        isLoading={false}
                        type="primary"
                        className="max-w-20! bg-primary-700! h-10!"
                    >
                        Apply
                    </AppSubmitBtn>
                </form>
            ) : (
                <div className="flex w-full items-center justify-between mt-4 gap-2">
                    <p className="flex-1 h-10! border border-dashed border-gray-500 flex items-center gap-1 p-2 rounded-sm text-gray-500">
                        <span>{coupon}</span>
                        <span className="text-xs">is applied</span>
                    </p>
                    <Button
                        type="text"
                        className="max-w-20! h-10! underline text-primary-700! font-semibold! hover:bg-transparent! hover:-translate-y-0.5"
                        onClick={() => setIsAddingCoupon(true)}
                    >
                        Change
                    </Button>
                </div>
            )}
        </>
    );
}

export default ApplyCoupon;
