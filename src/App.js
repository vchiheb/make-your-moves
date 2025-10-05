import NewGoal from "./components/NewGoal";
import GoalsSidebar from "./components/GoalsSidebar";

import './App.css';
import NoGoalSelected from "./components/NoGoalSelected";
import { useState } from "react";
import SelectedGoal from "./components/SelectedGoal";

function App() {

  const [goalsState, setGoalsState] = useState({
    selectedGoalId: undefined,
    goals: []
  });

  function handleStartAddGoal() {
    setGoalsState( prevState => {
      return {
        ...prevState,
        selectedGoalId: null
      }
    }); 
  }

  function handleAddGoal(goalData) {
    console.log(goalData);
    setGoalsState(prevState => {
      const goalId = Math.random();
      const newGoal = {
        ...goalData,
        id: goalId
      };

      return {
        ...prevState,
        selectedGoalId: undefined,
        goals: [...prevState.goals, newGoal]
      }
    });
  }

  function fnHandleCancelAddGoal() {
      setGoalsState(( prevState => {
          return {
            ...prevState,
            selectedGoalId: undefined
          }
      }))
  }

  function handleSelectGoal(id) { 
    setGoalsState( (prevState) => {
      return {
        ...prevState,
        selectedGoalId: id
      }
    })
  }

  console.log(goalsState);

  let content;

  if (goalsState.selectedGoalId === null) {
    content = <NewGoal handleAddGoal={handleAddGoal} onCancel={fnHandleCancelAddGoal}/>
  } else if (goalsState.selectedGoalId === undefined) {
    content = <NoGoalSelected onStartAddGoal={handleStartAddGoal}/>
  } else {
    content = <SelectedGoal goal={goalsState.goals.find( goal => goal.id === goalsState.selectedGoalId)} />
  }

  return (
    <main>
      <GoalsSidebar onStartAddGoal={handleStartAddGoal} goals={goalsState.goals} onSelectGoal={handleSelectGoal}/>
      {content}
    </main>
  );
}

export default App;
