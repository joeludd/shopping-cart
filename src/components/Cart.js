function Cart(props) {
    const {cartItems} = props;

    const handleClick = () => {
        document.querySelector('.checkout').classList.add('active');
    }

    return (
        <div className="cart">
            <span>Cart ({cartItems.length})</span>
            <div className="cart-hover">
                {cartItems.map((item, i) => 
                    <h4 key={`cart-${i}`}>{item.name}</h4>
                )}
                <button onClick={handleClick}>Checkout</button>
            </div>
        </div>
    )
}

export default Cart;