import { Button } from "antd";

import SectionContainer from "@/components/shared/SectionContainer";
import TextDescription from "@/components/shared/TextDescription";

function OnlineCoachingSection() {
    return (
        <SectionContainer className="flex flex-col justify-center gap-2 gradiant-bg rounded-none xl:rounded-2xl shadow-xl p-6 md:p-10 text-gray-100 text-center">
            <h2 className="text-xl font-semibold mb-4">
                Online coaching lessons for remote learning.
            </h2>
            <TextDescription className="text-gray-100 mx-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                eius quasi similique eos ratione temporibus earum laboriosam
                suscipit, dolorem repellendus vitae iure ex nostrum voluptate
                voluptates eveniet quidem praesentium soluta.
            </TextDescription>
            <Button
                type="primary"
                className="max-w-80 mt-4! mx-auto bg-primary-700! hover:scale-105"
            >
                Start learning now
            </Button>
        </SectionContainer>
    );
}

export default OnlineCoachingSection;
