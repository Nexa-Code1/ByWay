import { Select } from "antd";
import { useSearchParams } from "react-router";

import type { ISortCoursesBy } from "@/types";

const options: { label: string; value: ISortCoursesBy }[] = [
    { label: "Shortest", value: "time-asc" },
    { label: "Longest", value: "time-desc" },
    { label: "Lowest Price", value: "price-asc" },
    { label: "Highest Price", value: "price-desc" },
    { label: "Lowest Rate", value: "rate-asc" },
    { label: "Highest Rate", value: "rate-desc" },
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
            className="col-span-2 lg:col-span-1 w-full!"
        />
    );
}

export default Sort;
