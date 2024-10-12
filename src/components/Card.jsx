import React, { useRef, useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let [qty, setQty] = useState(1);
  let [size, setSize] = useState(priceOptions[0] || ""); // Initialize with first option if available
  const priceRef = useRef();

  const handleAddToCart = async () => {
    if (size === "") {
      console.log("Please select a size.");
      return; // Ensure size is selected before adding to cart
    }

    let food = data.find((item) => item.id === props.foodItem._id);

    // If food item exists in cart
    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      }
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  let finalPrice = qty * (options[size] ? parseInt(options[size]) : 0); // Ensure price is calculated based on selected size

  useEffect(() => {
    setSize(priceRef.current.value);
  }, [priceOptions]); // Update size when priceOptions change

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt={props.foodItem.name}
            style={{ height: "185px", objectFit: "contain" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                className="m-2 h-100 bg-success rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
              <div className="d-inline h-100 fs-5"> ₹{finalPrice}/-</div>
              <hr />
              <button
                className="btn btn-success justify-center ms-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
