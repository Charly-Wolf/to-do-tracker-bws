import HabitBox from "../components/HabitBox"; //Muss noch für jedes Habit angezeigt werden.
import { useState, useEffect } from "react";
import axios from "axios";
import SubNavBar from "./SubNavBar";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Connection with the Backend
});

function HabitList() {
  const [habits, setHabits] = useState([]);
  const [habitsError, setHabitsError] = useState("");

  // Teilt die habits in Gruppen von drei auf
  // const test = "test";
  let groupedHabits = [];
  for (let i = 0; i < habits.length; i += 3) {
    groupedHabits.push(habits.slice(i, i + 3));
  }
  // console.log(test)
  // console.log(groupedHabits)

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        await client.get("api/habits").then((response) => {
          setHabits(response.data);
        });
      } catch (err) {
        setHabitsError(err.response.data.message);
      }
    };
    fetchHabits();
  }, []);

  return (
    <div className="card text-center">
      <SubNavBar />
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills nav-light bg-white">
          <li className="nav-item ms-auto">
            <Link className="nav-link active" to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-card-list"
                viewBox="0 0 16 16"
              >
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"></path>
                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
              </svg>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" aria-current="true" to="/stats">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bar-chart"
                viewBox="0 0 16 16"
              >
                <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
              </svg>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/stats">
              <i className="bi bi-plus-circle-fill"></i>
            </Link>
          </li>
        </ul>
      </div>

      {habitsError ? (
        <div className="alert alert-danger mt-3">{habitsError}</div>
      ) : (
        <div className="card-body">
          <div className="container mx-auto border p-5">
            <h5 className="card-title">Habit Liste</h5>
            {habits.length == 0 ? (
              <>
                <p className="card-text">
                  Du hast noch keine Habits. Füge dein erstes Habit hinzu!
                </p>
                <a href="#" className="btn btn-primary">
                  Habit hinzufügen
                </a>
              </>
            ) : (
              <div className="container">
                {groupedHabits.map((group, groupIndex) => (
                  <div className="row" key={groupIndex}>
                    {group.map((habit, index) => (
                      // <div className="col" key={index} sm={4}>
                      <div className="col" key={index}>
{console.log(habit)}
                        <HabitBox
                          id={habit.habit_id}
                          title={habit.name}
                          //description={habit.description}
                          isDone={habit.status}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default HabitList;

// HabitList.propTypes = {
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
// };



