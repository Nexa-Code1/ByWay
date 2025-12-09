import { Pagination } from "antd";

import { COURSES_PER_PAGE } from "@/utils/constants";
import { useSearchParams } from "react-router";

type CoursesPaginationProps = {
    total: number;
};

function CoursesPagination({ total }: CoursesPaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    function handleChange(value: number) {
        setSearchParams((prev) => {
            prev.set("page", value.toString());
            return prev;
        });
    }

    return (
        <Pagination
            total={total}
            pageSize={COURSES_PER_PAGE}
            className="mt-8!"
            hideOnSinglePage={true}
            align="center"
            onChange={handleChange}
            defaultCurrent={Number(searchParams.get("page"))}
        />
    );
}

export default CoursesPagination;
