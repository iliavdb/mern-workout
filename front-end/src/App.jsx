import { useEffect, useState } from 'react';
import DeleteWorkout from "./components/DeleteWorkout";
import UpdateWorkout from "./components/UpdateWorkout";
import WorkoutForm from "./components/WorkoutForm";

function App() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/workouts');
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchWorkouts();
  }, [workouts]);

  return (
    <div className="App">
      <h1>Workouts</h1>

      <WorkoutForm setWorkouts={setWorkouts} />

      {workouts.length === 0 ? (
        <p>Geen workouts gevonden</p>
      ) : (
        workouts.map(workout => (
          <div key={workout._id}>
            <h3>{workout.title}</h3>
            <p>Reps: {workout.reps}</p>
            <p>Load: {workout.load} kg</p>

            <UpdateWorkout
              workoutId={workout._id}
              currentTitle={workout.title}
              currentReps={workout.reps}
              currentLoad={workout.load}
              setWorkouts={setWorkouts}

            />
            <DeleteWorkout
              workoutId={workout._id}
              workoutTitle={workout.title}
              setWorkouts={setWorkouts}

            />
          </div>
        ))
      )}
    </div>
  );
}

export default App;