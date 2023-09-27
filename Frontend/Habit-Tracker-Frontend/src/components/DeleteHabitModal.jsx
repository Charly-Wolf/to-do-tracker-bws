// Authors: Mahir Dzafic, Carlos Paredes & Marius Schröder

import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import HabitList from "./HabitList";
import { Link } from "react-router-dom";
import SuccessfulDeleteHabitModal from "./SuccessfulDeleteHabitModal";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

const DeleteHabitModal = ({ id, title, renderHabitList }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setDeleteError("");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [deleteError, setDeleteError] = useState(""); // Author: Carlos Paredes

  const deleteHabit = async (habitId) => {
    try {
      await client.delete(`api/habit/${habitId}`);
    } catch (error) {
      setDeleteError(error.response.data.message); // Author: Carlos Paredes
    }
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend
      await deleteHabit(id);
      renderHabitList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="btn btn-outline-danger bi bi-trash3 my-1"
        onClick={handleShow}
      ></Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Wollen Sie Ihren Habit wirklich löschen?</Modal.Body>
        {deleteError && (
          <div className="alert alert-danger mt-3">{deleteError}</div>
        )}
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Ja
          </Button>

          <Button variant="success" onClick={handleClose}>
            Nein
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteHabitModal;
