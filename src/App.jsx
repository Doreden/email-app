import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom';
import { AppHeader } from './components/app/AppHeader';
import { AppFooter } from './components/app/AppFooter';
import { Home } from './pages/Home';
export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />

                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/about" element={<About />} /> */}
                    </Routes>
                </main>
                <AppFooter />
            </section>
        </Router>

    )
}

