import TextWithLink from "../shared/TextWithLink";
import VerifyOTPForm from "./forms/VerifyOTPForm";

function verifyOTP() {
    return (
        <>
            <VerifyOTPForm />
            <TextWithLink
                text="Go back to"
                auth="send-otp"
                buttonLabel="send code"
            />
        </>
    );
}

export default verifyOTP;
