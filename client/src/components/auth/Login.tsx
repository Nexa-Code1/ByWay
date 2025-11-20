import ModalHeader from "./ModalHeader";
import GoogleBtn from "./GoogleBtn";
import TextWithLink from "../shared/TextWithLink";
import LoginForm from "./LoginForm";

function Login() {
    return (
        <>
            <ModalHeader />
            <LoginForm />
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
