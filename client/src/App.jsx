import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import ListSightings from './components/ListSightings'
import ListIndividuals from './components/ListIndividuals';
import ListSpecies from './components/ListSpecies';


function App() {

  return (
    <div className="App">
      <MyNavBar />
      <ListSpecies />
      <ListIndividuals />
      <ListSightings />
    </div>
  )
}

export default App
