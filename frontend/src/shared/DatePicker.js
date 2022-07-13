import { useRef } from "react";
import "./DatePicker.css"
const DatePicker = ({ onDateChange, defaultDate }) => {
  const dateInputRef = useRef(null);
  const makeItTodaysDate = () => {
    dateInputRef.current.value = new Date().toLocaleDateString('en-CA');
  }
  return (
    <section className="datePicker">
      <input type="date"
        value={defaultDate}
        ref={dateInputRef}
        onChange={(e) => onDateChange(e.target.value)} />
      <button onClick={makeItTodaysDate}>today</button>
    </section>
  )
}

export default DatePicker;