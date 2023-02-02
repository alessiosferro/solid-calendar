import {Component, createEffect, createSignal, For, JSX, on} from "solid-js";
import './Calendar.scss';
import dayjs from "dayjs";

const Calendar: Component = () => {
  const weekdays = Array.from({ length: 7 }, (_, index) => dayjs().set('day', index + 1).format('dd').toUpperCase().charAt(0))
  const weeks = Array.from({ length: 6 }, (_, i) => i);
  const days = Array.from({ length: 7 }, (_, i) => i);

  const [selectedMonth, setSelectedMonth] = createSignal<number>(dayjs().get('month'));
  const [selectedDay, setSelectedDay] = createSignal<dayjs.Dayjs>(null);

  const changeMonthHandler: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
    setSelectedMonth(+event.currentTarget.value);
  }

  createEffect(() => {
    console.log(selectedDay()?.format());
  });

  return (
    <div class="solid-calendar">
      <select onChange={changeMonthHandler} value={selectedMonth()}>
        <For each={dayjs.months()}>
          {(month, index) => <option value={index()}>{month}</option>}
        </For>
      </select>
      <div class="solid-calendar__month">
        <For each={weekdays}>
          {weekday => <div class="solid-calendar__header-day">{weekday}</div>}
        </For>
        <For each={weeks}>
          {(week) => <For each={days}>
            {day => {
              const calculatedDay = (day + 1) + (week * 7);

              return <button class="solid-calendar__day"
                             onClick={() => setSelectedDay(dayjs().set('day', calculatedDay))}
                             type="button"
                             classList={{
                               "solid-calendar__day--today": dayjs().set('day', calculatedDay).isToday(),
                             }}
              >{dayjs().set('month', selectedMonth()).set('day', calculatedDay).get('date')}</button>
            }}
          </For>}
        </For>
      </div>
    </div>
  );
}

export default Calendar;
