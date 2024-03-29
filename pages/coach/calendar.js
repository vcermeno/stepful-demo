import PastSlots from '../../components/PastSlots';
import AddAvailability from '../../components/AddAvailability';
import UpcomingSlots from '../../components/UpcomingSlots';
import styles from '../../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <AddAvailability />
            <br></br>
            <UpcomingSlots />
            <PastSlots />
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