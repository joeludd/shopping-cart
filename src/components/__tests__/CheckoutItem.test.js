import CheckoutItem from "../CheckoutItem";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const testItem = {
    available: true,
    color: "white",
    name: "Trådfria Lampor",
    otherOption: "6.5",
    price: "300",
    totalQty: 2
};

// test('Debug', () => {
//     render(<CheckoutItem item={testItem} itemIndex={0} removeFromCart={()=>{}} />);
//     screen.debug();
// })

test('Increase/decrease quantity', () => {
    render(<CheckoutItem item={testItem} itemIndex={0} removeFromCart={()=>{}} />);
    const increase = screen.getByTestId('qty-increase');
    const decrease = screen.getByTestId('qty-decrease');
    userEvent.click(increase);
    const qty = screen.getByTestId('qty');
    expect(qty).toHaveTextContent("2");
    userEvent.click(decrease);
    expect(qty).toHaveTextContent("1");
});

test('Disable increase/decrease if 1/max quantity', async () => {
    render(<CheckoutItem item={testItem} itemIndex={0} removeFromCart={()=>{}} />);
    const increase = screen.getByTestId('qty-increase');
    const decrease = screen.getByTestId('qty-decrease');
    expect(decrease).toHaveClass('disabled');
    userEvent.click(increase);
    await screen.findByText('2');
    expect(increase).toHaveClass('disabled');
})
