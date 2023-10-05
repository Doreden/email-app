import { Link, useNavigate, useParams } from "react-router-dom";
import { emailService } from "../../services/email.service";
import { useState } from "react";

export function EmailCompose() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(emailService.createEmail())
    const params = useParams()
    const [showToLabel, setShowToLabel] = useState(false)


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
            const savedEmail = await emailService.save(email)
            navigate("/emails/inbox");

        } catch (err) {
            console.log("Error", err);
        }
    }

    const { subject, to, body } = email
    return (
        <form className="compose-main-container" onSubmit={(e) => formSubmit(e)}>
            <div className="new-message">
                <p className="new-message-title">New Message</p>

                <Link to={`/emails/${params.folderId}`}>
                    <h3 className="new-message-close-btn">X</h3>
                </Link>
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
                <textarea placeholder="message"  value={body || ""} onChange={handleChange}
                    name="body" />
            </div>

            <button type="submit" className="new-message-send-btn">
                Send
            </button>
        </form>
    );
}
