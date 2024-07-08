//do the little server thing
import React, { useState, useEffect } from 'react';

const FileSelector: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/files')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((structures: string[]) => setFiles(structures))
      .catch((error) => console.error('Error fetching files:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Select a File</h1>
      <ul className="list-disc pl-5">
        {files.map((file) => (
          <li key={file} className="mb-2">
            <button
              className={`p-2 border rounded ${
                selectedFile === file ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
              onClick={() => setSelectedFile(file)}
            >
              {file}
            </button>
          </li>
        ))}
      </ul>
      {selectedFile && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Selected File: {selectedFile}</h2>
        </div>
      )}
    </div>
  );
};

export default FileSelector;
