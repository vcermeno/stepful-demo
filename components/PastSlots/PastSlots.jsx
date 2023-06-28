import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import axios from 'axios';
import useSWR from 'swr';
import WeekPagination from '../WeekPagination/WeekPagination';

const fetcher = url => axios.get(url).then(res => res.data);

/** Coaches should be able to review their past scores and notes for all of their calls */
const PastSlots = () => {
    const [week, setWeek] = useState({ start: new Date(), end: new Date() });
    const { data: slots, error } = useSWR(`/api/getSlots/past?start=${week.start.toISOString()}&end=${week.end.toISOString()}`, fetcher);

    const onNext = (startOfWeek, endOfWeek) => {
        setWeek({ start: startOfWeek, end: endOfWeek });
    }

    const handleNoteChange = async (event, slotId) => {
        const notes = event.target.value;
        // Update the notes for this slot in your API
        try {
            await axios.put(`/api/updateSlot?slotId=${slotId}`, { notes });
        } catch (err) {
            console.error(err);
        }
    }

    const handleSatisfactionChange = async (event, slotId) => {
        const satisfactionScore = event.target.value;
        // Update the satisfaction score for this slot in your API
        try {
            await axios.put(`/api/updateSlot?slotId=${slotId}`, { satisfactionScore });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1 className={styles.title}>Past</h1>
            <WeekPagination onNext={onNext} onPrev={onNext} disableFuture={true}>
                {slots?.map((slot, index) => (
                    <div key={index}>
                        <p>{new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}</p>
                        <p>{slot.studentName}</p>
                        <p>Notes:</p>
                        <textarea value={slot.notes} onChange={(event) => handleNoteChange(event, slot.id)} />
                        <p>Satisfaction Score: {slot.satisfactionScore}</p>
                        <input type="range" min="1" max="5" step="1" value={slot.satisfactionScore} onChange={(event) => handleSatisfactionChange(event, slot.id)} />
                    </div>
                ))}
            </WeekPagination>
        </>
    )
}

export default PastSlots
