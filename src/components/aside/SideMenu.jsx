import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import pencilBtn from "../../../src/assets/svg/pencil.svg"


const buttons = [
    { id: "inbox", name: "Inbox", img: "/src/assets/svg/inbox.png" },
    { id: "starred", name: "Starred", img: "/src/assets/svg/star-sculpt.png" },
    { id: "sent", name: "Sent", img: "/src/assets/svg/sent.png" },
    { id: "drafts", name: "Drafts", img: "/src/assets/svg/draft.png" },
    { id: "trash", name: "Trash", img: "/src/assets/svg/bin.png" },
];

export function SideMenu({ emails }) {
    const [active, setActive] = useState("inbox");
    const navigate = useNavigate()
    const unreadEmailsCount = emails.filter(
        (email) => email.isRead !== true
    ).length;

    function setActiveButton(id) {
        setActive(id);
        navigate(`/emails/${id}`)


    }

    useEffect(() => {
        setActive(1);
    }, [])

    return (
        <div className="aside-menu-container">
            <Link to={"/email/compose"} className="compose-btn">
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
                    <img src={button.img} alt={button.name} />
                    <p className={active === button.id ? "active" : ""}>
                        {button.name}
                        <span className="emails-count">
                            {button.name === "Inbox" && unreadEmailsCount > 0 ? unreadEmailsCount : ""}
                        </span>
                    </p>
                </button>
            ))
            }
        </div>
    )
}