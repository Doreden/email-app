import { useEffect, useState } from "react"
import { emailService } from "../services/email.service";
import { EmailList } from "../components/email/EmailList";
import { Outlet, useParams } from "react-router-dom";
import { EmailFilter } from "../components/email/EmailFilter";
import { SideMenu } from "../components/aside/SideMenu";


export function EmailIndex() {

    // define the emails
    const [emails, setEmails] = useState(null);
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const params = useParams();

    // rendering the emails
    useEffect(() => {
        loadEmails();
    }, [filterBy]);

    //Set Filter
    function onSetFilter(fieldsToUpdate) {
        setFilterBy((prevFilter) => ({ ...prevFilter, ...fieldsToUpdate }));
    }

    // function that loading the new emails in a async way //
    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy);
            setEmails(emails)
        } catch (error) {
            console.error('Had issues loading the emails: ', error);
        }
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email);
            setEmails(prevEmails => prevEmails.map(email.id === updatedEmail.id ? updatedEmail : email))
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
    return (<div className="email-index--container">
        {/* <h1>Welcome! this is your inbox</h1> */}
        <section className="section-logo">
            <Logo />
        </section>

        <aside className="aside">
            <SideMenu emails={emails} />
        </aside>

        {/* <p><img src="/src/assets/imgs/gmail-logo.png" alt="" /></p> */}

        <section className="filter-container">
            <EmailFilter onSetFilter={onSetFilter} />
        </section>

        {/* <button onClick={onClearFilter}>Clear filter</button> */}
        {/* <RobotFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}

        {!params.emailId && (
            <>
                <section className="mail-list--container">
                    <EmailList
                        onUpdateEmail={onUpdateEmail}
                        emails={emails}
                        onMailRead={onMailRead}
                        onStarred={onStarred}
                        onRemove={onRemoveEmail}
                        onEnterEmail={onEnterEmail}
                    />
                </section>
            </>
        )}
        <Outlet />

        {/* <EmailList emails={emails} onRemove={onRemoveEmail} /> */}
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