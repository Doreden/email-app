import { Link, Outlet } from "react-router-dom";

export function About() {
    

    return (
        <div className="about">
            <h1>We All About Stay In Touch!</h1>
            <Outlet />
            <nav>
                <Link to="/about/team"> Meet Our Team</Link>
                <Link to="/about/vision">Our Vision Is</Link>
                <Link to="/about/contact">Contact Us</Link>
            </nav>
        </div>
    )
}
