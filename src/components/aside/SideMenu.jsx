import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import pencilBtn from "../../../src/assets/svg/pencil.svg"


const buttons = [
    { id: 1, name: "Inbox", img: "/src/assets/svg/inbox.png" },
    { id: 2, name: "Starred", img: "/src/assets/svg/star-sculpt.png" },
    { id: 3, name: "Sent", img: "/src/assets/svg/sent.png" },
    { id: 4, name: "Drafts", img: "/src/assets/svg/draft.png" },
    { id: 5, name: "Trash", img: "/src/assets/svg/bin.png" },
];

export function SideMenu({ emails }) {
    const [active, setActive] = useState("inbox");

    const unreadEmailsCount = emails.filter(
        (email) => email.isRead !== true
    ).length;

    function setActiveButton(id) {
        setActive(id);
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