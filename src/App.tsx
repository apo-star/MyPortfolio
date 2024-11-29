import "./App.css";
import "./assets/css/font-style.css";
import { Scene } from "./componentsForThree/Scene";
import { UI } from "./components/UI";

function App() {
  return (
    <>
      <div className="fixed z-0">
        <Scene />
      </div>
      <div className="relative z-10">
        <UI />
      </div>
    </>
  );
}

export default App;
