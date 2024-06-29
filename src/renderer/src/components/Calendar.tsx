import React from 'react';

interface CalendarProps {
  currentDate: Date;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate }) => {
  return (
    <div className="mt-4">
      {/* Renderização do calendário aqui */}
      <p>{currentDate.toDateString()}</p>
    </div>
  );
};

export default Calendar;
