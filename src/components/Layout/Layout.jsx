import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';

const Layout = ({ children }) => {
    // Add debugging to check if Layout is rendering
    useEffect(() => {
        console.log("Layout rendering with children:", !!children);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;