import HabitBox from "../components/HabitBox";//Muss noch für jedes Habit angezeigt werden.

function HabitList() {
  return (
    <div className="card-body">
      <div className="container mx-auto border p-5">
        <h5 className="card-title">Habit Liste</h5>
        <p className="card-text">
          Du hast noch keine Habits. Füge dein erstes Habit hinzu!
        </p>
        <a href="#" className="btn btn-primary">
          Habit hinzufügen
        </a>
        <HabitBox/>
      </div>
    </div>
  );
}

export default HabitList;
