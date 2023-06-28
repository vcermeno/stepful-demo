import { useState, useEffect } from 'react'
import styles from '../../styles/Home.module.css';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data)

const getStartOfWeek = date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6:1);
    return new Date(d.setDate(diff));
}

const getEndOfWeek = date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6:1); 
    return new Date(d.setDate(diff + 6));
}

export default function Home() {
  const [startOfWeek, setStartOfWeek] = useState(getStartOfWeek(new Date()))
  const [endOfWeek, setEndOfWeek] = useState(getEndOfWeek(new Date()))
  const [slots, setSlots] = useState([])

  const { data: fetchedSlots, error, isLoading } = useSWR(`/api/getSlots/upcoming?isBooked=false`, fetcher)

  useEffect(() => {
    if(fetchedSlots) {
      setSlots(fetchedSlots);
    }
  }, [fetchedSlots])

  const bookSlot = async (slotId) => {
    try {
      // optimtistic response
      setSlots(prevSlots => prevSlots?.filter(slot => slot.id !== slotId));
      await axios.post('/api/bookSlot', { slotId, studentId: '1', studentName: 'Student 1' });
    } catch (e) {
      console.error(e);
    }
  }

  const getNextSlots = () => {
    const newStartOfWeek = new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
    const newEndOfWeek = new Date(endOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
    setStartOfWeek(newStartOfWeek);
    setEndOfWeek(newEndOfWeek);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Schedule Time With Coach</h1>
      <p>Week of {startOfWeek.toDateString()} - {endOfWeek.toDateString()} </p>
      {slots.map(slot => (
        <div key={slot.id}>
          <p>{new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}</p>
          <p>{slot.coachName}</p>
          <button onClick={() => bookSlot(slot.id)}>Book time</button>
        </div>
      ))}
      <button onClick={getNextSlots}>Next Week</button>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}