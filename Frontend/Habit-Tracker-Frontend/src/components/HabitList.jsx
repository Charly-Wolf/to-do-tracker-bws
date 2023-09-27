// Authors: Mahir Dzafic, Carlos Paredes & Marius Schröder

import HabitBox from "../components/HabitBox"; //Muss noch für jedes Habit angezeigt werden.
import { useState, useEffect } from "react";
import axios from "axios";
import SubNavBar from "./SubNavBar";
import "../assets/css/habitListStyles.css"

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Connection with the Backend
});

function sortHabitsByStatusAndName(habits) {
  // Author: Carlos Paredes
  // Sort the habits array by status (ascending) and then by name (ascending)
  return habits.sort((a, b) => {
    // Compare by status (true before false)
    if (a.status === b.status) {
      // If status is the same, compare by name
      return a.name.localeCompare(b.name);
    }

    return a.status ? 1 : -1; // Sort true before false
  });
}

function HabitList() {
  const [habits, setHabits] = useState([]);
  const [habitsError, setHabitsError] = useState("");
  // Teilt die habits in Gruppen von drei auf
  let groupedHabits = [];
  for (let i = 0; i < habits.length; i += 3) {
    groupedHabits.push(habits.slice(i, i + 3));
  }

  const renderThis = async () => {
    try {
      await client.get("api/habits").then((response) => {
        setHabits(sortHabitsByStatusAndName(response.data));
      });
    } catch (err) {
      setHabitsError(err.response.data.message);
    }
  };

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        await client.get("api/habits").then((response) => {
          setHabits(sortHabitsByStatusAndName(response.data));
        });
      } catch (err) {
        setHabitsError(err.response.data.message);
      }
    };
    fetchHabits();
  }, []);

  return (
    <div className="text-center">
      <SubNavBar activePage={"habits"} renderHabitList={renderThis}/>
      <h2 className="text-center">Habit Liste</h2>

      {habitsError ? (
        <div className="alert alert-danger mt-3">{habitsError}</div>
      ) : (
        // <div className="card-body">
        <div className="container mx-auto border p-5 list-container">
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
                    <div className="col" key={index}>
                      <HabitBox
                        id={habit.habit_id}
                        title={habit.name}
                        //description={habit.description}
                        isDone={habit.status}
                        renderHabitList={renderThis}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        // </div>
      )}
    </div>
  );
}
export default HabitList;
