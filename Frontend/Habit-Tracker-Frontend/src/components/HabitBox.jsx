// import { Link, useMatch, useResolvedPath } from "react-router-dom";
import PropTypes from "prop-types";
import DeleteHabitModal from "./DeleteHabitModal";

// let habitTitle = "Test Habit";
// let habitDescription = "This is just an Description for this test habit. :)  I wonder whats happening, when there is an overflow. bbodso ifjdas ifdsaüf jadsfsadjfj"

export default function HabitBox({ title, habitId}) {
   return (
    <>
      <div className="card text-bg-dark mb-3 mx-auto" style={{ maxWidth: "18rem" }}>
        <div className="card-body row">
          <div className="col-9 d-flex flex-column justify-content-center" style={{ maxHeight: "20vh" }}>
            <h5 className="card-title" id="habitTitle">{title}</h5>
            {/*<p className="card-text overflow-y-scroll" id="habitDescription">
              {props.description}
  </p>*/}
          </div>
          <div className="col-2">
            <form>
              <div className="row">
              <input type="checkbox" className="btn-check" id="btn-check-outlined" autoComplete="off"/>
              <label className="btn btn-outline-success my-1" htmlFor="btn-check-outlined"><i className="bi bi-check2"></i></label>
              </div>
              <div className="row">
                <a href="#" className="btn btn-outline-primary bi bi-pencil my-1"></a>
                <DeleteHabitModal id = {habitId} title = {title}/>
                {/* <button className="btn btn-outline-primary bi bi-pencil my-1"></button> */}
              </div>
              <div className="row">
              {/* <button className="btn btn-outline-danger bi bi-trash3 my-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button> */}
                  {/* <DeleteHabitModal/> */}
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
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
};