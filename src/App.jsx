import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom';
import { AppHeader } from './components/app/AppHeader';
import { AppFooter } from './components/app/AppFooter';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { AboutTeam } from './components/about/AboutTeam';
import { AboutVision } from './components/about/AboutVision';
import { EmailIndex } from './pages/EmailIndex';
import { EmailDetails } from './components/email/EmailDetails';
import { EmailCompose } from './components/email/EmailCompose';
export function App() {

    return (
        <Router>
            <section className='main-app--container'>
                <header className="item1">
                    <AppHeader/>
                    {/* <nav>
                        <Link to="/">Home</Link>
                        <Link to="/about">about</Link>
                        <Link to="/email">Email</Link>
                    </nav> */}
                </header>
                <main className="item2">
                    <Routes>
                        {/* Home Page */}
                        <Route path="/" element={<Home />} />
                        {/* About Page */}
                        <Route path="/about" element={<About />} >
                            <Route path="/about/team" element={<AboutTeam />} />
                            <Route path="/about/vision" element={<AboutVision />} />
                        </Route>

                        {/* Main Email Page */}
                        <Route path="/emails" element={<EmailIndex />} />
                        <Route path="/email/details/:emailId" element={<EmailDetails />} />
                        <Route path="/email/compose" element={<EmailCompose />} />
                    </Routes>
                </main>
                {/* FooterPage */}
                <AppFooter />
            </section>
        </Router>

    )
}

