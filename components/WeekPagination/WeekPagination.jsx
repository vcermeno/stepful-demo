import { useState, useEffect } from 'react';

const WeekPagination = ({ onNext, onPrev, children, disablePast, disableFuture }) => {
    const [startOfWeek, setStartOfWeek] = useState(new Date())
    const [endOfWeek, setEndOfWeek] = useState(new Date())

    useEffect(() => {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        
        const endOfWeek = new Date();
        endOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay() + 6);

        setStartOfWeek(startOfWeek);
        setEndOfWeek(endOfWeek);
    }, []);

    const getNextSlots = () => {
        // make request for next slots
        const newStartOfWeek = new Date(startOfWeek);
        newStartOfWeek.setDate(newStartOfWeek.getDate() + 7);

        const newEndOfWeek = new Date(endOfWeek);
        newEndOfWeek.setDate(newEndOfWeek.getDate() + 7);

        setStartOfWeek(newStartOfWeek);
        setEndOfWeek(newEndOfWeek);
        
        onNext(newStartOfWeek, newEndOfWeek);
    }

    const getPrevSlots = () => {
        // make request for previous slots
        const newStartOfWeek = new Date(startOfWeek);
        newStartOfWeek.setDate(newStartOfWeek.getDate() - 7);

        const newEndOfWeek = new Date(endOfWeek);
        newEndOfWeek.setDate(newEndOfWeek.getDate() - 7);

        setStartOfWeek(newStartOfWeek);
        setEndOfWeek(newEndOfWeek);

        onPrev(newStartOfWeek, newEndOfWeek);
    }

    const today = new Date();
    const currentWeekStart = new Date();
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
    const isPastWeek = startOfWeek < currentWeekStart;
    const isCurrentWeek = !isPastWeek && startOfWeek.getDate() === currentWeekStart.getDate();
    const isFutureWeek = startOfWeek > currentWeekStart;

    return (
        <>
            <p>Week of {startOfWeek.toDateString()} - {endOfWeek.toDateString()}</p>
            {children}
            {!disablePast || isFutureWeek ? <button onClick={getPrevSlots}>Previous Week</button> : null}
            {!disableFuture || isCurrentWeek ? <button onClick={getNextSlots}>Next Week</button> : null}
        </>
    )
}

export default WeekPagination;