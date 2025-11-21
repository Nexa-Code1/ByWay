import TextWithLink from "../shared/TextWithLink";
import ResetPasswordForm from "./forms/ResetPasswordForm";

function ResetPassword() {
    return (
        <>
            <ResetPasswordForm />
            <TextWithLink text="Go back to" auth="login" buttonLabel="log in" />
        </>
    );
}

export default ResetPassword;
