import './navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="navbar">
            <Link to="/" className="link">Home</Link>
            <Link to="/income" className="link">Income</Link>
            <Link to="/expenditure" className="link">Expenditure</Link>
            <Link to="/savings" className="link">Savings</Link>
            <Link to="/profile" className="link">Profile</Link>
        </div>
    );
};

