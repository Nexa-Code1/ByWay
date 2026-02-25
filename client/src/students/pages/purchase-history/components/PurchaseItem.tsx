import { Button } from "antd";
import { useState } from "react";
import { formatDate } from "date-fns";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    CreditCardOutlined,
    DollarOutlined,
    PlayCircleOutlined,
} from "@ant-design/icons";

import type { Order } from "@/types";
import InfoItem from "./InfoItem";

type PurchaseItemProps = {
    order: Order;
};

function PurchaseItem({ order }: PurchaseItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="overflow-x-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-medium">
                        {formatDate(order.createdAt, "MMMM dd, yyyy")} at{" "}
                        {formatDate(order.createdAt, "hh:mm a")}
                        <span
                            className={`mx-3 px-4 py-0.5 text-sm font-medium bg-gray-100 rounded-full ${order.status === "succeeded" ? "text-green-600" : order.status === "pending" ? "text-orange-100" : "text-orange-600"}`}
                        >
                            {order.status}
                        </span>
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                        <InfoItem
                            icon={
                                <PlayCircleOutlined className="text-secondary-main!" />
                            }
                            children={`${order.course_IDs.length} Course${order.course_IDs.length > 1 ? "s" : ""}`}
                        />
                        <InfoItem
                            icon={
                                <DollarOutlined className="text-orange-500!" />
                            }
                            children={`${order.amount} EGP`}
                        />
                        <InfoItem
                            icon={
                                <CreditCardOutlined className="text-green-700!" />
                            }
                            children={order.payment_method}
                        />
                    </div>
                </div>
                <Button
                    type="primary"
                    className={`${isOpen ? "bg-primary-700! text-gray-100!" : "bg-gray-100! text-gray-800!"} border-0! rounded-none! px-2!`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                </Button>
            </div>
        </div>
    );
}

export default PurchaseItem;
