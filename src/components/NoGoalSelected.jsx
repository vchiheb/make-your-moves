
import './NoGoalSelected.css';

export default function NoGoalSelected({onStartAddGoal}) {

    return (
        <div className='goal'>
            <h2>No goal selected.</h2>

            <p>Select a goal or get started with a new one.</p>
            <p>
                <button onClick={onStartAddGoal}>Create new goal</button>
            </p>
        </div>
    )

}