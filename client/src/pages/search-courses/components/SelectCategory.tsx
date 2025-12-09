import { useSearchParams } from "react-router";
import { Select } from "antd";

import { useGetAllCategories } from "@/hooks/categories/useGetAllCategories";
import type { ICategory } from "@/types";

function SelectCategory() {
    const lang = "en";

    const [searchParams, setSearchParams] = useSearchParams();

    const {
        categories,
        isLoading: isLoadingCategories,
        error: categoriesError,
    } = useGetAllCategories();

    if (isLoadingCategories) return;
    if (!isLoadingCategories && categoriesError) return;

    const categoriesOptions = [
        { label: "All", value: "" },
        ...categories.categories.map((category: ICategory) => ({
            label: category.name[lang],
            value: category.slug,
        })),
    ];

    function handleChange(value: string) {
        setSearchParams((prev) => {
            prev.set("category", value);
            return prev;
        });
    }

    return (
        <Select
            placeholder="Category"
            defaultValue={searchParams.get("category")}
            style={{ width: 120 }}
            options={categoriesOptions}
            onChange={handleChange}
        />
    );
}

export default SelectCategory;
