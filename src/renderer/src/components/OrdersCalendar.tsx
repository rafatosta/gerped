
import { startOfMonth, endOfMonth, format, isSameDay, startOfWeek, endOfWeek, addDays, differenceInDays, startOfToday } from 'date-fns';

import Order from '@backend/models/Order';
import { ptBR } from "date-fns/locale";
import CalendarHeader from './CalendarHeader';
import { useEffect, useRef, useState } from 'react';
import { classNames } from '@renderer/utils/classNames';

interface CalendarProps {
  orders: Order[];
}

const getEventClass = (deliveryDate: Date, firstOrderDate: Date): string => {
  const diffDays = differenceInDays(deliveryDate, firstOrderDate);

  // Marcar pedidos atrasados
  if (differenceInDays(startOfToday(), deliveryDate) > 0) {
    return "border-red-200 text-gray-100 font-semibold bg-red-600";
  }

  if (diffDays <= 7) {
    return "border-purple-200 text-purple-800 bg-purple-100";
  } else if (diffDays <= 14) {
    return "border-yellow-200 text-yellow-800 bg-yellow-100";
  } else if (diffDays <= 30) {
    return "border-green-200 text-green-800 bg-green-100";
  } else {
    return "border-blue-200 text-blue-800 bg-blue-100";
  }
};

function Calendar({ orders }: CalendarProps) {

  const scrollRef = useRef<HTMLDivElement>(null);


  const [currentDate, setCurrentDate] = useState<Date>(new Date);
  const [firstOrderDate, setFirstOrderDate] = useState<Date | null>(null);
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear());
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);

  const startDay = startOfWeek(start);
  const endDay = endOfWeek(end);

  const getOrdersForDay = (day: Date) => {
    return orders.filter(order => isSameDay(new Date(order.deliveryDate), day));
  };

  const goToFirstOrder = () => {
    if (orders.length > 0) {
      setCurrentDate(new Date(orders[0].deliveryDate));
    }
  };

  const renderDays = () => {
    const daysElements: JSX.Element[] = [];
    let day = startDay;
    while (day <= endDay) {
      const isFirstOrderDay = firstOrderDate && isSameDay(day, firstOrderDate);
      const dayOrders = getOrdersForDay(day);
      const eventClass = dayOrders.length > 0 && firstOrderDate ? getEventClass(dayOrders[0].deliveryDate, firstOrderDate) : '';

      daysElements.push(
        <div
          key={day.toISOString()}
          className={
            classNames(`p-1 border-r border-b flex flex-col`,
              start.getMonth() != day.getMonth() ? "bg-gray-100 opacity-50 grayscale-[50%]" : "",
              isFirstOrderDay ? 'border bg-red-50 border-red-500' : '',
              startOfToday().toString() == day.toString() ? 'border border-blue-500 bg-blue-50' : '',
            )}
        >
          <div className='flex justify-between items-center'>
            <div className={classNames("text-xs p-1 font-semibold text-left",
            )}
            >
              {format(day, 'd')}
              {format(day, 'd') == '1' && <span> {format(day, 'MMM', { locale: ptBR })}</span>}
            </div>
            {startOfToday().toString() == day.toString() ?
              <p className='text-gray-600 text-sm font-semibold'>Hoje</p> : ""}
          </div>


          <ul className=" space-y-1 overflow-auto">
            {getOrdersForDay(day).map(order => (
              <li key={order.id}
                className={
                  classNames("p-1 text-nowrap md:text-sm rounded-lg mt-1 overflow-hidden border truncate",
                    eventClass,
                  )}
              >

                {order.Client?.name}


              </li>
            ))}
          </ul>
        </div>
      );
      day = addDays(day, 1);
    }
    return daysElements;
  };

  const renderWeekDays = () => {
    const weekDaysElements: JSX.Element[] = [];
    for (let i = 0; i < 7; i++) {
      weekDaysElements.push(
        <div key={i} className="p-2 text-start font-semibold h-fit text-sm text-gray-500">
          {format(addDays(startOfWeek(currentDate), i), 'EEEEEE', { locale: ptBR }).toUpperCase()}
        </div>
      );
    }
    return weekDaysElements;
  };


  useEffect(() => {

    const deliveryDates = orders.map(order => new Date(order.deliveryDate));
    const minYear = Math.min(...deliveryDates.map(date => date.getFullYear()));
    const maxYear = Math.max(...deliveryDates.map(date => date.getFullYear()));

    setStartYear(minYear);
    setEndYear(maxYear);

    if (orders.length > 0) {
      const firstOrder = new Date(orders[0].deliveryDate);
      setCurrentDate(firstOrder);
      setFirstOrderDate(firstOrder);
    } else {
      setCurrentDate(new Date());
    }
  }, [orders]);


  return (
    <div

      className='flex flex-col h-full'
    >
      <CalendarHeader
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        startYear={startYear}
        endYear={endYear}
        goToFirstOrder={goToFirstOrder}
        scrollRef={scrollRef}
      />
      <div className="grid grid-cols-7">
        {renderWeekDays()}
      </div>
      <div
        ref={scrollRef}
        className="flex-1 grid grid-cols-7 border-l border-t">
        {renderDays()}
      </div>
    </div>

  );
};

export default Calendar;
