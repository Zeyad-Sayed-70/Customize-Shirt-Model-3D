import Canvas from './canvas'
import Home from './pages/Home'
import Customizer from './pages/Customizer'

function App() {

  return (
    <>
      <main className="app trainsition-all ease-in">
        <Home />
        <Canvas />
        <Customizer />
      </main>
    </>
  )
}

export default App
