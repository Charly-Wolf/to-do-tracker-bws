import Boxes from "./HabitBox";
import InfoAccordion from "./InfoAccordion";

//Braucht man CDN zu pasten, sodass die Öffnung des Cards funktioniert?
export default function InfoComp() {

  return (
    <>
      <section id="box1" className="p-5">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md">
              <img src="../src/assets/bwpic.png" className="img-fluid rounded w-70 p-4" alt=""></img>
              <p><i>Brühlwiesenschule<br/>Gartenstraße 28, 65719 Hofheim am Taunus</i></p>
            </div>
            <div className="col-md">
              <h2>Über uns</h2>
              <p className="lead">
                Wir sind Schüler der Brühlwiesenschule in Hofheim und befinden uns in der 12. Klasse.
                Wir absolvieren eine leistungsorientierte Ausbildung im Bereich Fachinformatik.
              </p>
              <a href="https://bws-hofheim.de/" target="_blank" className="btn btn-primary mt-3">
                Homepage der BWS
              </a>
            </div>
          </div>
        </div>
      </section>
      <InfoAccordion/>
    </>
  );
}