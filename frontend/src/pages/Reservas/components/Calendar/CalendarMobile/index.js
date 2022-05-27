import DatePicker from 'react-datepicker';
import ptBr from 'date-fns/locale/pt-BR';

import styled from "./styles.module.scss";

export const CalendarMobile = ({ Controller, control, setDatasLocacao }) => {
 
  return (
    <div className={styled.container}>
      <Controller
        control={control}
        name="datas"
        className="d-flex flex-column"
        render={({ field: { onChange, value, name, ref } }) => (
          <DatePicker
            calendarClassName={styled.calendar_mobile}
            startDate={value && value[0]}
            endDate={value && value[1]}
            monthsShown={1}
            minDate={new Date()}
            locale={ptBr}
            onChange={data => {
              onChange(data)
              setDatasLocacao(data)
            }}
            formatWeekDay={nameOfDay => nameOfDay.substring(0,1)}
            dateFormatCalendar="LLLL"
            selectsRange
            inline
            disabledKeyboardNavigation // impedi q a data selecioanda fique selecionada nos outros meses
            // shouldCloseOnSelect={false} impedi o fechamento do calendario quando as datas são selecionadas
          />
        )}
      />
    </div>
  );
};


