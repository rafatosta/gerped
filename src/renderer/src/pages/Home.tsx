import React, { useState, useEffect } from 'react';
import Container from "@renderer/components/Container";
import OrdersCalendar from "@renderer/components/OrdersCalendar";

import Order from '@backend/models/Order';
import OrderIPC from '@renderer/ipc/OrderIPC';

const Home: React.FC = () => {

  const [orders, setOrders] = useState<Order[]>([]);
  const [count, setCount] = useState<number>(0);


  const fetchData = async () => {
    try {
      const res = await OrderIPC.findAllPeding();
      setOrders(res.data);
      setCount(res.count);

    } catch (err: unknown) {
      console.log(err);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Container>
      <div className="flex flex-row gap-x-4 overflow-auto h-full">
        <div className="w-full h-full">
          <OrdersCalendar orders={orders} />
        </div>
      </div>
    </Container >
  );
}

export default Home;
