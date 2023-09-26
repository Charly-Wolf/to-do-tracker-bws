import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import HabitList from "./HabitList";
import { Link } from "react-router-dom";
import SuccessfulDeleteHabitModal from "./SuccessfulDeleteHabitModal";

const client = axios.create({
    baseURL: "http://127.0.0.1:5000/",
})

const deleteHabit = async (habitId) => {
    try {
        const response = await client.delete(`api/habit/${habitId}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

const DeleteHabitModal = ({ id, title }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("HABIT ID:", id)
    console.log("Title des Habits: ", title);

    const handleDelete = async () => {
        try {
            // Send a DELETE request to the backend
            await deleteHabit(id);

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
    }

    return (
        <>
            <Button variant="outline-danger bi bi-trash3 my-1" onClick={handleShow}></Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Wollen Sie Ihren Habit wirklich löschen?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>Ja</Button>

                    <Button variant="success" onClick={handleClose}>Nein</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteHabitModal;