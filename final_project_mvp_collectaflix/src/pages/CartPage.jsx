import { useCart } from '../contexts/CartContext';
import MediaGrid from '../components/MediaGrid';

function CartPage() {
    const { cart } = useCart();

    return (
        <main className="main-content">
            <div className="content-header">
                <h2>My Cart</h2>
                <p>Movies or shows you ware purchasing</p>
                {/* passes the cart as a prop */}
            </div>
            {cart.length > 0 ? (
                <MediaGrid medias={cart} />
            ) : (
                <div className="empty-state">
                    <p>You cart is empty. Add movies and shows from the explore page to get started!</p>
                </div>
            )}
        </main>
    );
};

export default CartPage;