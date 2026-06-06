import React, { useContext, useState } from "react";
import { ShoppingCart, Package, Wallet, MapPin, User, LogOut } from "lucide-react";
import WalletDetails from "../components/WalletDetails";
import UserDetail from "../components/UserDetail";
import OrderDetail from "../components/OrderDetail";
import { useAuth } from "../contents/AuthContext";

const UserDashBoared = () => {

  const { navigate, user, logOut } = useAuth();

  const menuItems = [
    { icon: User, label: "Account Details", active: true },
    { icon: Package, label: "Orders" },
    { icon: Wallet, label: "Wallet" },
    { icon: ShoppingCart, label: "Cart" },
    { icon: LogOut, label: "Log Out" },
  ];

  const [activeTab, setActiveTab] = useState('Account Details');

  const RenderDetailView = () => {
    switch(activeTab){
      case "Account Details":
        return <UserDetail />
      case "Orders":
        return <OrderDetail />
      case "Wallet":
        return <WalletDetails />
      default:
        return <AccountDetail />
    }
  }

  return (
    <div className="block md:flex gap-6">

      {/* Sidebar */}
      <div className="w-[100vh] md:w-[30vh] max-h-[70vh] my-4 shadow-2xl rounded-2xl">
        {/* Profile */}
        <div className="flex items-center justify-center flex-col py-2">
          <img
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // src={user.profilePicture}
            alt={user.name}
            className="rounded-full w-50 h-50 object-cover"
          />
          <h2 className="text-gray-800 font-extrabold">{user.name}</h2>
          <h3 className="text-xs text-gray-500">{user.email}</h3>
        </div>

        {/* Items */}
        <div className="px-6 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                onClick={() => {
                  if (item.label === "Cart") {
                    navigate('/cart')
                  } else if (item.label === "Log Out"){
                    // alert("Log Out");
                    logOut();
                  } else {
                    setActiveTab(item.label);
                  }
                }}
                className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer transition-colors
          ${
            item.label === activeTab
              ? "text-indigo-500 font-medium"
              : "text-gray-600 hover:bg-gray-100"
          }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 my-4 shadow-2xl rounded-2xl bg-white">
        <RenderDetailView />
      </div>
    </div>
  );
};

export default UserDashBoared;
