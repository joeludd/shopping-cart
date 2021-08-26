import { useEffect, useState } from 'react';
import Item from './Item';

function ItemList(props) {
    const [items, setItems] = useState([]);

    const fetchItems = () => {
        const endpoint = './items.json';

        fetch(endpoint)
        .then(response => response.json())
        .then(jsonResponse => {
            setItems(jsonResponse.items);
        })
        .catch(error => {
            console.error('There was an error:', error);
        });
    }

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <ul className="item-list">
            {items.map(item => (
                <Item key={`item-${item.id}`} item={item} addToCart={props.addToCart}/>
            ))}
        </ul>
    )
}

export default ItemList;