import { Link } from 'react-router-dom';

function Taskbar() {
    return (
        <Footer>
            <nav>
                <Link to="/" className="nav-link">🔍</Link>
                <Link to="/collection" className="nav-link">📚</Link>
                <Link to="/wantlist" className="nav-link">👁️</Link>
                <Link to="/cart" className="nav-link">🛒</Link>
            </nav>
        </Footer>
    );
};

export default Taskbar;