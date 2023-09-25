import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Connection with the Backend
});

export default function HabitBox({ id, title, isDone }) {
  const [habitBoxId, setHabitBoxId] = useState(`habitBox-${id}`);
  const [habitCheckboxId, setHabitCheckboxId] = useState(`habitCheckbox-${id}`);
  const [changeMessage, setChangeMessage] = useState("");
  const [isChecked, setIsChecked] = useState(isDone);

  const handleCheckboxChange = (habitId) => {
      const fetchData = async () => {
        try {
          if (!isChecked) {
            await client.post(`/api/habit/mark_done/${habitId}`);
            setChangeMessage("save success");
          } else {
            await client.put(`/api/habit/mark_undone/${habitId}`);
            setChangeMessage("save success");
          }
        } catch (err) {
          setChangeMessage("failed save");
        }
      };
      fetchData(); // Add dependencies array
      setIsChecked((isChecked) => !isChecked);
  };

  const handleEditButtonClick = (habitId) => {
    try {
      client.delete(`/api/habit/${habitId}`).then((response) => {
        setChangeMessage("save success");
      });
    } catch (err) {
      setChangeMessage("failed save");
    }
  };

  const handleDeleteButtonClick = (habitId) => {};

  return (
    <>
      <div
        className="card text-bg-dark mb-3 mx-auto"
        id={habitBoxId}
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-body row">
          <div
            className="col-9 d-flex flex-column justify-content-center"
            style={{ maxHeight: "20vh" }}
          >
            <h5 className="card-title" id="habitTitle">
              {title}
            </h5>
            {/*<p className="card-text overflow-y-scroll" id="habitDescription">
              {props.description}
  </p>*/}
          </div>
          <div className="col-2">
            <form>
              <div className="row">
                <input
                  type="checkbox"
                  className="btn-check"
                  id={habitCheckboxId}
                  autoComplete="off"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(id)}
                />
                <label
                  className="btn btn-outline-success my-1"
                  htmlFor={habitCheckboxId}
                >
                  <i className="bi bi-check2"></i>
                </label>
              </div>
              <div className="row">
                <button
                  type="button"
                  className="btn btn-outline-primary bi bi-pencil my-1"
                  onClick={() => handleEditButtonClick(id)}
                />
                {/* <button className="btn btn-outline-primary bi bi-pencil my-1"></button> */}
              </div>
              <div className="row">
                <button
                  type="button"
                  className="btn btn-outline-danger bi bi-trash3 my-1"
                  onClick={() => handleDeleteButtonClick(id)}
                />
              </div>
            </form>
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
  checked: PropTypes.bool.isRequired,
};
