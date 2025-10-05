

import './SelectedGoal.css';


export default function SelectedGoal({goal}) {

    const formattedStartDate = new Date(goal.startDate).toLocaleDateString();
    const formattedEndDate = new Date(goal.endDate).toLocaleDateString();

    return (
        <div className="selected-goal">
            <header >
                <div>
                    <h1>{goal.title}</h1>
                </div>
                <p>{formattedStartDate}</p>
                <p>{formattedEndDate}</p>
                <p>{goal.description}</p>

                <button>Delete</button>
            </header>

            <div
                >TASKS
            </div>
        </div>
    )
}