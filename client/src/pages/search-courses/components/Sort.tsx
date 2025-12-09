import { Select } from "antd";
import { useSearchParams } from "react-router";

import type { ISortCoursesBy } from "@/types";

const options: { label: string; value: ISortCoursesBy }[] = [
    { label: "Time Asc", value: "time-asc" },
    { label: "Time Desc", value: "time-desc" },
    { label: "Price Asc", value: "price-asc" },
    { label: "Price Desc", value: "price-desc" },
];

function Sort() {
    const [searchParams, setSearchParams] = useSearchParams();

    function handleChange(value: ISortCoursesBy) {
        setSearchParams((prev) => {
            prev.set("sort", value);
            return prev;
        });
    }

    return (
        <Select
            placeholder="Sort"
            defaultValue={searchParams.get("sort") as ISortCoursesBy}
            style={{ width: 120 }}
            options={options}
            onChange={handleChange}
        />
    );
}

export default Sort;
