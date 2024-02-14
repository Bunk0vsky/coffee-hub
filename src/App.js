import { useState } from "react";
import { CoffeeList } from "./components/CoffeeList";
import { Details } from "./components/Details";
import { Summary } from "./components/Summary";

const coffeeMenu = [
  {
    id: 100001,
    name: "Espresso",
    image: "espresso.svg",
    quantity: 1,
    size: [1, 1.5, 2.5],
    price: 2.99,
    description: `Espresso is a concentrated coffee beverage brewed by forcing hot water through finely-ground coffee beans. It's characterized by its strong flavor and rich, velvety texture.`,
  },
  {
    id: 100002,
    name: "Cappuccino",
    image: "cappuccino.svg",
    quantity: Number(),
    size: [1, 1.5, 2.5],
    price: 3.99,
    description: `Cappuccino is a classic Italian coffee drink consisting of equal parts espresso, steamed milk, and milk foam.`,
  },
  {
    id: 100003,
    name: "Macchiato",
    image: "macchiato.svg",
    quantity: Number(),
    size: [1, 1.5, 2.5],
    price: 3.99,
    description: `Macchiato is a traditional Italian espresso-based coffee beverage that consists of a shot of espresso "stained" or "marked" with a small amount of steamed milk.`,
  },
  {
    id: 100004,
    name: "Mocha",
    image: "mocha.svg",
    quantity: Number(),
    size: [1, 1.5, 2.5],
    price: 4.59,
    description: `Mocha, also known as a "Caffè Mocha" or "Mochaccino," is a popular coffee beverage that combines espresso with steamed milk and chocolate. It's characterized by its rich and indulgent flavor profile, blending the boldness of espresso with the sweetness of chocolate and the creaminess of steamed milk`,
  },
  {
    id: 100005,
    name: "Latte",
    image: "latte.svg",
    quantity: Number(),
    size: [1, 1.5, 2.5],
    price: 5.59,
    description: `Latte is a popular coffee beverage made with espresso and steamed milk. It has a smooth, creamy texture and a mild coffee flavor, making it a favorite choice for those who enjoy a lighter coffee experience.`,
  },
];

export function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showAddSummary, setShowAddSummary] = useState(false);
  // Details
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  // Orders array
  const [orders, setOrders] = useState([]);

  function handleSelection(coffee) {
    setSelectedCoffee((cur) => (cur?.id === coffee.id ? null : coffee));
  }

  // function handleDeleteCoffee(id) {
  //   setOrders((orders) => orders.filter((order) => order.id !== id));
  // }

  function handleOrders(orders) {
    setOrders((order) => [...order, orders]);

    setSelectedCoffee(null);
    setShowAddSummary(true);
  }

  return (
    <div className="app">
      <div className="logo">
        <img src="Coffee-hub3.svg" alt="logo" height="250px" />
      </div>

      <div className="menu grid-container">
        <CoffeeList
          data={coffeeMenu}
          selectedCoffee={selectedCoffee}
          onSelection={handleSelection}
        >
          It's Great{" "}
          <span style={{ color: "rgb(138, 80, 5)" }}>Day For Coffee</span>
        </CoffeeList>
        {selectedCoffee && (
          <Details
            selectedCoffee={selectedCoffee}
            onHandleOrders={handleOrders}
            quantity={quantity}
            setQuantity={setQuantity}
            size={size}
            setSize={setSize}
          />
        )}

        {showAddSummary && orders.length > 0 && (
          <Summary
            orders={orders}
            onShowAddSummary={setShowAddSummary}
            onSetOrders={setOrders}
            onSetSelectionCoffee={setSelectedCoffee}
            onHandleOrders={handleOrders}
            // onHandleDeleteCoffee={handleDeleteCoffee}
          />
        )}
      </div>
    </div>
  );
}
