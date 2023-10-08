import { useEffect, useState } from "react"
import { emailService } from "../services/email.service";
import { EmailList } from "../components/email/EmailList";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { EmailFilter } from "../components/email/EmailFilter";
import { SideMenu } from "../components/aside/SideMenu";
import { EmailCompose } from "../components/email/EmailCompose";


export function EmailIndex() {

    // define the emails
    const [emails, setEmails] = useState(null);
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const params = useParams();
    const location = useLocation()

    // rendering the emails
    useEffect(() => {
        loadEmails();
    }, [filterBy, params])

    // useEffect(() => {
    //     loadEmails();
    // }, [params])

    //Set Filter
    function onSetFilter(fieldsToUpdate) {
        setFilterBy((prevFilter) => ({ ...prevFilter, ...fieldsToUpdate }));
    }

    // function that loading the new emails in a async way //
    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy, params.folderId);
            const emailsCount = await emailService.getEmailsCounts()
            setEmails(emails)
            // setEmailsCount(emailsCount)
        } catch (error) {
            console.error('Had issues loading the emails: ', error);
        }
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email);
            setEmails(prevEmails => prevEmails.map(email => email.id === updatedEmail.id ? updatedEmail : email))
            loadEmails();
        } catch (error) {
            console.log("Error updating email", error);
        }
    }

    async function onMailRead(emailId, field) {
        try {
            const mailToUpdate = await emailService.getById(emailId);
            const updatedMail = {
                ...mailToUpdate,
                [field]: !mailToUpdate[field],
            };
            await emailService.save(updatedMail);
            loadEmails();
        } catch (err) {
            console.log("Error reading this email", error);
        }
    }

    async function onStarred(emailId) {
        try {
            const mailToUpdate = await emailService.getById(emailId);
            const updatedMail = {
                ...mailToUpdate,
                isStarred: !mailToUpdate.isStarred,
            };
            await emailService.save(updatedMail);
            loadEmails();
        } catch (err) {
            console.log("Error starring this email", error);

        }
    }

    async function onEnterEmail(emailId) {
        try {
            const mailToUpdate = await emailService.getById(emailId);
            const updatedMail = {
                ...mailToUpdate,
                isRead: true,
            };
            await emailService.save(updatedMail);
            loadEmails();
        } catch (err) {
            console.log("Error", err);
        }
    }

    // Removing email
    async function onRemoveEmail(email) {
        try {
            if (params.folderId !== "trash") {
                email.removedAt = Date.now()
                emailService.save(email)
            } else {
                console.log('emailId', email.id);
                await emailService.remove(email.id)
            }
            setEmails((prevEmails) => prevEmails.filter(e => e.id !== email.id))
            const emailsCount = await emailService.getEmailsCounts()
            setEmailsCount(emailsCount)
        } catch (error) {
            console.error('Had issues loading the emails: ', error);
        }
    }

    //print the new fetched emails to console
    if (!emails) return <div>Loading..</div>
    return (
        <div className="email-index-container">
            <Logo />
            <SideMenu emails={emails} />

            <EmailFilter onSetFilter={onSetFilter} />
            

            {params.emailId ? <Outlet /> : (
                <section className="mail-list-container">
                    <EmailList
                        onUpdateEmail={onUpdateEmail}
                        emails={emails}
                        onMailRead={onMailRead}
                        onStarred={onStarred}
                        onRemove={onRemoveEmail}
                        onEnterEmail={onEnterEmail}
                    />
                </section>
            )}

            {location.pathname.split("/").slice(-1) == "compose" ? <div className="float"><EmailCompose /></div> : <></>}
    
            
        </div>

        
    )
}



function Logo() {
    return (
        <div className="menu-logo-main--container">
            <div className="menu-container">
                <img className="menu" src="../../src/assets/svg/menu burger.png" />
            </div>
            <div className="logo-container">
                <img className="logo" src="../../src/assets/svg/gmail-logo.png" />
            </div>
        </div>
    );
}