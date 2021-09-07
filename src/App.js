import React, { useState, useEffect } from "react";
import { Products, NavBar, Cart, CheckoutForm } from "./features";

import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [products, setProducts] = useState(undefined);
  const [cart, setCart] = useState(undefined);
  const [order, setOrder] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const fetchProducts = async () => {
    //returns a response promise so destructure and take data obj
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };
  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const handleRefreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      handleRefreshCart();
    } catch (error) {
      setErrorMsg(error.data.error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar totalItems={cart?.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleEmptyCart={handleEmptyCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQty={handleUpdateCartQty}
            />
          </Route>
          <Route exact path="/checkout">
            <CheckoutForm
              cart={cart}
              order={order}
              handleCaptureCheckout={handleCaptureCheckout}
              error={errorMsg}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
