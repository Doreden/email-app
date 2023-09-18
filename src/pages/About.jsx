import { Link, Outlet } from "react-router-dom";

export function About() {
    

    return (
        <div className="about">
            <h1>We All About Stay In Touch!</h1>
            <Outlet />
            <nav>
                <class name="team" Link to="/about/team">Team</class>
                <Link to="/about/vision">Vision</Link>
            </nav>
        </div>
    )
}
