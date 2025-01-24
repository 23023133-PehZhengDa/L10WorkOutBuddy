import { useWorkoutsContext } from '../hooks/useWorkoutContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  // Handle delete workout
  const handleDeleteClick = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/workouts/${workout._id}`, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  // Handle favorite workout
  const handleFavoriteClick = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/workouts/${workout._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorite: !workout.favorite }) // Toggle favorite
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_WORKOUT', payload: json })
    }
  }

  return (
    <div className={`workout-details ${workout.favorite ? 'favorite' : ''}`}>
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <div className="actions">
        <span
          className={`material-symbols-outlined ${workout.favorite ? 'favorite-icon' : ''}`}
          onClick={handleFavoriteClick}
        >
          {workout.favorite ? 'favorite' : 'favorite_border'}
        </span>
        <span className="material-symbols-outlined" onClick={handleDeleteClick}>
          delete
        </span>
      </div>
    </div>
  )
}

export default WorkoutDetails
