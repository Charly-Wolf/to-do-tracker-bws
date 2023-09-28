import '../components/ScreenStyles.css'

export default function Newsletter() {

    return (
        <>
            {/* Using flexbox instead of grid */}
            <section className="bg-primary text-light p-3">
                <div className="container">
                    <div className="d-md-flex justify-content-between align-items-center">
                        <p className="mb-3 mb-md-0">Newsletter abonnieren</p>
                        <div className="input-group news-input">
                            <input type="text" className="form-control" placeholder="Bitte Ihre Email hier eingeben." />
                            <button className="btn btn-dark btn-lg" type="button">Abonnieren</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}