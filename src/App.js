import { useState } from "react";

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

function Button({ children, onClick }) {
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

        {showAddSummary && (
          <Summary
            orders={orders}
            onShowAddSummary={setShowAddSummary}
            onSetOrders={setOrders}
            onSetSelectionCoffee={setSelectedCoffee}
          />
        )}
      </div>
    </div>
  );
}

function CoffeeList({ data, selectedCoffee, onSelection, children }) {
  return (
    <ul className="list component-1">
      <h1>{children}</h1>
      {data.map((coffee) => (
        <CoffeeItem
          coffee={coffee}
          key={coffee.id}
          selectedCoffee={selectedCoffee}
          onSelection={onSelection}
        ></CoffeeItem>
      ))}
    </ul>
  );
}

function CoffeeItem({ coffee, selectedCoffee, onSelection }) {
  const isSelected = selectedCoffee?.id === coffee.id;

  return (
    <li className="coffee-item">
      <img src={coffee.image} alt={coffee.name} />
      <label>{coffee.name}</label>
      <Button onClick={() => onSelection(coffee)}>
        {isSelected ? "Close" : "Order"}
      </Button>
    </li>
  );
}

function Details({
  selectedCoffee,
  onHandleOrders,
  quantity,
  setQuantity,
  size,
  price,
  setSize,
}) {
  // const [quantity, setQuantity] = useState(1);
  // const [size, setSize] = useState(0);

  function handleQuantity(parametr) {
    setQuantity((val) =>
      (quantity >= 1 && quantity <= 9 && parametr === 1) ||
      (quantity <= 10 && quantity >= 2 && parametr === -1)
        ? val + parametr
        : val
    );
  }
  function handleSize(value) {
    setSize(value);
  }

  const totalPrice = (
    selectedCoffee?.price *
    selectedCoffee?.size[size] *
    quantity
  ).toFixed(2);

  const cart = {
    number: Number(),
    product: selectedCoffee?.name,
    quantity: quantity,
    size: size,
    price: (selectedCoffee?.price * selectedCoffee?.size[size]).toFixed(2),
    total: totalPrice,
  };

  return (
    <div className="details-form component-2">
      <div className="details-image">
        <img
          src={selectedCoffee?.image}
          alt={selectedCoffee?.name}
          width="128px"
          height="128px"
        />
      </div>
      <div>
        <p>
          <h2>Description </h2> {selectedCoffee.description}
        </p>
      </div>
      <div className="details-price">
        <div className="price">
          <h2>{selectedCoffee?.name}</h2>
          <p className="price">
            Price: <span>${totalPrice}</span>
          </p>
        </div>
        <div className="counter">
          <Button onClick={() => handleQuantity(-1)}>-</Button>
          <input
            className="coffee-orders"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
            // style={{ width: "4rem" }}
          />
          <Button onClick={() => handleQuantity(1)}>+</Button>
        </div>
      </div>
      <div className="details-size">
        <div className="order-sizes">
          <h2>Size</h2>
          <div>
            <button
              className="sizes"
              value={0}
              onClick={(e) => handleSize(e.target.value)}
            >
              Small
            </button>
            <button
              className="sizes"
              value={1}
              onClick={(e) => handleSize(e.target.value)}
            >
              Medium
            </button>
            <button
              className="sizes"
              value={2}
              onClick={(e) => handleSize(e.target.value)}
            >
              Large
            </button>
          </div>
        </div>
      </div>
      <div className="details-submit">
        <Button
          onClick={() => {
            onHandleOrders(cart);
            handleSize(0);
            setQuantity(1);
          }}
        >
          Add to Cart 🛒
        </Button>
      </div>
    </div>
  );
}

function Summary({
  orders,
  onShowAddSummary,
  onSetOrders,
  onSetSelectionCoffee,
}) {
  function handleSize(value) {
    if (value === 0) return "S";
    if (value === 1) return "M";
    if (value === 2) return "L";
  }

  function handleBuyProcess() {
    alert(" Enjoy your coffee!☕");
    onShowAddSummary(false);
    onSetOrders([]);
    onSetSelectionCoffee(null);
  }
  const totalCost = orders
    .map((el) => +el.total)
    .reduce((acc, cur, index) => acc + cur, 0)
    .toFixed(2);
  return (
    <div className="summary component-3">
      <h2> Order summary</h2>
      <div className="summary-heading">
        <p>Number </p>
        <p>Product </p>
        <p>Quantity </p>
        <p>Size </p>
        <p>Price </p>
        <p>Total </p>
      </div>
      <ul className="list">
        {orders.map((order, index) => (
          <Order
            number={index + 1}
            product={order.product}
            quantity={order.quantity}
            size={handleSize(+order.size)}
            price={order.price}
            total={order.total}
            key={index + 1}
          />
        ))}
        <div className="summary-bottom">
          <p>
            <b>Total: ${totalCost}</b>
          </p>
        </div>
        <Button onClick={() => handleBuyProcess()}>Buy</Button>
      </ul>
    </div>
  );
}

function Order({ number, product, quantity, size, price, total }) {
  return (
    <li className="order-item">
      <p>{number}</p>
      <p>{product}</p>
      <p>x{quantity}</p>
      <p>{size}</p>
      <p>${price}</p>
      <p>${total}</p>
    </li>
  );
}
