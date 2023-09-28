
function Footer() {
  return (
    <>
        <div className="card-footer text-muted fixed-bottom bg-light" style={{zIndex:"1"}}>&copy; Dzafic, Paredes, Schroeder {new Date().getFullYear()}</div>
    </>
  );
}

export default Footer;
