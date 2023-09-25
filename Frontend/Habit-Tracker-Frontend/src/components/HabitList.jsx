import HabitBox from "../components/HabitBox"; //Muss noch für jedes Habit angezeigt werden.
import { Link } from "react-router-dom";
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

      {habitsError ? (
        <div className="alert alert-danger mt-3">{habitsError}</div>
      ) : (
        <div className="card-body">
        <div className="container mx-auto border p-5">
          <h5 className="card-title">Habit Liste</h5>
          {habits.length == 0 ? 
          
            <>
              <p className="card-text">
                Du hast noch keine Habits. Füge dein erstes Habit hinzu!
              </p>
              <a href="#" className="btn btn-primary">
                Habit hinzufügen
              </a>  
            </> : 
          <div className="container">
            {groupedHabits.map((group, groupIndex) => (
              <div className="row" key={groupIndex}>
                {group.map((habit, index) => (
                  // <div className="col" key={index} sm={4}>
                  <div className="col" key={index}>
                    <HabitBox
                      title={
                        habit.name
                      } /*description={habit.description} checked={habit.status}*/
                      />
                  </div>
                  ))}
                </div>
              ))}
            </div>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default HabitList;
