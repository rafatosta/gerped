import React from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, startOfWeek, endOfWeek, addDays } from 'date-fns';

interface CalendarProps {
  currentDate: Date;
  orders: Order[];
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
        <div key={day.toISOString()} className="p-2 border rounded h-full flex flex-col">
          <div className="font-semibold text-right">{format(day, 'd')}</div>
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
        <div key={i} className="p-2 bg-gray-200 text-center font-semibold">
          {format(addDays(startOfWeek(currentDate), i), 'EEEE')}
        </div>
      );
    }
    return weekDaysElements;
  };

  return (
    <div className="flex-1 grid grid-cols-7 gap-1">
      {renderWeekDays()}
      {renderDays()}
    </div>
  );
};

export default Calendar;
