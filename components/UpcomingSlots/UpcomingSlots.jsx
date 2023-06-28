import axios from 'axios';
import styles from '../../styles/Home.module.css';
import { useState } from 'react'
import useSWR from 'swr';
import WeekPagination from '../WeekPagination/WeekPagination';

/** Coaches can view their own upcoming schedule. */
const UpcomingSlots = () => {
    const [week, setWeek] = useState({ start: new Date(), end: new Date() });
    const fetcher = url => axios.get(url).then(res => res.data)
    const { data: slots, error, isLoading } = useSWR('/api/getSlots/upcoming', fetcher)

    const onNext = (startOfWeek, endOfWeek) => {
        setWeek({ start: startOfWeek, end: endOfWeek });
    }

    return (
        <>
            <h1 className={styles.title}>Upcoming</h1>
            <WeekPagination onNext={onNext} onPrev={onNext} disablePast={true}>
                {isLoading && <div>Loading...</div>}
                {error && <div>Failed to load</div>}
                {slots && slots?.map(slot => (
                    <div key={slot.id}>
                        <p>{new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}</p>
                        <p>{slot.isBooked? `CURRENTLY BOOKED BY: ${slot.studentName}`: null}</p>
                    </div>
                ))}
            </WeekPagination>
        </>
    )
}

export default UpcomingSlots