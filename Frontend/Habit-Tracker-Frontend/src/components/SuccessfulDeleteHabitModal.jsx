export default function SuccessfulDeleteHabitModal() {
    return (
        <>
            <div id="successModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="successModalLabel">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="successModalLabel">Löschung erfolgreich</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Schließen">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Die Löschung war erfolgreich!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}