import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ptBr from 'date-fns/locale/pt-BR';

export function Calendar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [monthsShown, setMonthShow] = useState(2);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  
  useEffect(() => {
  }, [monthsShown]);

  window.addEventListener("resize", (e) => {
    if((e.currentTarget.innerWidth < 581) && (monthsShown === 2)){
      setMonthShow(1);
    }
      
    if((e.currentTarget.innerWidth > 580) && (monthsShown === 1)){
      setMonthShow(2)
    }
  });

  return (
    <DatePicker
      className={` w-100 rounded px-2`}
      startDate={startDate}
      endDate={endDate}
      monthsShown={monthsShown}
      minDate={new Date()}
      locale={ptBr}
      onChange={onChange}
      placeholderText="Retirada - Devolução"
      dateFormat="dd/MM/yyyy"
      formatWeekDay={nameOfDay => nameOfDay.substring(0,1)} 
      dateFormatCalendar="LLLL"
      selectsRange
      disabledKeyboardNavigation // impedi q a data selecioanda fique selecionada nos outros meses
      // shouldCloseOnSelect={false} impedi o fechamento do calendario quando as datas são selecionadas
    />
  );
}