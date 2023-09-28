import { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

const AdditHabitModal = ({ id, title, renderHabitList }) => {
  const [show, setShow] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const handleClose = () => {
    setaddEditError("");
    setNewTitle(""); // Clear the text input
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [addEditError, setaddEditError] = useState(""); // Author: Carlos Paredes

  let showButton;

  const addHabit = async (newTitle) => {
    try {
      await client.post(`api/add_habit`, { name: newTitle });
      handleClose();
    } catch (error) {
      setaddEditError(error.response.data.message);
    }
  };

  const editHabit = async (id, newTitle) => {
    try {
      const response = await client.put(`api/habit/update_name/${id}`, {
        name: newTitle,
      });
      console.log(response.data);
      handleClose();
    } catch (error) {
      setaddEditError(error.response.data.message);
    }
  };

  if (id === null && title === "Habit hinzufügen") {
    showButton = (
      <Button variant={"btn btn-primary"} onClick={handleShow}>
        {title}
      </Button>
    );
    title = null;
  } else if (id === null && title === null) {
    showButton = (
      <Button
        variant={`btn btn-outline-primary bi bi-plus-circle-fill my-1`}
        onClick={handleShow}
      />
    );
  } else {
    showButton = (
      <Button
        variant={"btn btn-outline-primary bi bi-pencil my-1"}
        onClick={handleShow}
      />
    );
  }

  const handleAdd = async () => {
    try {
      // Send a INSERT request to the backend
      await addHabit(newTitle);

      // handleClose();
      renderHabitList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      // Send a Update request to the backend
      await editHabit(id, newTitle);

      // handleClose();

      renderHabitList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showButton}

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title ?? "New Habit"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="habitNameInput"
              defaultValue={title}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="Walk a mile"
            />
            <label htmlFor="habitNameInput">Give your habit a name!</label>
          </div>
        </Modal.Body>
        {addEditError && (
          <div className="alert alert-danger mt-3">{addEditError}</div>
        )}
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={id != null ? handleEdit : handleAdd}
          >
            {id != null ? "Edit" : "Add"}
          </Button>

          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdditHabitModal;
