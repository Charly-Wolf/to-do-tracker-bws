//TESTING

export default function Table(){
    return(
        <>
            <div>
                <ul>
                    {records.map((list, index) => (
                        <li key={index}>{list.user_id} | {list.habit_id}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}