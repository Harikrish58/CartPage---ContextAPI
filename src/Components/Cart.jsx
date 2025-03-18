import React, { useContext, useMemo } from "react";
import { mycontext } from "../App";

const Cart = () => {
  const [data, setData] = useContext(mycontext);

  const totalPrice = useMemo(
    () =>
      data.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      ),
    [data]
  );

  const totalQuantity = useMemo(
    () => data.reduce((total, item) => total + (item.quantity || 1), 0),
    [data]
  );

  const handleInc = (id) => {
    setData((curr) =>
      curr.map((element) =>
        element.id === id
          ? { ...element, quantity: (element.quantity || 1) + 1 }
          : element
      )
    );
  };

  const handleDec = (id) => {
    setData((curr) =>
      curr.map((element) =>
        element.id === id && (element.quantity || 1) > 1
          ? { ...element, quantity: (element.quantity || 1) - 1 }
          : element
      )
    );
  };

  const handleRemove = (id) => {
    setData((curr) => curr.filter((element) => element.id !== id));
  };

  if (!data.length) {
    return (
      <div className="container mt-5 cart-container">
        <h1 className="mb-4">Cart Page</h1>
        <div className="alert alert-info" role="alert">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 cart-container">
      <h1 className="mb-4">Cart Page</h1>
      <div className="card mb-4 cart-summary-card">
        <div className="card-body">
          <h2 className="card-title">Cart Summary</h2>
          <div className="row">
            <div className="col-md-6">
              <h4>Total Quantity: {totalQuantity}</h4>
            </div>
            <div className="col-md-6 text-end">
              <h4>Total Amount: ${totalPrice.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>

      {data.map((element) => (
        <div key={element.id} className="card mb-3 cart-item-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2">
                <img
                  src={element.image}
                  alt={element.title}
                  className="img-fluid cart-item-image"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </div>
              <div className="col-md-10">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="cart-title">{element.title}</h3>
                    <p className="cart-description">{element.description}</p>
                  </div>
                  <div className="text-end">
                    <div
                      className="btn-group mb-2 quantity-btn-group"
                      role="group"
                    >
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleDec(element.id)}
                      >
                        -
                      </button>
                      <button className="btn btn-outline-secondary disabled">
                        {element.quantity || 1}
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleInc(element.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between price-details">
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <p className="price-label mb-1">Price:</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="price-label mb-0">Subtotal:</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="price-label text-success mb-0">Shipping:</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="price-value mb-1">${element.price}</p>
                    <p className="price-value subtotal mb-0">
                      ${(element.price * (element.quantity || 1)).toFixed(2)}
                    </p>
                    <p className="price-value shipping mb-0">Free</p>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-2">
                  <button
                    className="btn btn-danger btn-sm remove-btn"
                    onClick={() => handleRemove(element.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
