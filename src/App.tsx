
import React from "react";
import MolstarViewer from "./component/MolstarViwer";

const App: React.FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mol* Viewer with React and Vite</h1>
      </header>
      <MolstarViewer />
    </div>
  );
}

export default App;