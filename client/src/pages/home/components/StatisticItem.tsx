import type { IStatisticItem } from "../../../types";

type StatisticItemProps = {
    statistic: IStatisticItem;
};

function StatisticItem({ statistic }: StatisticItemProps) {
    const lang = "en";

    return (
        <div>
            <p className="text-gray-800 text-3xl md:text-4xl lg:text-5xl font-medium">
                {statistic.statistic}
            </p>
            <p className="capitalize text-sm md:text-base">
                {statistic.label[lang]}
            </p>
        </div>
    );
}

export default StatisticItem;
