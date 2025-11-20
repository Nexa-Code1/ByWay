import ModalHeader from "./ModalHeader";
import SignupForm from "./SignupForm";
import GoogleBtn from "./GoogleBtn";
import TextWithLink from "../shared/TextWithLink";

type SignupProps = {
    handleOk: () => void;
};

function Signup({ handleOk }: SignupProps) {
    return (
        <>
            <ModalHeader />
            <GoogleBtn />
            <p className="text-center">or you can</p>
            <SignupForm handleOk={handleOk} />
            <TextWithLink
                text="Already have an Account?"
                auth="login"
                buttonLabel="log in"
            />
        </>
    );
}

export default Signup;
