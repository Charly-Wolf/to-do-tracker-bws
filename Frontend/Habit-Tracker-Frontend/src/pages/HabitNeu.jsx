import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Newsletter from '../components/Newsletter';
import DailyMsg from '../components/DailyMsg';
import InfoComp from '../components/InfoComp';
import Home from '../pages/Home.jsx'
export default function HabitNeu() {
    return (
        <>
            <NavBar/>
            {/* IF HABITS EXISTING SHOW HOME IN BACKGROUND,
            OTHERWISE KEEP SCREEN BLANK */}
            {/* <Home/> */}
            <br/>
            <br/>
            <p>Habit Neu sollte modal sein!</p>
        </>
    );
};