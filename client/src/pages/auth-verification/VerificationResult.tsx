import type { ReactNode } from "react";

type VerificationResultProps = {
    img: string;
    alt: string;
    title: string;
    subTitle: string;
    children: ReactNode;
};

function VerificationResult({
    img,
    alt,
    title,
    subTitle,
    children,
}: VerificationResultProps) {
    return (
        <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
            <div className="w-40 h-40">
                <img
                    src={img}
                    alt={alt}
                    className="w-full h-full object-contain"
                />
            </div>
            <h1 className="font-bold text-lg text-gray-800 mt-4">{title}</h1>
            <p className="text-sm text-gray-800 mb-2">{subTitle}</p>
            {children}
        </div>
    );
}

export default VerificationResult;
