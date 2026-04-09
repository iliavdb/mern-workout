import { useEffect, useState } from 'react';
import DeleteWorkout from "./components/DeleteWorkout";
import UpdateWorkout from "./components/UpdateWorkout";
import WorkoutForm from "./components/WorkoutForm";
import Login from "./components/login";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');

    if (!token) {
        console.log('Niet ingelogd');
        return;
        }

         try {

         const response = await fetch('http://localhost:4000/api/workouts', {
            headers: {
           'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Error:', error);
      }

    };

    fetchWorkouts();
  }, [workouts]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setWorkouts([]);
    console.log('Uitgelogd');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <>
          <h1>Inloggen</h1>
          <Login onLoginSuccess={handleLoginSuccess} />
        </>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Workouts</h1>
            <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
              Uitloggen
            </button>
          </div>

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
        </>
      )}
    </div>
  );
}

export default App;