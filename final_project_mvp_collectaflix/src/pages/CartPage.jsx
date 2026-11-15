import { useCart } from '../contexts/CartContext';
import MediaGrid from '../components/MediaGrid';

function CartPage() {
    const { cart } = useCart();

    console.log('Cart contents:', cart);

    const cartTotal = () => {
        //const total = cart.reduce((sum, listing) => sum + listing.lowestPrice, 0);

         const total = (cart || []).reduce((sum, item) => {
            const rawPrice = item?.listing?.lowestPrice ?? 0;
            const cleanPrice = Number(String(rawPrice).replace(/[^0-9.-]+/g, ''));

            return sum + (isNaN(cleanPrice) ? 0 : cleanPrice);
        }, 0);

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(total);
    };

    return (
        <main className="main-content">
            <div className="content-header">
                <h2>My Cart</h2>
                <p>Movies or shows you are purchasing</p>
                {/* passes the cart as a prop */}
            </div>
            {cart.length > 0 ? (
                <>
                    <MediaGrid medias={cart} />
                    <h1> Total: {cartTotal()}</h1>
                </>
            ) : (
                <div className="empty-state">
                    <p>You cart is empty. Add movies and shows from the explore page to get started!</p>
                </div>
            )}
        </main>
    );
};

export default CartPage;