import Boxes from "./HabitBox";

//Braucht man CDN zu pasten, sodass die Öffnung des Cards funktioniert?
export default function InfoComp() {

  return (
    <>
      <section id="box1" className="p-5">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md">
              <img src="./assets/bwpic.png" className="img-fluid" alt=""></img>
              <p>BWS PICTURE HIER</p>
            </div>
            <div className="col-md">
              <h2>Über uns</h2>
              <p className="lead">
                Wir sind Schüler der Brühlwiesenschule in Hofheim und befinden uns in der 12. Klasse.
                Wir absolvieren eine leistungsorientierte Ausbildung im Bereich Fachinformatik.
              </p>
              <a href="https://bws-hofheim.de/" className="btn btn-primary mt-3">
                Homepage der BWS
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="questions" className="p-5">
        <div className="container">
          <h2 className="text-center mb-4">Häufige Fragen</h2>
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  Was ist Habit-Tracker?
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <strong>Habit-Tracker macht Spaß!</strong> Das Hauptziel des Projekts besteht darin, den Nutzern dabei zu helfen, ihre
                  persönlichen Ziele, insbesondere im Bereich der Gewohnheitsbildung, zu erreichen.
                  Die Anwendung wird es ihnen ermöglichen, ihre Fortschritte zu überwachen und ihre
                  Statistiken im Auge zu behalten, um motiviert zu bleiben und ihre Vorsätze
                  erfolgreich umzusetzen.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  Wie weiss ich, ob ich mein Ziel erreicht habe oder nicht?
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <strong>Die Stats.</strong> Wenn Sie Ihre ToDos hinzufügen, wird automatisch ein Tracker ausgelöst. Dieser überprüft täglich, ob Sie Ihre ToDos am nächsten Tag erledigt haben. Die Ergebnisse werden direkt in den Statistiken dokumentiert und angezeigt.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                  Wird es eine Handy App geben?
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}