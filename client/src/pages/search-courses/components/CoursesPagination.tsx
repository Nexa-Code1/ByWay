import { useSearchParams } from "react-router";
import { Pagination } from "antd";

import { COURSES_PER_PAGE } from "@/utils/constants";
import type { IPagination } from "@/types";

type CoursesPaginationProps = {
    pagination: IPagination;
};

function CoursesPagination({ pagination }: CoursesPaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    function handleChange(value: number) {
        setSearchParams((prev) => {
            prev.set("page", value.toString());
            return prev;
        });
    }

    return (
        <Pagination
            total={pagination.totalCourses}
            pageSize={COURSES_PER_PAGE}
            className="mt-8!"
            hideOnSinglePage={true}
            align="center"
            onChange={handleChange}
            defaultCurrent={Number(searchParams.get("page")) || 1}
        />
    );
}

export default CoursesPagination;
