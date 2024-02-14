import { CoffeeItem } from "./CoffeeItem";

export function CoffeeList({ data, selectedCoffee, onSelection, children }) {
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
