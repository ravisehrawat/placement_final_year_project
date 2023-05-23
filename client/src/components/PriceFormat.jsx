const PriceFormat = (props) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(props.price);
};

export default PriceFormat;
