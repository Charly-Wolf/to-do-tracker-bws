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

  console.log("HABIT ID:", id);
  console.log("Title des Habits: ", title);
  
  const handleAdd = async () => {
    try {
      // Send a INSERT request to the backend
      await addHabit();

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
      await editHabit(id);

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
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
            How to name your new habit?
            <input type="text" className="text-input"></input>
            </form>
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
