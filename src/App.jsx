import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import NavBar from "./components/NavBar";  
import Footer from "./components/Footer";

import { CartProvider } from "./context/cartContext_temp";

const App = () => {
  return (
    <CartProvider>
    <Router>
      <div className="min-h-screen flex flex-col">
        
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
};

export default App;
