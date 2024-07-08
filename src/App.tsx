
import React from "react";
import FileSelector from "./component/FileSelector";

const App: React.FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mol* Viewer with React and Vite</h1>
      </header>
      <FileSelector />
    </div>
  );
}

export default App;