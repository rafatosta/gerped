import React, { useEffect } from 'react';
import { format, addMonths, subMonths, setMonth, setYear, getYear, getMonth } from 'date-fns';
import { Dropdown } from 'flowbite-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  startYear: number;
  endYear: number;
  goToFirstOrder: () => void;
}

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onDateChange, startYear, endYear, goToFirstOrder }) => {
  const handlePrevMonth = () => onDateChange(subMonths(currentDate, 1));
  const handleNextMonth = () => onDateChange(addMonths(currentDate, 1));

  const handleMonthChange = (month: number) => {
    const newDate = setMonth(currentDate, month);
    onDateChange(newDate);
  };

  const handleYearChange = (year: number) => {
    const newDate = setYear(currentDate, year);
    onDateChange(newDate);
  };

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const isPrevDisabled = getYear(currentDate) === startYear && getMonth(currentDate) === 0;
  const isNextDisabled = getYear(currentDate) === endYear && getMonth(currentDate) === 11;

  const handleScroll = (event: WheelEvent) => {
    if (event.deltaY < 0) {
      handlePrevMonth();
    } else if (event.deltaY > 0) {
      handleNextMonth();
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentDate]);

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
        <Dropdown label={months[getMonth(currentDate)]} className="px-2 py-1 bg-gray-200 rounded">
          {months.map((month, index) => (
            <Dropdown.Item key={index} onClick={() => handleMonthChange(index)}>
              {month}
            </Dropdown.Item>
          ))}
        </Dropdown>
        <Dropdown label={getYear(currentDate).toString()} className="px-2 py-1 bg-gray-200 rounded">
          {years.map((year) => (
            <Dropdown.Item key={year} onClick={() => handleYearChange(year)}>
              {year}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      <button 
        onClick={handleNextMonth} 
        className="px-4 py-2 bg-gray-200 rounded" 
        disabled={isNextDisabled}
      >
        {'>'}
      </button>
      <button onClick={goToFirstOrder} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
        Primeira Ordem
      </button>
    </div>
  );
};

export default CalendarHeader;
