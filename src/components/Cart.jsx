import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";

function Orders() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/orders/${user.email}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      console.log(response.data);

      setOrders(response.data.orders || []);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div>
      <h1>My Orders</h1>

      {Array.isArray(orders) &&
        orders.map((order) => (
          <div key={order._id}>
            <h3>Order Id: {order.orderDate}</h3>

            <ol>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.name}-{item.price}-{item.quantity}-
                  {item.price * item.quantity}
                </li>
              ))}
            </ol>

            <h3>Order Value: {order.orderValue}</h3>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default Orders;