type NoContentProps = {
    imgSrc: string;
    title: string;
    subTitle: string;
};

function NoContent({ imgSrc, title, subTitle }: NoContentProps) {
    return (
        <div className="flex flex-col items-center gap-2 mt-10 text-gray-600">
            <img src={imgSrc} alt={title} className="max-w-50" />
            <h2 className="font-semibold text-xl mt-4">{title}</h2>
            <p>{subTitle}</p>
        </div>
    );
}

export default NoContent;
