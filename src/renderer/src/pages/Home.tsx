import React, { useState, useEffect } from 'react';
import Container from "@renderer/components/Container";
import Title from "@renderer/components/Title";
import CalendarHeader from "@renderer/components/CalendarHeader";
import Calendar from "@renderer/components/Calendar";
import { OrderStatus } from '@backend/enums/OrderStatus';

import Order from '@backend/models/Order';
import OrderIPC from '@renderer/ipc/OrderIPC';

const Home: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [firstOrderDate, setFirstOrderDate] = useState<Date | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [count, setCount] = useState<number>(0);
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear());
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());

  const fetchData = async () => {
    try {
      const res = await OrderIPC.findAll(undefined, undefined, OrderStatus.ATIVO);
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
      <Title disabled>Home Page</Title>
      {currentDate && (
        <>
          <CalendarHeader 
            currentDate={currentDate} 
            onDateChange={setCurrentDate} 
            startYear={startYear} 
            endYear={endYear} 
            goToFirstOrder={goToFirstOrder}
          />
          <Calendar currentDate={currentDate} firstOrderDate={firstOrderDate} orders={orders} />
        </>
      )}
    </Container>
  );
}

export default Home;
