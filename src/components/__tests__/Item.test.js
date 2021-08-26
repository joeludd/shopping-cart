import Item from '../Item';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const testItem = {
    id: 1,
    name: "Testitem",
    brand: "Testbrand",
    price: "5000",
    available: true,
    weight: 1,
    options: [
        {
            "color": ["black"],
            "storage": ["250", "500", "1000"],
            "quantity": 10
        },
        {
            "color": ["white"],
            "storage": ["250", "500"],
            "quantity": 0
        }
    ]
};

// test('Debug', () => {
//     render(<Item item={testItem} addToCart={()=>{}} />);
//     screen.debug();
// })

test('Click details adds active class', () => {
    render(<Item item={testItem} addToCart={()=>{}} />);
    const button = screen.getByTestId('details-btn');
    userEvent.click(button);
    const details = screen.getByTestId('details-wrapper');
    expect(details).toHaveClass('active');
});

test('Click close removes active class', () => {
    render(<Item item={testItem} addToCart={()=>{}} />);
    const button = screen.getByTestId('details-btn');
    const details = screen.getByTestId('details-wrapper');
    userEvent.click(button);
    expect(details).toHaveClass('active');
    const close = screen.getByTestId('close-btn');
    userEvent.click(close);
    expect(details).not.toHaveClass('active');
});

test('Display added to cart message', () => {
    render(<Item item={testItem} addToCart={()=>{}} />);
    const button = screen.getByTestId('add-btn');
    userEvent.click(button);
    const addMsg = screen.getByText('Added product to cart');
    expect(addMsg).toBeInTheDocument();
})

test('Disable add button for option with quantity 0', () => {
    render(<Item item={testItem} addToCart={()=>{}} />);
    const select = screen.getByTestId('select-color');
    userEvent.selectOptions(select, 'white');
    const button = screen.getByTestId('add-btn');
    userEvent.click(button);
    const addMsg = screen.queryByText('Added product to cart');
    expect(addMsg).toBeNull();
})