import { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

const addHabit = async (newTitle) => {
  try {
    const response = await client.post(`api/add_habit`, { name: newTitle });
  } catch (error) {
  }
};

const editHabit = async (id, newTitle) => {
  try {
    const response = await client.put(`api/habit/update_name/${id}`, {
      name: newTitle,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const AdditHabitModal = ({ id, title, renderHabitList }) => {
  const [show, setShow] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let showButton;

  if (id === null && title === "Habit hinzufügen") {
    showButton = (
      <Button variant={"btn btn-primary"} onClick={handleShow}>
        {title}
      </Button>
    );
    title = null;
  }
  else if (id === null && title === null) {
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

      // Perform any additional actions after successful deletion
      // ...
      // <SuccessfulDeleteHabitModal/>
      // Close the modal
      handleClose();
      // <SuccessfulDeleteHabitModal/>

      renderHabitList();
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

      renderHabitList();
      // alert("HIERNOTHING")
    } catch (error) {
      console.error(error);
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
