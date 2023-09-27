import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import HabitList from "./HabitList";
import { Link } from "react-router-dom";
import SuccessfulDeleteHabitModal from "./SuccessfulDeleteHabitModal";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

const addHabit = async () => {
  try {
    const response = await client.post(`api/habit/add_habit/${habitId}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const editHabit = async () => {
  try {
    const response = await client.post(`api/habit/update_name/${habitId}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const AdditHabitModal = ({ id, title }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    try {
      // Send a INSERT request to the backend
      await addHabit(newTitle);

      // Perform any additional actions after successful deletion
      // ...
      // <SuccessfulDeleteHabitModal/>
      // Close the modal
      handleClose();
      // <SuccessfulDeleteHabitModal/>

      window.location.reload();
      // alert("HIERNOTHING")
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async () => {
    try {
      // Send a Update request to the backend
      await editHabit(id, newTitle);

      // Perform any additional actions after successful deletion
      // ...
      // <SuccessfulDeleteHabitModal/>
      // Close the modal
      handleClose();
      // <SuccessfulDeleteHabitModal/>

      window.location.reload();
      // alert("HIERNOTHING")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant={`btn btn-outline-primary bi bi-${
          id != null ? "pencil" : "plus-circle-fill"
        } my-1`}
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title ?? "New Habit"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="habitNameInput"
                placeholder="Walk a mile"
              />
              <label for="habitNameInput">Give your habit a name!</label>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={id != null ? handleEdit : handleAdd}
          >
            {id != null ? "Edit" : "Add"}
          </Button>

          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdditHabitModal;
