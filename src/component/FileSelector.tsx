//do the little server thing
import React, { useState, useEffect } from 'react';
import Select, {SingleValue} from "react-select";
import MolstarViewer from './MolstarViwer';

interface OptionType {
  value: string;
  label: string;
};

const FileSelector: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string|null>(null);
  const [options, setOptions] = useState<OptionType[]>([])
  const [error, setError] = useState<string|null>(null);
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>();
  const [loadedContent, setLoadedContent] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/files')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: string[]) => {
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
      setFileName(option.value);
    }
  }

  const handleLoadFile = () => {
    if (!selectedOption) return;

    setFileContent(null); // Reset file content
    setError(null); // Reset error state

    fetch(`http://localhost:8080/api/files/${fileName}`)
      .then((response) => {
        if (!response.ok) {
          console.log(fileName);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((content) => setLoadedContent(content))
      .catch((error) => {
        console.error('Error fetching file content:', error);
        setError('Error fetching file content');
      });
  };


  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Select a File to Display</h1>
      {error && <p className="text-red-500">{error}</p>}
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
      <button 
        type='submit'
        onClick={handleLoadFile}
        className='px-3 py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 bg-blue-800 hover:bg-blue-700'
       >
        Load Structure
      </button>
      {loadedContent && (
        <div className="mt-4">
          <MolstarViewer fileData={fileContent ?? ""} fileName={fileName ?? ""} />
        </div>
      )}
    </div>
  );
};

export default FileSelector;
