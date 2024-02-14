export function CouponInfo({ coupon, usedCoupons, amount }) {
  function information() {
    if (coupon && usedCoupons?.find((el) => el === coupon)) {
      return <h4>Discount voucher successfully added!</h4>;
    } else if (coupon === "rep") {
      return (
        <h4>
          Discount voucher already used or ${-amount.toFixed(2)} is required to
          use the promotional code!{" "}
        </h4>
      );
    } else if (!coupon) {
      return <h4>Discount voucher doesn't exist! Try again.</h4>;
    }
  }
  return (
    <div className="summary-coupon-info">
      <div>{information()}</div>
    </div>
  );
}
