type TextDescriptionProps = {
    children: string;
    className?: string;
};

function TextDescription({
    children,
    className = "text-gray-800",
}: TextDescriptionProps) {
    return (
        <p className={`max-w-4xl leading-6 mb-2! md:mb-6 text-sm ${className}`}>
            {children}
        </p>
    );
}

export default TextDescription;
