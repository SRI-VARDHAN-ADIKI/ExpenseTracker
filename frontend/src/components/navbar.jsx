    import './navbar.css';
    import { Link } from 'react-router-dom';

    export default function Navbar() {
        return (
            <div className="navbar">
                <a href="#home" className="link">Home</a>
                <a href="#news" className="link">News</a>
                <a href="#contact" className="link">Contact</a>
                <a href="#about" className="link">About</a>
                <Link to="/profile" className="link">Profile</Link>
            </div>
        );
    };

