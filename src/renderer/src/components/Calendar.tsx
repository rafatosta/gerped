import React from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns';

interface CalendarProps {
  currentDate: Date;
  orders: Order[];
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, orders }) => {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const getOrdersForDay = (day: Date) => {
    return orders.filter(order => isSameDay(new Date(order.deliveryDate), day));
  };

  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map(day => (
        <div key={day.toISOString()} className="p-4 border rounded">
          <div className="font-semibold">{format(day, 'dd/MM/yyyy')}</div>
          <ul>
            {getOrdersForDay(day).map(order => (
              <li key={order.id} className="text-sm">
                {order.Client?.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
