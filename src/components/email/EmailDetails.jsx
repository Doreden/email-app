import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { emailService } from "../../services/email.service"

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate

    useEffect(() => {
        loadEmails()
    }, [params.emailId])

    async function loadEmails() {
        try {
            const email = await emailService.getById(params.emailId)
            await emailService.save({ ...email, isRead: true })
            setEmail({ ...email, isRead: true })
        } catch (error) {
            navigate('/emails')
            console.error('Had issues loading emails', error);
        }
    }

    if (!email) return <div>Loading...</div>

    return (
        <section className="email-details">
            <h3>Subject : {email.subject}</h3>
            <h3>Body : {email.body}</h3>
            <h3>Sent At : {email.sentAt}</h3>
            <h3>From : {email.from}</h3>
            <h3>To : {email.to}</h3>
            <Link to={`/emails/${params.folderId}`}>Back</Link>

        </section>
    )



}