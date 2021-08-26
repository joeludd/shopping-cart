import { useEffect, useState } from 'react';
import ItemOptions from './ItemOptions';

function Item(props) {
    const item = props.item;

    const getOtherOption = (option) => {
        const otherOption = Object.keys(option)[1];
        return option[otherOption]
    }

    const [variant, setVariant] = useState(
        {
            name: item.name,
            price: item.price,
            available: item.available,
            totalQty: item.options[0].quantity,
            color: Array.isArray(item.options[0].color) ? item.options[0].color[0] : item.options[0].color,
            otherOption: Object.keys(item.options[0]).length > 2 ? getOtherOption(item.options[0])[0] : ''
        }
    );

    useEffect(() => {
        const addBtn = document.getElementById(`add-${item.id}`);

        if(!item.available) {
            addBtn.setAttribute('disabled', 'disabled');
        }

        if(variant.totalQty < 1) {
            addBtn.setAttribute('disabled', 'disabled');
        } else if(item.available) {
            addBtn.removeAttribute('disabled');
        }
    }, [variant, item.available, item.id]);

    const handleDetails = (e) => {
        const detailViews = document.querySelectorAll('.details');
        detailViews.forEach(x => {
            x.classList.remove('active');
        })
        e.currentTarget.nextElementSibling.classList.add('active');
    }

    const handleClose = (e) => {
        const firstParent = e.currentTarget.parentElement;
        firstParent.parentElement.classList.remove('active');
        document.getElementById(`add-${item.id}`).classList.remove('added');
    }

    const changeVariant = (options) => {
        setVariant(variant => ({ 
            ...variant, 
            color: options.color,
            otherOption: options.otherOption,
            totalQty: options.totalQty
        }))
    }

    const [addedToCart, setAddedToCart] = useState(false);

    const addedToCartMsg = addedToCart ? (
        <p className="added-msg">Added product to cart</p>
    ) : null;

    const unavailMsg = <p className="unavail-msg">Product not available</p>;

    const handleAdd = (e) => {
        props.addToCart(variant);
        setAddedToCart(true);
    }

    return (
        <li>
            <h2>{item.name}</h2>
            <span className="list-price">{item.price} SEK</span>
            <button className="details-btn" data-testid="details-btn" onClick={handleDetails}>Details</button>
            <div className="details" data-testid="details-wrapper">
                <div className="details-content">
                    <span className="close" data-testid="close-btn" onClick={handleClose}>Close</span>
                    <div className="details-inner">
                        <h2>{item.name}</h2>
                        <h3>{item.brand}</h3>
                        <span className="weight">Weight: {item.weight}</span>
                        <span className="price">{item.price} SEK</span>
                        <ItemOptions options={item.options} changeVariant={changeVariant} getOtherOption={getOtherOption} />
                        <button className="add-to-cart" data-testid="add-btn" id={`add-${item.id}`} onClick={handleAdd}>Add to cart</button>
                        {addedToCartMsg}
                        {!item.available && unavailMsg}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Item;