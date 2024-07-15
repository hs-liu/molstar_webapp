//do the little server thing
import React, { useState, useEffect } from 'react';
import Select, {SingleValue} from "react-select";
import MolstarViewer from './MolstarViwer';

interface OptionType {
  value: string;
  label: string;
};

/* interface FileProps {
  selectFunc: (fileName: string) => void
} */

const FileSelector: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string|null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string|null>(null);
  const [options, setOptions] = useState<OptionType[]>([])
  const [error, setError] = useState<string|null>(null);
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>();

  // using GET query to get all filenames 
  // later display as selectable options
  useEffect(() => {
    fetch('http://localhost:8080/api/files')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: string[]) => {
        // Map data to current useState
        // create a Selector list
        setFiles(data)
        const options = data.map((file) => ({
          value: file, label: file.replace('.pdb', "")
        }));
        setOptions(options);
      })
      .catch((error) => {
        console.error('Error fetching files:', error)
        setError("Error fetching files from the server")
      });
  }, []);

  const handleChange = async (option: SingleValue<OptionType>) => {
    if (option != null) {
      setSelectedOption(option);
      setSelectedFileName(option.value);
      console.log(selectedFileName);
    }
  }

  // When clicked on display stucture
  // Make sure the selected dile 
  const handleLoadFile = () => {
    /* if (fileName) {
      selectFunc(fileName)
    } */
    if (!selectedOption) return;

    setError(null); 
    setFileName(selectedFileName)
    
    if (fileName) {
      // Retrieve specific file data 
      // Make sure the specific file exists on the Server
      fetch(`http://localhost:8080/api/files/${fileName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Return success if the selected file exists
        return response.text();
      })
      .catch((error) => {
        console.error('Error fetching file content:', error);
        setError('Error fetching file content');
      });
    }
  };


  return (
    <div className="p-2">
      <h1 className="text-xl font-bold">Select a File to Display</h1>
      <Select 
      id="update" 
      className="px-3 py-2 font-xs"
      value={selectedOption as OptionType}
      onChange={(option: any) => handleChange(option)}
      options={options}
      isSearchable={false}
      menuPortalTarget={document.body}
      menuPosition={"fixed"}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button 
        type='submit'
        onClick={handleLoadFile}
        className='px-3 py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 bg-blue-800 hover:bg-blue-700'
       >
        Load Structure
      </button>
      {
        <div className="w-full h-screen">
          <MolstarViewer fileName={fileName ?? ""} />
        </div>
      }
    </div>
  );
};

export default FileSelector;
