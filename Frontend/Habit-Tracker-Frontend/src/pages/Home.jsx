import Footer from "../components/Footer";
import HabitList from '../components/HabitList';
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import DailyMsg from "../components/DailyMsg";
// import NavBarUnten from '../components/NavBarUnten';
// import { useEffect, useState } from "react";

export default function Home() {
  // function FetchData() {
  //     const [records, setRecords] = useState([])

  //     useEffect(() => {
  //         fetch('http://127.0.0.1:5000/habits')
  //             .then(response => response.json())
  //             .then(data => setRecords({ data }))
  //             .catch(err => console.log(err))
  //     }, [])
  // }
  return (
    <>
      <NavBar />
      {/* <NavBarUnten /> */}
      <HabitList/>
      <Footer />
    </>
  );
}
