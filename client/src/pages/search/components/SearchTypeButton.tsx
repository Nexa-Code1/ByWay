import { Button } from "antd";
import { useSearchParams } from "react-router";

type SearchType = "courses" | "blogs";

type SearchTypeButtonProps = {
    label: string;
};

function SearchTypeButton({ label }: SearchTypeButtonProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const SearchTypeParam =
        (searchParams.get("type") as SearchType) || "courses";

    const handleSearchTypeChange = (type: SearchType) => {
        setSearchParams((prev) => {
            prev.set("type", type);
            return prev;
        });
    };

    return (
        <Button
            type="primary"
            onClick={() => handleSearchTypeChange(label as SearchType)}
            className={`hover:bg-primary-700! hover:text-white! transition-colors ${SearchTypeParam === label ? "bg-primary-700! text-white!" : "bg-white! text-primary-700!"}`}
        >
            Search {label}
        </Button>
    );
}

export default SearchTypeButton;
