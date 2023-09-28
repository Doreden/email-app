import { Link, NavLink } from "react-router-dom";
import aboutBtn from "../../../src/assets/svg/about.svg";
import emailsBtn from "../../../src/assets/svg/envelope.svg";
import homeBtn from "../../../src/assets/svg/homePage.svg";
export function AppHeader() {

    return (
        <header className="app-header">
            <section className="container">
                {/* <h1>Mails</h1> */}
                <nav>
                    <Link to="/">
                        <button type="button">
                            <img src={homeBtn} />
                        </button>
                    </Link>
                    <Link to="/about">
                        <button type="button">
                            <img src={aboutBtn} />
                        </button></Link>
                    <Link to="/emails">
                        <button type="button">
                            <img src={emailsBtn} />
                        </button>
                    </Link>
                </nav>
            </section>
        </header>
    )

}