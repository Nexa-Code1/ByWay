import SectionContainer from "@/components/shared/SectionContainer";
import { stats } from "@/utils/homePageData";
import StatisticItem from "./StatisticItem";

function Stats() {
    return (
        <SectionContainer className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12 text-center">
            {stats.map((s) => (
                <StatisticItem key={s.label.en} statistic={s} />
            ))}
        </SectionContainer>
    );
}

export default Stats;
