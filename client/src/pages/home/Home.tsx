import AllInOneSection from "./components/AllInOneSection";
import Categories from "./components/Categories";
import HeroSections from "./components/HeroSections";
import LatestBlogsSection from "./components/LatestBlogsSection";
import Stats from "./components/Stats";
import TestimonialSection from "./components/TestimonialSection";
import WhatIsSection from "./components/WhatIsSection";

function Home() {
    return (
        <>
            <HeroSections />
            <Stats />
            <AllInOneSection />
            <WhatIsSection />
            <Categories />
            <TestimonialSection />
            <LatestBlogsSection />
        </>
    );
}

export default Home;
