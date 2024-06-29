import React from 'react';
import { format, addMonths, subMonths } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onDateChange }) => {
  const handlePrevMonth = () => onDateChange(subMonths(currentDate, 1));
  const handleNextMonth = () => onDateChange(addMonths(currentDate, 1));
  const handleToday = () => onDateChange(new Date());

  return (
    <div className="flex justify-between items-center py-4">
      <button onClick={handlePrevMonth} className="px-4 py-2 bg-gray-200 rounded">
        {'<'}
      </button>
      <div className="text-lg font-semibold">
        {format(currentDate, 'MMMM yyyy')}
      </div>
      <button onClick={handleNextMonth} className="px-4 py-2 bg-gray-200 rounded">
        {'>'}
      </button>
      <button onClick={handleToday} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
        Hoje
      </button>
    </div>
  );
};

export default CalendarHeader;
