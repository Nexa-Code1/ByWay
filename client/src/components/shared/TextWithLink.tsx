import { useSearchParams } from "react-router";
import { Button } from "antd";
import type { AuthType } from "../../types";

type TextWithLinkProps = {
    text: string;
    auth: AuthType;
    buttonLabel: string;
};

function TextWithLink({ text, auth, buttonLabel }: TextWithLinkProps) {
    const [, setSearchParams] = useSearchParams();

    return (
        <div className="text-center text-xs">
            <span className="text-gray-400 capitalize">{text}</span>
            <Button
                type="text"
                className="text-gray-900! font-semibold! p-0! hover:bg-transparent! hover:text-primary-600! mx-1 capitalize"
                onClick={() => setSearchParams({ auth })}
            >
                {buttonLabel}
            </Button>
        </div>
    );
}

export default TextWithLink;
