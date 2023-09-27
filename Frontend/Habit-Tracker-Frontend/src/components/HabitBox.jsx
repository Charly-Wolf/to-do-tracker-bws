import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import DeleteHabitModal from "./DeleteHabitModal";
import "../assets/css/habitBoxStyles.css";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Connection with the Backend
});

export default function HabitBox({ id, title, isDone, onClickCheckbox }) {
  const handleCheckboxChange = () => {
    const fetchData = async () => {
      console.log("Habit Id: ", id);
      console.log("Habit title:", title);
      console.log("Is it done?", isDone);

      try {
        if (!isDone) {
          await client.post(`/api/habit/mark_done/${id}`);
          // setChangeMessage("save success");
        } else {
          await client.put(`/api/habit/mark_undone/${id}`);
          // setChangeMessage("save success");
        }
        // Call the callback function to notify the parent (HabitList) of the change
        onClickCheckbox();
      } catch (err) {
        // setChangeMessage("failed save");
      }
    };
    fetchData(); // Add dependencies array
  };

  return (
    <>
      <div
        className={`card text-bg-${
          isDone ? "secondary" : "dark"
        } mb-3 mx-auto habit-card`}
        id={id}
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-body row">
          <div
            className="col-9 d-flex flex-column justify-content-center"
            style={{ maxHeight: "20vh" }}
          >
            <h5
              className={`card-title ${isDone ? "done" : ""}`}
              id="habitTitle"
              onClick={handleCheckboxChange}
            >
              {title}
            </h5>
            {/*<p className="card-text overflow-y-scroll" id="habitDescription">
              {props.description}
            </p>*/}
          </div>
          <div className="col-2">
            <button onClick={handleCheckboxChange} className="row">
              <i
                className={`bi bi-check2 btn btn${
                  isDone ? "" : "-outline"
                }-success my-1`}
              ></i>
            </button>
            <div className="row">
              <button
                className="btn btn-outline-primary bi bi-pencil my-1" //Modal placeholder <EditHabitModal>
              />
            </div>
            <div className="row">
              <DeleteHabitModal id={id} title={title} />
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
}

HabitBox.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
};
