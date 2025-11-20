import ModalHeader from "./ModalHeader";
import SignupForm from "./SignupForm";
import GoogleBtn from "./GoogleBtn";
import TextWithLink from "../shared/TextWithLink";

type SignupProps = {
    handleClose: () => void;
};

function Signup({ handleClose }: SignupProps) {
    return (
        <>
            <ModalHeader />
            <GoogleBtn />
            <p className="text-center">or you can</p>
            <SignupForm handleClose={handleClose} />
            <TextWithLink
                text="Already have an Account?"
                auth="login"
                buttonLabel="log in"
            />
        </>
    );
}

export default Signup;
