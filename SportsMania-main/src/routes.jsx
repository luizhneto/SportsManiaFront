import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Adress from "./pages/Adress";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import Cart from "./pages/cart/Cart";
import { APP_ROUTES } from "./utils/constants";
import Product from "./pages/Product";
import AboutUs from "./pages/AboutUs";
import AddressUpdate from "./pages/AddressUpdate";
import MyOrders from './pages/MyOrders';
import Contact from './pages/Contact';
import Cards from './pages/Cards';
import AddCard from './pages/AddCard';
import Success from "./pages/backPages/Success";
import Failure from "./pages/backPages/Failure";
import Pending from "./pages/backPages/Pending";
import Academia from "./pages/CategoriasPage/Academia";
import Basquete from "./pages/CategoriasPage/Basquete";
import Ciclismo from "./pages/CategoriasPage/Ciclismo";
import Futebol from "./pages/CategoriasPage/Futebol";
import Luta from "./pages/CategoriasPage/Luta";
import Natacao from "./pages/CategoriasPage/Natacao";
import Todos from "./pages/CategoriasPage/Todos";
import Variados from "./pages/CategoriasPage/Variados";
import Voleibol from "./pages/CategoriasPage/Voleibol";
import MyData from "./pages/MyData";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* Página inicial */}
      <Route path={APP_ROUTES.SIGN_UP} element={<SignUp />} />
      <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
      <Route path={APP_ROUTES.SEARCH_PAGE} element={<SearchPage />} />
      <Route path={APP_ROUTES.ADRESS} element={<Adress />} />
      <Route path={APP_ROUTES.HOME_PAGE} element={<HomePage />} />
      <Route path={APP_ROUTES.CART_PAGE} element={<Cart />} />
      <Route path={`${APP_ROUTES.PRODUCT}/:id`} element={<Product />} />
      <Route path={APP_ROUTES.ABOUT_US} element={<AboutUs />} />
      <Route path="/addressupdate" element={<AddressUpdate />} />
      <Route path="/MyOrders" element={<MyOrders />} />
      <Route path={APP_ROUTES.CONTACT} element={<Contact />} />
      <Route path={APP_ROUTES.CARDS} element={<Cards />} />
      <Route path={APP_ROUTES.AddCard} element={<AddCard />} />
      <Route path={APP_ROUTES.SUCCESS} element={<Success />} />
      <Route path={APP_ROUTES.FAILURE} element={<Failure />} />
      <Route path={APP_ROUTES.PENDING} element={<Pending />} />
      <Route path={APP_ROUTES.ACADEMIA} element={<Academia />} />
      <Route path={APP_ROUTES.BASQUETE} element={<Basquete />} />
      <Route path={APP_ROUTES.CICLISMO} element={<Ciclismo />} />
      <Route path={APP_ROUTES.FUTEBOL} element={<Futebol />} />
      <Route path={APP_ROUTES.LUTA} element={<Luta />} />
      <Route path={APP_ROUTES.NATACAO} element={<Natacao />} />
      <Route path={APP_ROUTES.TODOS} element={<Todos />} />
      <Route path={APP_ROUTES.VARIADOS} element={<Variados />} />
      <Route path={APP_ROUTES.VOLEIBOL} element={<Voleibol />} />
      <Route path="/dados" element={<MyData />} />
    </Routes>
  );
};

export default AppRoutes;