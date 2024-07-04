import React, { useState, useEffect } from 'react';
import Container from "@renderer/components/Container";
import OrdersCalendar from "@renderer/components/OrdersCalendar";
import Order from '@backend/models/Order';
import OrderIPC from '@renderer/ipc/OrderIPC';
import { classNames } from '@renderer/utils/classNames';
import TaskIPC from '@renderer/ipc/TaskIPC';

const Home: React.FC = () => {


  const [orders, setOrders] = useState<Order[]>([]);
  const [count, setCount] = useState<number>(0);

  const fetchTasks = async () => {
    const res = await TaskIPC.findAll()
    console.log(res);

  }

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
    fetchTasks()
  }, []);


  return (
    <Container>
      <div className={classNames("grid  h-full gap-6")}>
        <div className="col-span-3">
          <OrdersCalendar orders={orders} />
        </div>
      </div>
    </Container >
  );
}

export default Home;
