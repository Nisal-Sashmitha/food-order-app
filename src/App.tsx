import React, { Fragment, useContext } from "react";
import Header from "./Components/Header/Header";
import FoodItems from "./Components/FoodItems/FoodItems";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./Components/Auth/AuthPage";
import AuthContext from "./Store/AuthContext";
import Cart from "./Components/Cart/Cart";

function App() {
  const authCtx = useContext(AuthContext);
  const [cartIsShown, setCartIsShown] = React.useState<boolean>(false);
  const showCartHandler = () => setCartIsShown(true);
  const hideCartHandler = () => setCartIsShown(false);
  return (
    <Fragment>
      {/* this header includes nav bar, header image, and access to cart components */}
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Routes>
        <Route
          path="/"
          element={[
            <Header key={1} onShowCart={showCartHandler}  />,
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
