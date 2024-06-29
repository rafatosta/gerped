import React from 'react';
import { format, addMonths, subMonths, setMonth, setYear, getYear, getMonth } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  startYear: number;
  endYear: number;
}

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onDateChange, startYear, endYear }) => {
  const handlePrevMonth = () => onDateChange(subMonths(currentDate, 1));
  const handleNextMonth = () => onDateChange(addMonths(currentDate, 1));
  const handleToday = () => onDateChange(new Date());

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = setMonth(currentDate, parseInt(event.target.value));
    onDateChange(newDate);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = setYear(currentDate, parseInt(event.target.value));
    onDateChange(newDate);
  };

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const isPrevDisabled = getYear(currentDate) === startYear && getMonth(currentDate) === 0;
  const isNextDisabled = getYear(currentDate) === endYear && getMonth(currentDate) === 11;

  return (
    <div className="flex justify-between items-center py-4">
      <button 
        onClick={handlePrevMonth} 
        className="px-4 py-2 bg-gray-200 rounded" 
        disabled={isPrevDisabled}
      >
        {'<'}
      </button>
      <div className="flex items-center space-x-2">
        <select
          value={currentDate.getMonth()}
          onChange={handleMonthChange}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={currentDate.getFullYear()}
          onChange={handleYearChange}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button 
        onClick={handleNextMonth} 
        className="px-4 py-2 bg-gray-200 rounded" 
        disabled={isNextDisabled}
      >
        {'>'}
      </button>
      <button onClick={handleToday} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
        Hoje
      </button>
    </div>
  );
};

export default CalendarHeader;
