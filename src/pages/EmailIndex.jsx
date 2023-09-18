import { useEffect, useState } from "react"
import { emailService } from "../services/email.service";
import { EmailList } from "../components/email/EmailList";


export function EmailIndex() {

    // define the emails
    const [emails, setEmails] = useState(null);

    // rendering the emails
    useEffect(() => {
        loadEmails()
    }, [])

    // function that loading the new emails in a async way //
    async function loadEmails() {
        try {
            const emails = await emailService.query()
            setEmails(emails)
        } catch (error) {
            console.error('Had issues loading the emails: ', error);
        }
    }

    // Removing email
    async function onRemoveEmail(emailId) {
        try {
            console.log('emailId', emailId);
            await emailService.remove(emailId)
            setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailId))
        } catch (error) {
            console.error('Had issues loading the emails: ', error);
        }
    }

    //print the new fetched emails to console
    console.log(emails)

    if (!emails) return <div>Loading..</div>
    return <section className="email-index">
        <h1>Welcome! this is your inbox</h1>
        {/* <button onClick={onClearFilter}>Clear filter</button> */}
        {/* <RobotFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
        <EmailList emails={emails} onRemove={onRemoveEmail} />
    </section>

}