import { Rate } from "antd";

type StarsRateProps = {
    rate: number;
};

function StarsRate({ rate }: StarsRateProps) {
    return (
        <Rate
            allowHalf
            disabled
            defaultValue={rate}
            className="text-warning-500! text-sm!"
        />
    );
}

export default StarsRate;
