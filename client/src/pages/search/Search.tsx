import { useSearchParams } from "react-router";

import searchCoursesImg from "@/assets/images/search-courses.jpg";
import CoursesDisplay from "./components/CoursesDisplay";
import BlogsDisplay from "./components/BlogsDisplay";
import SearchForm from "@/pages/search/components/SearchForm";
import SelectCategory from "./components/SelectCategory";
import Sort from "./components/Sort";
import PriceSlider from "./components/PriceSlider";
import SearchTypeButton from "./components/SearchTypeButton";

type SearchType = "courses" | "blogs";

function Search() {
    const [searchParams] = useSearchParams();

    const SearchTypeParam =
        (searchParams.get("type") as SearchType) || "courses";

    return (
        <>
            <div className="relative w-full h-56">
                <img
                    src={searchCoursesImg}
                    alt="Search"
                    className="w-full h-full object-cover object-center"
                />
                <div className="w-[90%] max-w-xl absolute top-1/2 left-1/2 -translate-1/2 grid grid-cols-4 gap-2">
                    {/* Search Type Selector */}
                    <div className="col-span-4 flex items-center gap-2">
                        <SearchTypeButton label="courses" />
                        <SearchTypeButton label="blogs" />
                    </div>

                    {SearchTypeParam === "blogs" ? (
                        <div className="col-span-4 grid grid-cols-4 gap-2 items-center">
                            <SearchForm
                                placeholder="Search your favourite blog"
                                className="col-span-4"
                            />
                            <SelectCategory />
                        </div>
                    ) : (
                        <div className="col-span-4 grid grid-cols-4 gap-2">
                            <SearchForm placeholder="Search your favourite course" />
                            <SelectCategory />
                            <Sort />
                            <PriceSlider />
                        </div>
                    )}
                </div>
            </div>
            {/* Display appropriate component based on search type */}
            {SearchTypeParam === "courses" ? (
                <CoursesDisplay />
            ) : (
                <BlogsDisplay />
            )}
        </>
    );
}

export default Search;
