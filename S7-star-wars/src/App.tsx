import Header from './components/Header'
import StarshipsList from './components/StarshipsList'
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <h1 className='text-blue-800'>Star Wars App</h1>
      <StarshipsList />
     
    </div>
  )
}

export default App;
