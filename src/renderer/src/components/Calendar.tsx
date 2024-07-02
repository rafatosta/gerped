
import { startOfMonth, endOfMonth, format, isSameDay, startOfWeek, endOfWeek, addDays, differenceInDays } from 'date-fns';
import Order from '@backend/models/Order';
import { ptBR } from "date-fns/locale";

interface CalendarProps {
  currentDate: Date;
  firstOrderDate: Date | null;
  orders: Order[];
}

function classNames(...classes: string[] | any) {
  return classes.filter(Boolean).join(' ')
}

const getEventClass = (deliveryDate: Date, firstOrderDate: Date): string => {
  const diffDays = differenceInDays(deliveryDate, firstOrderDate);

  if (diffDays <= 7) {
    return "border-red-200 text-red-800 bg-red-100";
  } else if (diffDays <= 14) {
    return "border-yellow-200 text-yellow-800 bg-yellow-100";
  } else if (diffDays <= 30) {
    return "border-green-200 text-green-800 bg-green-100";
  } else {
    return "border-blue-200 text-blue-800 bg-blue-100";
  }
};



function Calendar({ currentDate, firstOrderDate, orders }: CalendarProps) {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  //const days = eachDayOfInterval({ start, end });

  const startDay = startOfWeek(start);
  const endDay = endOfWeek(end);

  const getOrdersForDay = (day: Date) => {
    return orders.filter(order => isSameDay(new Date(order.deliveryDate), day));
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
            classNames(`p-2 border-r border-b h-full flex flex-col`,
              isFirstOrderDay ? 'bg-red-200' : '',
              start.getMonth() != day.getMonth() ? "bg-gray-100" : ""
            )}
        >
          <div className="text-xs text-gray-800 font-semibold text-left">
            {format(day, 'd')}
            {format(day, 'd') == '1' && <span> {format(day, 'MMM', { locale: ptBR })}</span>}
          </div>
          <ul className="mt-2 space-y-1 overflow-auto">
            {getOrdersForDay(day).map(order => (
              <li key={order.id}
                className={
                  classNames("px-2 py-1 rounded-lg mt-1 overflow-hidden border",
                    eventClass
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

  return (
    <div className='flex flex-col h-full'>
      <div className='flex justify-between items-center'>
        <p className='font-bold text-blue-600 text-xl'>{format(currentDate, 'MMMM', { locale: ptBR })}</p>
        <p className='font-bold text-gray-600 text-xl'>{format(currentDate, 'yyyy')}</p>
      </div>
      <div className="grid grid-cols-7">
        {renderWeekDays()}
      </div>
      <div className="flex-1 grid grid-cols-7 border-l border-t">
        {renderDays()}
      </div>
    </div>

  );
};

export default Calendar;
