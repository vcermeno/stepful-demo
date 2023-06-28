import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Home.module.css';

const AddAvailability = () => {
    const initialTime = new Date();
    const initialEndTime = new Date(initialTime.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours to initial time

    const [slotStartTime, setSlotStartTime] = useState(initialTime);
    const [slotEndTime, setSlotEndTime] = useState(initialEndTime);

    const onChange = (e) => {
        const inputDate = e.target.value; // Get the value from the input
        const selectedDate = new Date(inputDate); // Create a date object from the input value
      
        // Check if the selected date is valid
        if (!isNaN(selectedDate.getTime())) {
          // Create new date object for slotEndTime
          const endSlotTime = new Date(selectedDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours to the selected date
      
          setSlotStartTime(selectedDate);
          setSlotEndTime(endSlotTime);
        }
      };

      const addSlot = () => {
        axios
          .put('/api/addSlot',
            {
              startTime: slotStartTime,
              endTime: slotEndTime,
              coachId: '2',
              coachName: 'Coach 1',
            })
          .then((res) => {
            console.log(res.data);
            window.location.reload(); // Refresh the page
          })
          .catch((e) => {
            console.error(e);
          });
      };

    return (
        <div>
            <h1 className={styles.title}>Add Availability</h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <input type="datetime-local" value={slotStartTime?.toISOString().substring(0, 16)} onChange={onChange} />
                <input type="datetime-local" value={slotEndTime?.toISOString().substring(0, 16)} readOnly />
            </div>
            <button onClick={addSlot}>Add Slot</button>
        </div>
    )
}

export default AddAvailability;