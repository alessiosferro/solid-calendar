/* @refresh reload */
import { render } from 'solid-js/web';
import dayjs from "dayjs";
import Calendar from "./Calendar";
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/it';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale(navigator.language);
dayjs.extend(isToday)

render(() => <Calendar />, document.getElementById('root') as HTMLElement);
