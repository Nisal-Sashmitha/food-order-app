import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
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
import useDebouncer from "./hooks/debouncer";
import useHttp from "./hooks/http";

let isInitial = true;

function App() {
  const authCtx = useContext(AuthContext);
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  let debouncedValue = useDebouncer(cart, 700);

  const initialCartLoadRequestMethod =useCallback((data: any) => dispatch(cartActions.replaceCart(data)),[dispatch]);

  const {error:initiateLoadingError , sendRequest:initialCartLoadingSendRequest} = useHttp();

  const {error:cartUpdatingError , sendRequest:cartUpdatingSendRequest} = useHttp();

  const [notification, setNotification] = useState<NotificationModel | null>(
    null
  );

  const [cartIsShown, setCartIsShown] = React.useState<boolean>(false);
  const showCartHandler = () => setCartIsShown(true);
  const hideCartHandler = () => setCartIsShown(false);

  useEffect(() => {
    initialCartLoadingSendRequest({
      url: "https://food-order-app-76e5f-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
    },initialCartLoadRequestMethod);
    if (initiateLoadingError) {
      setNotification({
        title: "Error",
        status: "error",
        message: "Error in fetching cart items from database!",
      });
    }
  }, [initialCartLoadingSendRequest,initialCartLoadRequestMethod,initiateLoadingError]);

  useEffect(() => {
    if (isInitial || !debouncedValue.changed) {
      isInitial = false;
      return;
    }
    cartUpdatingSendRequest({
      url: "https://food-order-app-76e5f-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
      method: "PUT",
      body: {
        items: debouncedValue.items,
        totalAmount: debouncedValue.totalAmount,
        totalQuantitiy: debouncedValue.totalQuantitiy,
      }
    },()=>{});
    if(cartUpdatingError){
      setNotification({
        title: "Error",
        message: "couldn't save Cart changes!",
        status: "error",
      });

    }
        

    return setNotification(null);
  }, [debouncedValue,cartUpdatingSendRequest,cartUpdatingError]);

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
