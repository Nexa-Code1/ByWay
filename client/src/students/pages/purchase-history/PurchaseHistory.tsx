import { useSearchParams } from "react-router";
import { Collapse } from "antd";

import NoContent from "@/components/shared/NoContent";
import emptyFolderImg from "@/assets/images/empty-folder.png";
import { useStudentOrders } from "@/hooks/orders/useStudentOrders";
import Spinner from "@/components/shared/Spinner";
import Error from "@/components/shared/Error";
import OutletHeader from "@/components/shared/OutletHeader";
import type { Order } from "@/types";
import PurchaseItem from "./components/PurchaseItem";
import ItemsPagination from "@/components/shared/ItemsPagination";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import CoursesList from "./components/CoursesList";

function PurchaseHistory() {
    const [searchParams] = useSearchParams();

    const { orders, pagination, isLoadingOrders, error } = useStudentOrders({
        page: Number(searchParams.get("page")) || 1,
        limit: ITEMS_PER_PAGE,
    });

    if (isLoadingOrders)
        return <Spinner size="large" className="text-primary-700! mt-30!" />;
    if (!isLoadingOrders && (error || !orders)) return <Error />;
    if (orders.length === 0)
        return (
            <NoContent
                imgSrc={emptyFolderImg}
                title="No Purchase History"
                subTitle="Start Purchasing courses"
            />
        );

    const items = orders.map((order: Order) => ({
        key: order._id,
        label: <PurchaseItem order={order} />,
        children: <CoursesList courses={order.course_IDs} />,
    }));

    return (
        <div>
            <OutletHeader>Purchase History ({orders.length})</OutletHeader>
            <div className="space-y-4">
                <Collapse
                    items={items}
                    expandIcon={() => null}
                    className="rounded-none! bg-white!"
                />
            </div>
            <ItemsPagination pagination={pagination} />
        </div>
    );
}

export default PurchaseHistory;
