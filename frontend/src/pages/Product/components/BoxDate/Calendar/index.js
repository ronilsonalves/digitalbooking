import { useState } from 'react';

import { CalendarDesktop } from './CalendarDesktop';
import { CalendarMobile } from './CalendarMobile';

export const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <CalendarDesktop onChange={onChange} startDate={startDate} endDate={endDate}/>
      <CalendarMobile onChange={onChange} startDate={startDate} endDate={endDate}/>
    </>
  )
};
