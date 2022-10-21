
import './App.css';
import { useEffect ,useState} from 'react';


function App() {
  const [siteState, setSiteState] = useState(null)

  useEffect(() => {

    fetch("/api/items").
      then(res => res.json()).
      then(data => setSiteState(data))

  }, [])
  function renderState() {
    if (siteState)
      return JSON.stringify(siteState)
  }
  return (
    <div className="App">
      Hello World
      {renderState()}
    </div>
  );
}

export default App;
