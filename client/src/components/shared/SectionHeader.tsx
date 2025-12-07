type SectionHeaderProps = {
    title: string;
};

function SectionHeader({ title }: SectionHeaderProps) {
    return (
        <h2 className="font-bold text-xl mb-6 text-gray-800 text-center sm:text-start">
            {title}
        </h2>
    );
}

export default SectionHeader;
