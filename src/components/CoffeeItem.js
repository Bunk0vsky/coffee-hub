import { Button } from "../App";

export function CoffeeItem({ coffee, selectedCoffee, onSelection }) {
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
