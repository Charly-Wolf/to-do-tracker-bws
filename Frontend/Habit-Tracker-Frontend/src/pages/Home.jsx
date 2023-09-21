import HabitList from '../components/HabitList';
import PropTypes from "prop-types";

export default function Home({setCurrentPage}) {

  setCurrentPage("home");

  return <HabitList/>;
}

Home.propTypes = {
  setCurrentPage: PropTypes.func.isRequired
};