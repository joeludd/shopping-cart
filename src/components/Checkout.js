import CheckoutItem from "./CheckoutItem";

function Checkout(props) {
    const {cartItems} = props;

    const handleClose = () => {
        document.querySelector('.checkout').classList.remove('active');
    }

    return (
        <div className="checkout">
            <span className="close" onClick={handleClose}>Close</span>
            <h2>Checkout</h2>
            <ul>
                {cartItems.map((item, i) => 
                    <CheckoutItem key={`checkout-item${i}`} item={item} itemIndex={i} removeFromCart={props.removeFromCart} />
                )}
            </ul>
        </div>
    )
}

export default Checkout;