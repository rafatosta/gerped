import React, { useEffect } from 'react';
import { addMonths, subMonths, setMonth, setYear, getYear, getMonth } from 'date-fns';
import { Dropdown } from 'flowbite-react';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  startYear: number;
  endYear: number;
}

export const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onDateChange, startYear, endYear }) => {

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    if (!isPrevDisabled) {
      onDateChange(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    if (!isNextDisabled) {
      onDateChange(newDate);
    }
  };

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

  /* useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentDate]); */

  return (
    <div className="flex justify-center items-center gap-4">
      <button
        onClick={handlePrevMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
        disabled={isPrevDisabled}
      >
        <MdNavigateBefore />
      </button>
      <div className="flex items-center space-x-2">
        <Dropdown label=""
          renderTrigger={() =>
            <span className='font-semibold text-lg cursor-pointer'>
              {months[getMonth(currentDate)]}
            </span>
          }
        >
          {months.map((month, index) => (
            <Dropdown.Item key={index} onClick={() => handleMonthChange(index)}>
              {month}
            </Dropdown.Item>
          ))}
        </Dropdown>
        <Dropdown label=""
          renderTrigger={() =>
            <span className='font-semibold text-lg cursor-pointer'>
              {getYear(currentDate).toString()}
            </span>}
        >
          {years.map((year) => (
            <Dropdown.Item key={year} onClick={() => handleYearChange(year)}>
              {year}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      <button
        onClick={handleNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
        disabled={isNextDisabled}
      >
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default CalendarHeader;
