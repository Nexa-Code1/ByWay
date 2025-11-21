import TextWithLink from "../shared/TextWithLink";
import SendOTPForm from "./forms/SendOTPForm";

function SendOTP() {
    return (
        <>
            <SendOTPForm />
            <TextWithLink text="Go back to" auth="login" buttonLabel="log in" />
        </>
    );
}

export default SendOTP;
