import React, { useState, useEffect } from 'react';
import Container from "@renderer/components/Container";
import OrdersCalendar from "@renderer/components/OrdersCalendar";
import { Timeline } from "flowbite-react";

import Order from '@backend/models/Order';
import OrderIPC from '@renderer/ipc/OrderIPC';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { classNames } from '@renderer/utils/classNames';

const Home: React.FC = () => {

  const [orders, setOrders] = useState<Order[]>([]);
  const [count, setCount] = useState<number>(0);

  const [delayedOrders, setDelayedOrders] = useState<Order[]>([]);


  const fetchData = async () => {
    try {
      const res = await OrderIPC.findAllPeding();
      setOrders(res.data);
      setCount(res.count);


      const today = new Date();
      const filtered = res.data.filter(order => new Date(order.deliveryDate) < today);
      setDelayedOrders(filtered);

    } catch (err: unknown) {
      console.log(err);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Container>
      <div className={classNames("grid  h-full gap-6",
        delayedOrders.length > 0 ? "grid-cols-4" : ""
      )}>
        <div className="col-span-3">
          <OrdersCalendar orders={orders} />
        </div>

        {delayedOrders.length > 0 ? (
          <div className='flex flex-col gap-4  overflow-auto'>
            <p className='font-bold text-lg'>Pedidos atrasados:</p>
            <div className='px-1 overflow-y-scroll'>
              <Timeline>
                {delayedOrders.map((o) => (
                  <Timeline.Item>
                    <Timeline.Point />
                    <Timeline.Content>
                      <Timeline.Time>{format(o.deliveryDate, "dd-MM-yy", { locale: ptBR })}</Timeline.Time>
                      <Timeline.Title>
                        <Link to={`/orders/${o.id}`}
                          className='hover:text-cyan-600 hover:underline'
                        >
                          {o.theme}
                        </Link>

                      </Timeline.Title>
                      <Timeline.Body>
                        <p>Cliente: {o.Client.name}</p>
                        <p>Serviço: {o.Service.description}</p>
                      </Timeline.Body>
                    </Timeline.Content>
                  </Timeline.Item>
                ))
                }
              </Timeline>
            </div></div>
        ) : ""}

      </div>
    </Container >
  );
}

export default Home;
