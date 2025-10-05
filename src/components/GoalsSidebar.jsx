
import './GoalsSidebar.css';    

export default function ProjectsSidebar({goals, onStartAddGoal, onSelectGoal, selectedGoalId }) {
    return (
<aside className="">
        <h2 className="">Your goals</h2>
        <div>
            <button className="" onClick={onStartAddGoal}>+ Add Goal</button>
        </div>
        <ul className="sidebar__goal-list">
            {goals.map( (goal, index) => {
              return (
             
                <li key={goal.id} onClick={() => onSelectGoal(goal.id)} className={goal.id === selectedGoalId ? 'active' : ''}>
                    {index + 1}. {goal.title}   
                </li>       
            );

            })}

        </ul>
    </aside>
    )
}