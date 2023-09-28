import PropTypes from "prop-types";
import axios from "axios";
import DeleteHabitModal from "./DeleteHabitModal";
import AdditHabitModal from "./AdditHabitModal";
import "../assets/css/habitBoxStyles.css";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Connection with the Backend
});

export default function HabitBox({ id, title, isDone, renderHabitList }) {
  const handleCheckboxChange = () => {
    const fetchData = async () => {
      try {
        if (!isDone) {
          await client.post(`/api/habit/mark_done/${id}`);
        } else {
          await client.put(`/api/habit/mark_undone/${id}`);
        }
        // Call the callback function to notify the parent (HabitList) of the change
        renderHabitList();
      } catch (err) {
        // setChangeMessage("failed save");
      }
    };
    fetchData(); // Add dependencies array
  };

  return (
    <>
      <div
        className={`card text-bg habit-box ${
          isDone ? "done-habit-card" : ""
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
          </div>
          <div className="col-2">
            <div onClick={handleCheckboxChange} className="row">
              <button
                className={`bi bi-check2 btn btn${
                  isDone ? "" : "-outline"
                }-success my-1`}
              ></button >
            </div>
            <div className="row">
              <AdditHabitModal id = {id} title = {title} renderHabitList={renderHabitList} />
            </div>
            <div className="row">
              <DeleteHabitModal id={id} title={title} renderHabitList={renderHabitList}/>
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
  renderHabitList: PropTypes.func.isRequired,
};
