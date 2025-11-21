import GoogleBtn from "./GoogleBtn";
import TextWithLink from "../shared/TextWithLink";
import LoginForm from "./forms/LoginForm";

type LoginProps = {
    handleClose: () => void;
};

function Login({ handleClose }: LoginProps) {
    return (
        <>
            <LoginForm handleClose={handleClose} />
            <p className="text-center">or you can</p>
            <GoogleBtn />
            <TextWithLink
                text="need an account?"
                auth="signup"
                buttonLabel="sign up"
            />
        </>
    );
}

export default Login;
