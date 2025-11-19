import { Button } from "antd";

import googleIcon from "../../assets/images/GoogleIcon.png";

function GoogleBtn() {
    return (
        <Button className="w-full py-4!">
            <img src={googleIcon} alt="Google's icon" className="w-4 h-w-4" />
            <span className="font-semibold text-gray-900">
                Continue with Google
            </span>
        </Button>
    );
}

export default GoogleBtn;
