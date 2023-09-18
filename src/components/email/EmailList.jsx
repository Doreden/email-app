import { EmailPreview } from "../email/EmailPreview";



export function EmailList({ emails, onRemove }) {

    return (
        <ul className="email-list">
            {
                emails.map(email => <li key={email.id}>
                    <EmailPreview email={email} />
                    <div className="emails-actions">
                        <button onClick={() => onRemove(email.id)}>X</button>
                    </div>
                </li>)
            }
        </ul>
    )
}