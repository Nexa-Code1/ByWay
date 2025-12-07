import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

function ShareCourse() {
    return (
        <div className="mt-6 border-t border-t-gray-300 pt-4">
            <p className="font-semibold">Share this course</p>
            <div className="flex items-center gap-2 mt-3">
                <EmailShareButton url={window.location.href}>
                    <EmailIcon
                        size={32}
                        round={true}
                        className="hover:-translate-y-0.5 transition-all"
                    />
                </EmailShareButton>
                <FacebookShareButton url={window.location.href}>
                    <FacebookIcon
                        size={32}
                        round={true}
                        className="hover:-translate-y-0.5 transition-all"
                    />
                </FacebookShareButton>
                <LinkedinShareButton url={window.location.href}>
                    <LinkedinIcon
                        size={32}
                        round={true}
                        className="hover:-translate-y-0.5 transition-all"
                    />
                </LinkedinShareButton>
                <TelegramShareButton url={window.location.href}>
                    <TelegramIcon
                        size={32}
                        round={true}
                        className="hover:-translate-y-0.5 transition-all"
                    />
                </TelegramShareButton>
                <TwitterShareButton url={window.location.href}>
                    <TwitterIcon
                        size={32}
                        round={true}
                        className="hover:-translate-y-0.5 transition-all"
                    />
                </TwitterShareButton>
                <WhatsappShareButton url={window.location.href}>
                    <WhatsappIcon
                        size={32}
                        round={true}
                        className="hover:-translate-y-0.5 transition-all"
                    />
                </WhatsappShareButton>
            </div>
        </div>
    );
}

export default ShareCourse;
