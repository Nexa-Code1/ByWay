import { useState } from "react";

import placeholderView from "@/assets/images/placeholder_view.svg";

type ListItemImgProps = {
    image: string;
    alt: string;
};

function ListItemImg({ image, alt }: ListItemImgProps) {
    const [prevImg, setPrevImg] = useState(image || placeholderView);

    return (
        <div className="w-50 h-30 rounded-lg overflow-hidden">
            <img
                src={prevImg}
                alt={alt}
                onError={() => setPrevImg(placeholderView)}
                className="w-full h-full object-cover object-center"
            />
        </div>
    );
}

export default ListItemImg;
