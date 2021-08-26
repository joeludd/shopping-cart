import { useState, useEffect, useRef } from "react";

function CheckoutItem(props) {
    const {item} = props;
    const [itemAmount, setItemAmount] = useState(item.price);
    const [itemQty, setItemQty] = useState(1);

    const decreaseBtn = useRef(null);
    const increaseBtn = useRef(null);

    const decreaseQty = () => {
        setItemQty(itemQty - 1);
    }

    const increaseQty = () => {
        setItemQty(itemQty + 1);
    }

    useEffect(() => {
        if(itemQty === 1) {
            decreaseBtn.current.classList.add('disabled');
        } else {
            decreaseBtn.current.classList.remove('disabled');
        }
        
        if(itemQty === item.totalQty) {
            increaseBtn.current.classList.add('disabled');
        } else {
            increaseBtn.current.classList.remove('disabled');
        }

        setItemAmount(item.price * itemQty);

    }, [itemQty])

    const handleRemove = () => {
        props.removeFromCart(props.itemIndex);
    }

    return (
        <li>
            <h3>{item.name}</h3>
            <div className="specs">
                <span>Color: {item.color} </span>
                <span>{item.otherOption}</span>
                <span className="price">{item.price} SEK</span>
            </div>
            <div className="qty-price">
                <div className="qty-wrapper">
                    <span ref={decreaseBtn} className="qty-btn decrease" data-testid="qty-decrease" onClick={decreaseQty}>-</span>
                    <span className="item-qty" data-testid="qty">{itemQty}</span>
                    <span ref={increaseBtn} className="qty-btn increase" data-testid="qty-increase" onClick={increaseQty}>+</span>
                </div>
                <span className="price-tot">{itemAmount} SEK</span>
            </div>
            <div className="remove-wrapper">
                <span className="remove" data-testid="remove-btn" onClick={handleRemove}>remove</span>
            </div>
        </li>
    )
}

export default CheckoutItem;