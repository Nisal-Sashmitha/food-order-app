import React, { Fragment, useContext, useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import FoodItems from "./Components/FoodItems/FoodItems";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./Components/Auth/AuthPage";
import AuthContext from "./Store/AuthContext";
import Cart from "./Components/Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Components/UI/Notification";
import NotificationModel from "./models/notification";
import { cartActions } from "./Store/cart-slice";

let isInitial = true;

function App() {
  const authCtx = useContext(AuthContext);
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const [notification, setNotification] = useState<NotificationModel | null>(
    null
  );

  const [cartIsShown, setCartIsShown] = React.useState<boolean>(false);
  const showCartHandler = () => setCartIsShown(true);
  const hideCartHandler = () => setCartIsShown(false);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(
        "https://food-order-app-76e5f-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      dispatch(cartActions.replaceCart(responseData));
    };
    try {
      fetchCart();
    } catch (err) {
      setNotification({
        title: "Error",
        message: "couldn't load Cart!",
        status: "error",
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (isInitial || !cart.changed) {
      isInitial = false;
      return
    }
    fetch(
      "https://food-order-app-76e5f-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
      { method: "PUT", body: JSON.stringify(cart) }
    )
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        setNotification({
          title: "Error",
          message: "couldn't save Cart changes!",
          status: "error",
        });
      });

    return setNotification(null);
  }, [cart]);

  return (
    <Fragment>
      {/* this header includes nav bar, header image, and access to cart components */}
      {notification && <Notification notification={notification} />}
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Routes>
        <Route
          path="/"
          element={[
            <Header key={1} onShowCart={showCartHandler} />,
            <FoodItems key={2} />,
          ]}
        />
        {!authCtx.isLoggedIn && <Route path="/login" element={<AuthPage />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Fragment>
  );
}

export default App;
