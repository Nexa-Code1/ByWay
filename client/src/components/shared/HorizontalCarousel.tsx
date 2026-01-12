import { Carousel } from "antd";
import type { ReactNode } from "react";

type HorizontalCarouselProps = {
    children: ReactNode;
    className?: string;
};

function HorizontalCarousel({
    children,
    className = "[&_.slick-next]:text-white!",
}: HorizontalCarouselProps) {
    return (
        <Carousel
            dots={false}
            arrows
            infinite={false}
            slidesToShow={4}
            slidesToScroll={1}
            draggable
            responsive={[
                {
                    breakpoint: 1280, // laptops
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 1024, // tablets
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 768, // small tablets
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 480, // mobile
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ]}
            className={`px-6! ${className}`}
        >
            {children}
        </Carousel>
    );
}

export default HorizontalCarousel;
