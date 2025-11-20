import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { Modal } from "antd";

import loginImg from "../../assets/images/login-img.jpg";
import defaultAuthImg from "../../assets/images/default-auth-img.jpg";
import Login from "./Login";
import Signup from "./Signup";
import ForgetPassword from "./ForgetPassword";

type AuthContainerProps = {
    children: ReactNode;
    isModalOpen: boolean;
    onModalOpen: Dispatch<SetStateAction<boolean>>;
};

function AuthContainer({
    children,
    isModalOpen,
    onModalOpen,
}: AuthContainerProps) {
    const [searchParams] = useSearchParams();
    const auth = searchParams.get("auth");
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleClose = () => {
        onModalOpen(false);
        searchParams.delete("auth");
        navigate(`${pathname}?${searchParams.toString()}`, { replace: true });
    };

    return (
        <>
            {children}
            <Modal
                centered
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onCancel={handleClose}
                footer={null}
                styles={{
                    body: {
                        display: "flex",
                        gap: "8px",
                        padding: 0,
                        overflow: "hidden",
                        height: "520px",
                    },
                    content: {
                        padding: 0,
                        width: "90vw",
                        maxWidth: "640px",
                        left: "50%",
                        transform: "translateX(-50%)",
                    },
                }}
            >
                <div className="w-1/2 h-full hidden sm:block">
                    <img
                        src={auth === "login" ? loginImg : defaultAuthImg}
                        alt={
                            auth === "login"
                                ? "Colorful background"
                                : "Manage authentication"
                        }
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                <div className="w-full sm:w-1/2 h-full p-4 flex flex-col gap-4 overflow-y-auto">
                    {auth === "login" && <Login handleClose={handleClose} />}
                    {auth === "signup" && <Signup handleClose={handleClose} />}
                    {auth === "forget-password" && <ForgetPassword />}
                </div>
            </Modal>
        </>
    );
}

export default AuthContainer;
