import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import FoodList from "./components/common/foodlist";
import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import HomeB from "./components/common/HomeB";
import Navbar from "./components/templates/Navbar";
import NavbarB from "./components/templates/NavbarB";
import Profile from "./components/users/Profile";
import Login from "./components/common/login";
import WhoAreYou from "./components/common/WhoAreYou";

import User_reg from "./components/common/user_reg";
import Badmin_reg from "./components/common/badmin_reg";
import Food_reg from "./components/common/food_reg";

import Food_Prof from "./components/common/food_profile";
import Badmin_Prof from "./components/common/vprofile";
import Buy_prof from "./components/common/bprofile";

import MakeOrder from "./components/common/user_order";
import Food_ProfB from "./components/common/food_profileB";
import My_orders from "./components/common/my_orders";

import View_orders from "./components/common/view_orders";

localStorage.setItem("Isuser", -1);
localStorage.setItem("Email", "");

const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
      </div>
    );
};

const LayoutB = () => {
    return (
      <div> 
        <NavbarB />
        <div className="container">
          <Outlet />
          </div>
      </div>
    );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* before anybody logs in */}
        <Route path="/" element={<Login />} />
        <Route path="User_r" element={<User_reg />} />
        <Route path="Badmin_r" element={<Badmin_reg />} />
        <Route path="whoareyou" element={<WhoAreYou />} />

         {/* badmin's layout and dashboard */}
        <Route path="/badmin" element={<Layout />}>
          <Route path="/badmin" element={<Home />} />
          <Route path="/badmin/Items" element={<FoodList />} />
          <Route path="/badmin/profile" element={<Badmin_Prof />} />
          <Route path="/badmin/add_item" element={<Food_reg />} />
          <Route path="/badmin/show" element={<Food_Prof />} />
          <Route path="/badmin/view_orders" element={<View_orders />} />
        </Route>

        {/* // user's layout and dashboard */}
        <Route path="/user" element={<LayoutB />}>
          <Route path="/user" element={<HomeB />} />
          <Route path="/user/users" element={<UsersList />} />
          <Route path="/user/profile" element={<Buy_prof />} />
          <Route path="/user/make_order" element={<MakeOrder />} />
          <Route path="/user/show" element={<Food_ProfB />} />
          <Route path="/user/my_orders" element={<My_orders />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
