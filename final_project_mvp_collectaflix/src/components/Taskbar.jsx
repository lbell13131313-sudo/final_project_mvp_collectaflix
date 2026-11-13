import { Link } from 'react-router-dom';

function Taskbar() {
    return (
        <Footer>
            <nav>
                <Link to="/" className="nav-link">Explore</Link>
                <Link to="/collection" className="nav-link">Collection</Link>
                <Link to="/wantlist" className="nav-link">Wantlist</Link>
                <Link to="/cart" className="nav-link">Cart</Link>
            </nav>
        </Footer>
    );
};

export default Taskbar;