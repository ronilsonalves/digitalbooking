import DatePicker from 'react-datepicker';
import ptBr from 'date-fns/locale/pt-BR';

import styled from './styles.module.scss';

export function CalendarMobile({onChange, startDate, endDate}) {
  return (
    <div className={styled.container}>
      <DatePicker
        calendarClassName={styled.calendar}
        startDate={startDate}
        endDate={endDate}
        monthsShown={1}
        minDate={new Date()}
        locale={ptBr}
        onChange={onChange}
        formatWeekDay={nameOfDay => nameOfDay.substring(0,1)} 
        dateFormatCalendar="LLLL"
        selectsRange
        inline
        disabledKeyboardNavigation // impedi q a data selecioanda fique selecionada nos outros meses
        // shouldCloseOnSelect={false} impedi o fechamento do calendario quando as datas são selecionadas
      />
    </div>
  );
}