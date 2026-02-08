import { useSearchParams } from "react-router";
import { Pagination } from "antd";

import { ITEMS_PER_PAGE } from "@/utils/constants";
import type { IPagination } from "@/types";

type ItemsPaginationProps = {
    pagination: IPagination;
};

function ItemsPagination({ pagination }: ItemsPaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    function handleChange(value: number) {
        setSearchParams((prev) => {
            prev.set("page", value.toString());
            return prev;
        });
    }

    return (
        <Pagination
            total={pagination.total}
            pageSize={ITEMS_PER_PAGE}
            className="mt-8!"
            hideOnSinglePage={true}
            align="center"
            onChange={handleChange}
            defaultCurrent={Number(searchParams.get("page")) || 1}
            showSizeChanger={false}
        />
    );
}

export default ItemsPagination;
