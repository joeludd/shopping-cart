import { useState } from 'react';
import Cart from './components/Cart';
import ItemList from './components/ItemList';
import Checkout from './components/Checkout';

function App() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        if (item.available) {
            setCartItems([...cartItems, item]);
        }
    }

    const removeFromCart = (index) => {
        const array = [...cartItems];
        array.splice(index, 1);
        setCartItems(array);
    }

    return (
        <div className="App">
            <Cart cartItems={cartItems}/>
            <ItemList addToCart={addToCart}/>
            <Checkout cartItems={cartItems} removeFromCart={removeFromCart} />
        </div>
    );
}

export default App;
