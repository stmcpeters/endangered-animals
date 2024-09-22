import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import ListSightings from './components/ListSightings'
import ListIndividuals from './components/ListIndividuals';


function App() {

  return (
    <div className="App">
      <MyNavBar />
      <ListSightings />
      <ListIndividuals />
    </div>
  )
}

export default App
