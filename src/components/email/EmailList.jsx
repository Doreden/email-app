import "../../../src/assets/css/cmps/email/EmailList.css"
import { EmailPreview } from "../email/EmailPreview";
import refresh from "../../../src/assets/svg/refresh.svg"
import dots from "../../../src/assets/svg/elips-dots.svg"





export function EmailList({ emails, onRemove, onMailRead, onStarred, onEnterEmail, onUpdateEmail }) {

    return (
        <div className="email-preview-main-container">
            <div className="head-btns">
                <input type="checkbox" name="1" className="head-btns-checkbox"></input>
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