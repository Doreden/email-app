import { Link } from "react-router-dom";
import fillStar from "../../../src/assets/svg/star.png";
import star from "../../../src/assets/svg/star-sculpt.png";
import bin from "../../../src/assets/svg/bin.png"


export function EmailPreview({ email, onRemove, onMailRead, onStarred, OnEnterEmail, OnUpdateEmail }) {

    //For Starred a Email:
    function onToggleStar() {
        const newEmail = {
            ...email,
            isStarred: !email.isStarred
        }
        OnUpdateEmail(newEmail)
    }

    //For Toggle if was rad:
    function onToggleIsRead() {
        const newEmail = {
            ...email,
            isRead: !email.isRead
        }
        OnUpdateEmail(newEmail);
    }

    return (
        <>
            <div className={`main-email-container ${email.isRead ? "" : "unread"}`}>
                
                <input type="checkbox" name="1" className="mail-preview-checkbox"></input>
                
                <div className={"mail-preview-star"}>
                    <span onClick={() => onToggleStar()}>
                        {email.isStarred ? (
                            <img src={fillStar} />
                        ) : (
                            <img className="star-img" src={star} />
                        )}
                    </span>
                </div>

                {/* From Section : */}
                <div className={"mail-preview-from"}>
                    {email.from}
                </div>

                {/* Link Section : */}
                <Link
                    className={"mail-preview-link"}
                    to={`/email/details/${email.id}`}
                    onClick={() => OnEnterEmail(email.id)}
                >
                </Link>

                {/* Subject Section : */}
                <div className="mail-preview-subject">
                        {email.subject}
                </div>
                
                {/* Body Section : */}
                <div className="mail-preview-body">
                        {email.body}
                </div>

                <div className="mail-preview-actions-btns">
                    <span onClick={() => onRemove(email.id)}>
                        <img src={bin} />{" "}
                    </span>
                    <span onClick={() => onToggleIsRead(email.id)}>
                        {email.isRead ? " 📭" : " 📬"}
                    </span>
                </div>
            </div>

        </>
    )







    // return <article className="email-preview">



    //     <Link to={`/email/${email.id}`}>
    //         <h2>{email.subject}</h2>
    //         <h4>{email.body}</h4>
    //         <h4>{email.isRead}</h4>
    //         <h4>{email.isStarred}</h4>
    //         <h4>{email.sentAt}</h4>
    //         <h4>{email.from}</h4>
    //         <h4>{email.to}</h4>

    //     </Link>
    // </article>

}