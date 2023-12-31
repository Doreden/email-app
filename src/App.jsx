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
import { UserMsg} from "./components/app/UserMsg";
export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />

                <main>
                    <Routes>
                        {/* Home Page */}
                        <Route path="/" element={<Home />} />
                        {/* About Page */}
                        <Route path="/about" element={<About />} >
                            <Route path="/about/team" element={<AboutTeam />} />
                            <Route path="/about/vision" element={<AboutVision />} />
                        </Route>

                        {/* Main EmailIndex Page */}
                        <Route path="/emails/:folderId" element={<EmailIndex />}>
                            <Route path="/emails/:folderId/compose" element={<EmailCompose />} />
                            <Route path="/emails/:folderId/:emailId" element={<EmailDetails />} />
                        </Route>
                    </Routes>
                </main>
                {/* FooterPage */}
                <AppFooter />
            </section>
            <UserMsg/>
        </Router>

    )
}

