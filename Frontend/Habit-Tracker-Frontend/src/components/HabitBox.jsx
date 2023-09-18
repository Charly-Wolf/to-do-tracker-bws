


export default function HabitBox() {

    return (
        <>
            {/* CREATING COLUMNS FOR CARDS */}
            <section className="p-5">
                <div className="container">
                    <div className="row text-center g-4">
                        <div className="col-md">
                            <div className="card-body text-center bg-secondary">
                                <div className="h1 mb-3">
                                </div>
                                <div className="container">
                                        HabitListButtonList HERE
                                    </div>
                                <p className="card-title mb-3 ">TODO1</p>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="card-body text-center bg-secondary">
                                <div className="h1 mb-3">
                                </div>
                                <p className="card-title mb-3">TODO2</p>
                            </div>
                        </div>

                        <div className="col-md">
                            <div className="card-body text-center bg-secondary">
                                <div className="h1 mb-3">
                                </div>
                                <p className="card-title mb-3">TODO3</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}