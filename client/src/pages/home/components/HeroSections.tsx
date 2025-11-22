import heroImg from "../../../assets/images/hero-img.png";
import SectionContainer from "../../../components/shared/SectionContainer";
import TextDescription from "../../../components/shared/TextDescription";

function HeroSections() {
    return (
        <div className="rounded-edge-bg bg-gray-900 text-gray-100 flex items-center shadow-2xl">
            <SectionContainer className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 my-0!">
                <div className="max-w-lg text-center lg:text-start ">
                    <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4 leading-12">
                        <span className="text-orange-100">Studying</span> Online
                        is now much easier
                    </h1>
                    <TextDescription className="text-gray-100">
                        Byway is an interesting platform that will teach you in
                        more an interactive way
                    </TextDescription>
                </div>
                <div className="max-w-lg">
                    <img
                        src={heroImg}
                        alt="Girl carrying books"
                        className="w-full h-full object-contain"
                    />
                </div>
            </SectionContainer>
        </div>
    );
}

export default HeroSections;
