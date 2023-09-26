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
                <input type="checkbox" name="1" className="mail-checkbox"></input>
                <div className={`star block--item--20 ${email.isRead ? "" : "bold"}`}>
                    <span onClick={() => onToggleStar()}>
                        {email.isStarred ? (
                            <img src={fillStar} />
                        ) : (
                            <img className="star-img" src={star} />
                        )}
                    </span>
                </div>

                {/* From Section : */}
                <div className={`email-from-container block--item--40`}>
                    <p className={email.isRead ? "" : "bold"}> {email.from}</p>
                </div>

                <Link
                    style={{ textDecoration: "none" }}
                    to={`/email/details/${email.id}`}
                    className={`block--item--300 email-preview--link-container`}
                    onClick={() => OnEnterEmail(email.id)}
                >
                    {
                        <div className="from-subject-container">
                            <div>
                                <p className={`email-subject-container ${email.isRead ? "" : "bold"}`}>
                                    {email.subject}
                                </p>
                            </div>
                            <div>
                                <p className="email-body-container">
                                    {email.body}
                                </p>
                            </div>
                        </div>
                    }
                </Link>

                <div className="block--item--40 email-action-btns--td">
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