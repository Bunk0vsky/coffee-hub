import { useState } from "react";
import { Button } from "../App";
import { Order } from "./Order";
import { CouponInfo } from "./CouponInfo";

export function Summary({
  orders,
  onShowAddSummary,
  onSetOrders,
  onSetSelectionCoffee,
  onHandleOrders,
}) {
  const [coupon, setCoupon] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [usedCoupons, setUsedCoupons] = useState([]);
  const [amount, setAmount] = useState(0);

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

  const discountCode = [
    {
      name: "free",
      value: 3.0,
    },
    {
      name: "coffee10",
      value: 10.0,
    },
  ];

  function handleDiscountCoupon(e) {
    const inputValue =
      e.target.form[0].value !== "" ? e.target.form[0].value : null;

    const found = discountCode.filter((el) => el.name.includes(inputValue));

    const promo = {
      number: Number(),
      product: found[0]?.name,
      quantity: 1,
      size: "-",
      price: null,
      total: Number(-found[0]?.value).toFixed(2),
    };

    e.preventDefault();

    if (found?.length === 1) {
      setCoupon(inputValue);
      if (
        !usedCoupons.includes(found[0].name) &&
        totalCost > found[0].value - 0.01
      ) {
        setUsedCoupons([...usedCoupons, inputValue]);
        onHandleOrders(promo);
      } else {
        setUsedCoupons([...usedCoupons]);
        setCoupon("rep");
        setAmount(totalCost - found[0].value - 0.01);
      }

      e.target.form[0].value = "";
    } else {
      setCoupon(null);
      e.target.form[0].value = "";
    }

    setIsEmpty(false);
    setTimeout(() => {
      setCoupon(null);
      setIsEmpty(true);
    }, 3000);
  }

  const totalCost = Number(
    orders
      .map((el) => +el.total)
      .reduce((acc, cur, index) => acc + cur, 0)
      .toFixed(2)
  );
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
        {orders?.map((order, index) => (
          <Order
            id={order.id}
            number={index + 1}
            product={order.product}
            quantity={order.quantity}
            size={handleSize(+order.size)}
            price={order.price}
            total={order.total}
            key={index + 1}
            orders={orders}
            onSetOrders={onSetOrders}
          />
        ))}
        <div className="summary-bottom">
          <form className="summary-coupon">
            <input
              className="summary-coupon-input"
              type="text"
              placeholder="Discount Code"
            ></input>
            <Button type="submit" onClick={(e) => handleDiscountCoupon(e)}>
              Add Coupon
            </Button>
          </form>
          <div className="summary-total">
            <b>Total: ${totalCost}</b>
          </div>
        </div>
        {!isEmpty && (
          <CouponInfo
            coupon={coupon}
            usedCoupons={usedCoupons}
            setUsedCoupons={setUsedCoupons}
            amount={amount}
          ></CouponInfo>
        )}
        <Button onClick={() => handleBuyProcess()}>Buy</Button>
      </ul>
    </div>
  );
}
