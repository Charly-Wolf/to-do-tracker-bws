// Author: Carlos Paredes

import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/statsStyles.css";
import SubNavBar from "./SubNavBar";
import LoadingSpinner from "./spinner";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Connection with the Backend
});

function Stats() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([]);
  const [logsError, setLogsError] = useState("");

  useEffect(() => {
    // Fetch habits from your API
    async function fetchData() {
      try {
        const habitsResponse = await client.get("/api/habits");

        setHabits(habitsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate the date range from the habits
    if (habits.length > 0) {
      const allHabitLogs = habits.reduce(
        (acc, habit) => [...acc, ...habit.habitLogs],
        []
      );

      const logDates = allHabitLogs.map((log) => new Date(log.log_date));

      if (logDates.length <= 0) {
        setLogsError("No logs to show.");
      } else {
        const oldestDate = new Date(Math.min(...logDates));
        const today = new Date();

        const dateArray = [];
        let currentDate = new Date(oldestDate);
        while (currentDate <= today) {
          dateArray.push(currentDate.toLocaleDateString("en-US"));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setDateRange(dateArray);
      }
    }
  }, [habits]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* <SubNavBar /> */}
      <div className="table-responsive">
        <h2 className="text-center">Stats</h2>

        {logsError ? (
          <div className="alert alert-danger mt-3">{logsError}</div>
        ) : (
          <div className="table-wrapper">
            <table className="table table-hover table-bordered table-striped table-sm">
              <thead className="table-dark">
                <tr>
                  <th className="fixed-row">Dates</th>
                  {habits.map((habit) => (
                    <th key={habit.habit_id}>{habit.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dateRange.map((date) => (
                  <tr key={date}>
                    <td className="fixed-row">{date}</td>
                    {habits.map((habit) => {
                      const logDate = new Date(date).toLocaleDateString(
                        "en-US"
                      );
                      const hasLog = habit.habitLogs.some(
                        (log) =>
                          new Date(log.log_date).toLocaleDateString("en-US") ===
                          logDate
                      );
                      return (
                        <td key={habit.habit_id}>
                          {hasLog ? (
                            <span role="img" aria-label="checkmark">
                              ✅
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Stats;
