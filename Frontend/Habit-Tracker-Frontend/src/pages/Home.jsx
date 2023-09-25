import { useEffect } from 'react';
import HabitList from '../components/HabitList';
import PropTypes from "prop-types";

export default function Home({setCurrentPage}) {

  useEffect(() => {
    setCurrentPage("home");
  }, [setCurrentPage]); // Empty dependency array to run the effect once

  return <HabitList/>;
}

Home.propTypes = {
  setCurrentPage: PropTypes.func.isRequired
};