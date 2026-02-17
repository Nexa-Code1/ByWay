import HeroSection from "./components/HeroSection";
import BlogList from "./components/BlogList";
import SectionContainer from "@/components/shared/SectionContainer";
import LanguageLearningBlogs from "./components/LanguageLearningBlogs";
import MostReadBlogs from "./components/MostReadBlogs";

function Blogs() {
    return (
        <>
            <HeroSection />
            <BlogList />
            <SectionContainer className="my-0!">
                <LanguageLearningBlogs />
                <MostReadBlogs />
            </SectionContainer>
        </>
    );
}

export default Blogs;
