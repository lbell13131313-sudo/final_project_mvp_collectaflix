import MediaCard from './MediaCard';

function MediaGrid({ medias }) {
    return (
        <div className="movie-grid">
            {medias.map(media => (
                <MediaCard key={media.id} media={media} />
            ))}
        </div>
    );
};

export default MediaGrid;