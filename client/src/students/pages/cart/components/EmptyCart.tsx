import { Button } from "antd";
import { useNavigate } from "react-router";

import emptyCartImg from "@/assets/images/empty-cart.png";

function EmptyCart() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <img src={emptyCartImg} alt="Empty cart" className="w-60" />
            <p>Your cart is empty. Keep shopping to find a course!</p>
            <Button
                type="primary"
                className="bg-orange-100! hover:-translate-y-0.5"
                onClick={() => navigate("/courses")}
            >
                Keep shopping
            </Button>
        </div>
    );
}

export default EmptyCart;
