export default function HabitBox() {
  return (
    <>
      <div className="card text-bg-dark mb-3" style={{ maxWidth: "18rem" }}>
        <div className="card-body row">
          <div className="col-8 d-flex flex-column justify-content-center">
            <h5 className="card-title">Primary card title</h5>
            {/*<p className="card-text" id="habitDescription">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>*/}
          </div>
          <div className="col-1"></div>
          <div className="col-2">
            <form>
              <div className="row">
                <input type="checkbox" className="my-1"></input>
              </div>
              <div className="row">
                <button className="btn btn-outline-success bi bi-pencil my-1"></button>
              </div>
              <div className="row">
                <button className="btn btn-outline-danger bi bi-trash3 my-1"></button>
              </div>
            </form>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
}

//style="max-width: 18rem;"
