
import React, {useState} from "react";
import FileSelector from "./component/FileSelector";
import MolstarViewer from "./component/MolstarViwer";

const App: React.FC = () => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleLoadFile = (fileName: string) => {
    setSelectedFileName(null)
    setSelectedFileName(fileName);
  };


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