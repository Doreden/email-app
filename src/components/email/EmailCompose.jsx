import { Link, useNavigate, useParams } from "react-router-dom";
import { emailService } from "../../services/email.service";
import { useState } from "react";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";

export function EmailCompose() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(emailService.createEmail())
    const params = useParams()
    const [showToLabel, setShowToLabel] = useState(false)

    function closeMail() {
        if (email.body) {
            emailService.save(email)
        }

        navigate(`/emails/${params.folderId}`);
    }



    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }
        setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
    }

    async function formSubmit(ev) {
        ev.preventDefault()
        try {
            console.log(email)
            email.sentAt = Date.now()
            const savedEmail = await emailService.save(email)
            showSuccessMsg('Mail sent successfully')
            navigate("/emails/inbox");

        } catch (err) {
            showErrorMsg('Something went wrong..')
            console.log("Error", err);
        }
    }

    const { subject, to, body } = email
    return (
        <form className="compose-main-container" onSubmit={(e) => formSubmit(e)}>
            <div className="new-message">
                <p className="new-message-title">New Message</p>

                {/* <Link to={`/emails/${params.folderId}`}>
                    <h3 className="new-message-close-btn" onClick={closeMail()}>X</h3>
                </Link> */}

                <h3 className="new-message-close-btn" onClick={closeMail}>X</h3>

            </div>



            <div className="new-message-recipients">
                <label >{showToLabel && "To"} </label>
                <input placeholder={!showToLabel && "Recipients"} value={to || ""} onChange={handleChange}
                    onClick={() => setShowToLabel(true)}
                    onBlur={() => setShowToLabel(false)}
                    type="email"
                    name="to" />
            </div>

            <div className="new-message-subject">
                <label>Subject: </label>
                <input placeholder="Subject" value={subject || ""} onChange={handleChange} type="text"
                    name="subject" />
            </div>

            <div className="body-input-container">
                <textarea placeholder="message" value={body || ""} onChange={handleChange}
                    name="body" />
            </div>

            <button type="submit" className="new-message-send-btn">
                Send
            </button>
        </form>
    );
}
