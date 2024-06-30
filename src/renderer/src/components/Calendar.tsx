import React from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, startOfWeek, endOfWeek, addDays } from 'date-fns';
import Order from '@backend/models/Order';

import { ptBR } from "date-fns/locale";

interface CalendarProps {
  currentDate: Date;
  orders: Order[];
}

function classNames(...classes: string[] | any) {
  return classes.filter(Boolean).join(' ')
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, orders }) => {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const startDay = startOfWeek(start);
  const endDay = endOfWeek(end);

  const getOrdersForDay = (day: Date) => {
    return orders.filter(order => isSameDay(new Date(order.deliveryDate), day));
  };

  const renderDays = () => {
    const daysElements: JSX.Element[] = [];
    let day = startDay;
    while (day <= endDay) {
      daysElements.push(
        <div key={day.toISOString()}
          className={classNames("p-2 border-r border-b h-full flex flex-col",
            start.getMonth() != day.getMonth() ? "bg-gray-50" : ""
          )}
        >
          <div
            className="text-xs text-gray-800 font-semibold text-right"
          >
            {format(day, 'd')}
          </div>
          <ul className="mt-2 space-y-1 overflow-auto">
            {getOrdersForDay(day).map(order => (
              <li key={order.id} className="text-sm text-blue-500">
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
        <div key={i} className="text-center font-semibold h-fit">
          {format(addDays(startOfWeek(currentDate), i), 'EEEEEE', { locale: ptBR })}
        </div>
      );
    }
    return weekDaysElements;
  };

  return (
    <>
      <div className="grid grid-cols-7 gap-x-1">
        {renderWeekDays()}
      </div>
      <div className="flex-1 grid grid-cols-7 border-l border-t">
        {renderDays()}
      </div>
    </>

  );
};

export default Calendar;
