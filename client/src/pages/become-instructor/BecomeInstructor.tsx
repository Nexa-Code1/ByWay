import HeaderNav from "./components/HeaderNav";
import HeroSection from "./components/HeroSection";
import HowBecomeInstructor from "./components/HowBecomeInstructor";
import OurInstructors from "./components/OurInstructors";
import Rules from "./components/Rules";
import Stats from "./components/Stats";
import WhyTeaching from "./components/WhyTeaching";

function BecomeInstructor() {
    return (
        <>
            <HeaderNav />
            <HeroSection />
            <Stats />
            <WhyTeaching />
            <HowBecomeInstructor />
            <Rules />
            <OurInstructors />
        </>
    );
}

export default BecomeInstructor;
