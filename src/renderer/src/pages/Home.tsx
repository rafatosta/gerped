import React, { useState, useEffect } from 'react';
import Container from "@renderer/components/Container";
import CalendarHeader from "@renderer/components/CalendarHeader";
import Calendar from "@renderer/components/Calendar";

import Order from '@backend/models/Order';
import OrderIPC from '@renderer/ipc/OrderIPC';
import Title from '@renderer/components/Title';

const Home: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date);
  const [firstOrderDate, setFirstOrderDate] = useState<Date | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [count, setCount] = useState<number>(0);
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear());
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());

  const fetchData = async () => {
    try {
      const res = await OrderIPC.findAllPeding();
      setOrders(res.data);
      setCount(res.count);

      const deliveryDates = res.data.map(order => new Date(order.deliveryDate));
      const minYear = Math.min(...deliveryDates.map(date => date.getFullYear()));
      const maxYear = Math.max(...deliveryDates.map(date => date.getFullYear()));

      setStartYear(minYear);
      setEndYear(maxYear);

      console.log(minYear, maxYear);
      console.log(res.data, res.count);

      if (res.data.length > 0) {
        const firstOrder = new Date(res.data[0].deliveryDate);
        setCurrentDate(firstOrder);
        setFirstOrderDate(firstOrder);
      } else {
        setCurrentDate(new Date());
      }

    } catch (err: unknown) {
      console.log(err);
    }
  };

  const goToFirstOrder = () => {
    if (orders.length > 0) {
      setCurrentDate(new Date(orders[0].deliveryDate));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const deliveryDates = orders.map(order => new Date(order.deliveryDate));
      const minYear = Math.min(...deliveryDates.map(date => date.getFullYear()));
      const maxYear = Math.max(...deliveryDates.map(date => date.getFullYear()));

      setStartYear(minYear);
      setEndYear(maxYear);
    }
  }, [orders]);

  return (
    <Container >
      {/* <div className="flex justify-between items-center gap-4">
        <Title disabled>Seus Pedidos</Title>
        <p className="text-gray-500 text-lg">{count} pedidos</p>
      </div> */}
      <div className='grid grid-cols-3 h-full gap-x-4'>
        <div>
          <CalendarHeader
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            startYear={startYear}
            endYear={endYear}
          />
        </div>
        <div className='col-span-2'>
          <Calendar currentDate={currentDate} firstOrderDate={firstOrderDate} orders={orders} goToFirstOrder={goToFirstOrder} />
        </div>

      </div>

    </Container>
  );
}

export default Home;
