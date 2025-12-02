import SectionContainer from "@/components/shared/SectionContainer";
import TextDescription from "@/components/shared/TextDescription";
import { allInOne } from "@/utils/homePageData";
import AllInOneCard from "./AllInOneCard";

function AllInOneSection() {
    return (
        <SectionContainer className="flex flex-col items-center justify-center text-center">
            <h2 className="font-bold text-2xl text-gray-800 mb-6">
                All-In-One{" "}
                <span className="text-orange-100">Cloud Software.</span>
            </h2>
            <TextDescription>
                Byway is one powerful online software suite that combines all
                the tools needed to run a successful school or office.
            </TextDescription>
            <ul className="flex flex-wrap justify-center gap-8 mt-8">
                {allInOne.map((ele) => (
                    <AllInOneCard key={ele.title.en} ele={ele} />
                ))}
            </ul>
        </SectionContainer>
    );
}

export default AllInOneSection;
