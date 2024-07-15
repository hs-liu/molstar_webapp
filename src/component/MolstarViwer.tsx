import React, {useRef, useEffect, useState} from "react";
import { PluginContext } from "molstar/lib/mol-plugin/context";
import { initView } from "./index";

interface FileProps {
  fileName: string;
}

const MolstarViewer: React.FC<FileProps> = ({fileName}) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleLoadDisplay = (filename: string) => {
      let plugin: PluginContext | null = null;

      if (viewerRef.current && canvasRef.current) { 
          initView(filename).then(createdPlugin => {
          plugin = createdPlugin;
        }).catch(error => console.error("Failed to initialize Mol* viewer", error));
      }
  
      return () => {
        if (plugin) {
          plugin.dispose();
        }
      };
    } 

    useEffect(() => {
      handleLoadDisplay(fileName);
      }, [fileName]);

    
    
  
    return ( <div className="flex flex-col h-full w-full p-4">
        
        <div className="flex-1 p-4">
          <div ref={viewerRef} id="app" className="outline outline-1 outline-dotted outline-gray-300 h-full w-full">
            <canvas ref={canvasRef} id="canvas" className="h-full w-full" />
          </div>
        </div>
      </div>
    );
  };
  
  export default MolstarViewer;