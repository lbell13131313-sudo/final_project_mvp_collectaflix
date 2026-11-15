import { Link } from 'react-router-dom';

function Taskbar() {
    // this is a work in progress
    return (
        <footer>
            <nav>
                <Link to="/" className="nav-link">🔍</Link>
                <Link to="/collection" className="nav-link">📚</Link>
                <Link to="/wantlist" className="nav-link">👁️</Link>
                <Link to="/cart" className="nav-link">🛒</Link>
            </nav>
        </footer>
    );
};

export default Taskbar;