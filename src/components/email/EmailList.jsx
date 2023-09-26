import "../../../src/assets/css/cmps/email/email-list.css"
import { EmailPreview } from "../email/EmailPreview";
import refresh from "../../../src/assets/svg/refresh.svg"
import checkbox from "../../../src/assets/svg/checkbox.svg"
import dots from "../../../src/assets/svg/elips-dots.svg"





export function EmailList({ emails, onRemove, onMailRead, onStarred, onEnterEmail, onUpdateEmail }) {

    return (
        <div className="email-preview-main-container">
            <div class className="head-buttons">
                <img src={checkbox} />
                <img src={refresh} />
                <img src= {dots}  />
            </div>
            <ul>
                {emails.map((email) => (
                    <li key={email.id}>
                        <EmailPreview
                            onUpdateEmail={onUpdateEmail}
                            email={email}
                            onMailRead={onMailRead}
                            onStarred={onStarred}
                            onRemove={onRemove}
                            onEnterEmail={onEnterEmail}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}