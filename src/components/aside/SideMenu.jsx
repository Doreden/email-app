import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import pencilBtn from "../../../src/assets/svg/pencil.svg"
import { emailService } from "../../services/email.service";


const buttons = [
    { id: "inbox", name: "Inbox", img: "/src/assets/svg/inbox.png" },
    { id: "starred", name: "Starred", img: "/src/assets/svg/star-sculpt.png" },
    { id: "sent", name: "Sent", img: "/src/assets/svg/sent.png" },
    { id: "drafts", name: "Drafts", img: "/src/assets/svg/draft.png" },
    { id: "trash", name: "Trash", img: "/src/assets/svg/bin.png" },
];

export function SideMenu({ emails }) {
    const [active, setActive] = useState("inbox");
    const [emailsCount, setEmailsCount] = useState(emailService.getEmailsCounts());
    const navigate = useNavigate()
    const params = useParams()


    function setActiveButton(id) {
        setActive(id);
        navigate(`/emails/${id}`)


    }

    useEffect(() => {
        setActive(params.folderId);
        loadEmailsCount()
    }, [emails])

    // function that loading the new emails in a async way //
    async function loadEmailsCount() {
        try {
            // const emails = await emailService.query(filterBy, params.folderId);
            const emailsCount = await emailService.getEmailsCounts()
            // setEmails(emails)
            setEmailsCount(emailsCount)
        } catch (error) {
            console.error('Had issues loading the emails: ', error);
        }
    }

    return (
        <div className="aside-menu-container">
            <Link to={`/emails/${params.folderId}/compose`} className="compose-btn">
                <span className="compose-img--span">
                    <img className="compose-img" src={pencilBtn} />
                </span>
                Compose
            </Link>

            {buttons.map((button) => (
                <button
                    key={button.id}
                    className={`side-panel-btn ${active === button.id ? "active" : ""}`}
                    onClick={() => setActiveButton(button.id)}
                >
                    <img className="side-panel-img" src={button.img} alt={button.name} />
                    <p className="side-panel-text">
                        {button.name}
                    </p>
                    <span className="emails-count" >
                        {emailsCount[button.name]}
                    </span>
                </button>
            ))
            }
        </div>
    )
}