import { Button } from "../App";

export function Details({
  selectedCoffee,
  onHandleOrders,
  quantity,
  setQuantity,
  size,
  price,
  setSize,
}) {
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

  const totalPrice = +(
    selectedCoffee?.price *
    selectedCoffee?.size[size] *
    quantity
  ).toFixed(2);

  const cart = {
    id: selectedCoffee.id,
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
        <form>
          <h2>Description</h2> {selectedCoffee.description}
        </form>
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
