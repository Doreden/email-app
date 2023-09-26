import { Link, useNavigate } from "react-router-dom";
import { emailService } from "../../services/email.service";

export function EmailCompose() {
    const navigate = useNavigate();

    async function formSubmit(e) {
        navigate("/emails");
        const newMessage = {
            subject: e.target[1].value,
            body: e.target[2].value,
            isRead: false,
            isStarred: false,
            sentAt: Date.now(),
            removedAt: null,
            from: e.target[0].value,
            to: "user@appsus.com",
        };
        try {
            await emailService.save(newMessage);
        } catch (err) {
            console.log("Error", err);
        }
    }

    return (
        <form className="compose-main-container" onSubmit={(e) => formSubmit(e)}>
            <div className="new-message">
                <p className="new-message-title">New Message</p>

                <Link to={"/emails"}>
                    <h3 className="new-message-close-btn">X</h3>
                </Link>
            </div>
            <div className="new-message-recipients">
                <label>To: </label> <input type="email" />{" "}
            </div>
            <div className="new-message-subject">
                <label>Subject: </label> <input type="text"></input>
            </div>
            <div className="body-input-container">
                <input className="body-input" type="text" />
            </div>

            <button type="submit" className="new-message-send-btn">
                Send
            </button>
        </form>
    );
}
