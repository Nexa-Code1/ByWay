import SectionContainer from "@/components/shared/SectionContainer";
import { faq } from "@/utils/faq";
import { Collapse, type CollapseProps } from "antd";

const items: CollapseProps["items"] = faq.map((el) => ({
    key: el.question,
    label: el.question,
    children: <p className="font-medium">{el.answer}</p>,
}));

function FAQ() {
    return (
        <SectionContainer className="mt-4!">
            <h1 className="font-semibold text-xl mb-8 text-center">
                Frequently asked questions
            </h1>
            <Collapse items={items} />
        </SectionContainer>
    );
}

export default FAQ;
