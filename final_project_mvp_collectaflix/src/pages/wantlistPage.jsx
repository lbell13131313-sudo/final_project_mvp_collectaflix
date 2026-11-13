import MediaGrid from '../components/MediaGrid';
import { useWantlist } from '../contexts/WantlistContext';

function WantlistPage() {
    const { wantlist } = useWantlist();

    return (
        <main className="main-content">
            <div className="content-header">
                <h2>My Wantlist</h2>
                <p>Movies or shows you want to add to your collection</p>
                {/* passes the wantlist as a prop */}
            </div>
            {wantlist.length > 0 ? (
                <MediaGrid medias={wantlist} />
            ) : (
                <div className="empty-state">
                    <p>You wantlist is empty. Add movies and shows from the explore page to get started!</p>
                </div>
            )}
        </main>
    );
};

export default WantlistPage;