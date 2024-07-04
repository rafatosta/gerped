import React, { useState, useEffect } from 'react';
import Container from "@renderer/components/Container";
import OrdersCalendar from "@renderer/components/OrdersCalendar";
import Order from '@backend/models/Order';
import OrderIPC from '@renderer/ipc/OrderIPC';
import { classNames } from '@renderer/utils/classNames';
import TaskIPC from '@renderer/ipc/TaskIPC';
import Task from '@backend/models/Task';
import TasksList from '@renderer/components/TasksList';


const Home: React.FC = () => {


  const [orders, setOrders] = useState<Order[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchData = async () => {
    try {
      const ordersData = await OrderIPC.findAllPeding();
      const tasksData = await TaskIPC.findAll()

      console.log(tasksData);

      setOrders(ordersData.data);
      setTasks(tasksData)

    } catch (err: unknown) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Container>
      <div className={classNames("grid sm:grid-cols-3 h-full gap-6 ")}>
        <div className="col-span-2">
          <OrdersCalendar orders={orders} />
        </div>
        <div className="col-span-1 overflow-auto">
          < TasksList tasks={tasks} />
        </div>
      </div>
    </Container >
  );
}

export default Home;
