import { useRef } from "react";

export function Order({
  id,
  number,
  product,
  quantity,
  size,
  price,
  total,
  orders,
  onSetOrders,
}) {
  const ref = useRef();
  // console.log(ref?.current?.id);
  function checkNumber(val) {
    if (val > 0) {
      return `$${val}`;
    } else if (val < 0) {
      const valStrRep = val.replace("-", "");
      const valNum = parseInt(valStrRep);
      return `-$${valNum.toFixed(2)}`;
    }
  }

  function handleDeleteCoffee(id) {
    onSetOrders(orders.filter((order) => order?.id !== id));
  }

  return (
    <li className="order-item" ref={ref} id={id}>
      <p>{number}</p>
      <p>{product}</p>
      <p>x{quantity}</p>
      <p>{size ? size : "-"}</p>
      <p>{price}</p>
      <p>{checkNumber(total)}</p>
      <button className="delete-item" onClick={() => handleDeleteCoffee(id)}>
        🗑
      </button>
    </li>
  );
}
