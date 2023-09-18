import {Link, NavLink } from "react-router-dom";

export function AppHeader() {

    return (
        <header className="app-header">
            <section className="container">
                <h1>Mails</h1>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/emails">My Mails</NavLink>
                </nav>
            </section>
        </header>
    )
    
}