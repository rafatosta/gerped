import React, { useState, useEffect } from 'react';
import Container from "@renderer/components/Container";
import Title from "@renderer/components/Title";
import CalendarHeader from "@renderer/components/CalendarHeader";
import Calendar from "@renderer/components/Calendar";
import Order from '@backend/models/Order';
import { OrderStatus } from '@backend/enums/OrderStatus';
import OrderIPC from '@renderer/ipc/OrderIPC';

const Home: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
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

    } catch (err: unknown) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Title disabled>Home Page</Title>
      <CalendarHeader 
        currentDate={currentDate} 
        onDateChange={setCurrentDate} 
        startYear={startYear} 
        endYear={endYear} 
      />
      <Calendar currentDate={currentDate} orders={orders} />
    </Container>
  );
}

export default Home;