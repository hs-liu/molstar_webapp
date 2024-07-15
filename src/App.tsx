
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
      <div className="flex space-x-4">
        <div className="w-1/2 h-screen bg-white-500 justify-center">
          <FileSelector /> 
        </div>
        <div className="w-1/2 h-screen bg-white-500 justify-center">
          <p> 2nd box </p>
        </div>
      </div>
    </div>
  );
}

export default App;