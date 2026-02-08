import { Slider } from "antd";
import { useSearchParams } from "react-router";

function PriceSlider() {
    const [searchParams, setSearchParams] = useSearchParams();

    const priceRange = searchParams.get("price");
    const [min, max] = priceRange?.split("-") || [0, 1000];

    function handleChange(value: number[]) {
        setSearchParams((prev) => {
            prev.set("price", value.join("-"));
            return prev;
        });
    }

    return (
        <div className="col-start-1 lg:col-start-3 -col-end-1 flex items-center gap-2 bg-white rounded-sm h-8 p-2">
            <p className="text-sm text-[#bfbfbf]">Price Range:</p>
            <Slider
                range
                defaultValue={[+min, +max]}
                className="flex-1! [&_.ant-slider-rail]:bg-gray-300! [&_.ant-slider-track]:bg-primary-700! min-w-40!"
                onChangeComplete={handleChange}
                min={100}
                max={5000}
            />
        </div>
    );
}

export default PriceSlider;
