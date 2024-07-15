/* import React, { useEffect, useRef } from 'react';
import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context';
import { createPluginUI } from 'molstar/lib/mol-plugin-ui';
import { DefaultPluginSpec } from 'molstar/lib/mol-plugin/spec';
import 'molstar/lib/mol-plugin-ui/skin/light.scss';

interface FileProps {
  //fileData: string;
  fileName: string;
}

const MolstarViewer: React.FC<FileProps> = ({fileName}) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const pluginRef = useRef<PluginUIContext | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    // Create the Mol* Plugin
    createPluginUI(viewerRef.current, {
      ...DefaultPluginSpec(),
      layout: {
        initial: {
          isExpanded: true,
        },
      },
    }).then(async (plugin) => {
      pluginRef.current = plugin;

      // Load a PDB file
      await plugin.dataTransaction(async () => {
        const data = await plugin.builders.data.download({
          url: `http://localhost:8080/api/files/${fileName}`,
          isBinary: false,
        });

        const trajectory = await plugin.builders.structure.parseTrajectory(data, 'pdb');

        await plugin.builders.structure.hierarchy.applyPreset(
          trajectory,
          'default'
        );
      });
    });

    return () => {
      pluginRef.current?.dispose();
    };
  }, []);

  return <div ref={viewerRef} style={{ width: '100%', height: '100%' }} />;
};
  
  export default MolstarViewer; */


import React, {useRef, useEffect, useState} from "react";
import { PluginContext } from "molstar/lib/mol-plugin/context";
import { initView } from "./index";

interface FileProps {
  fileName: string;
}

const MolstarViewer: React.FC<FileProps> = ({fileName}) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
        let plugin: PluginContext | null = null;

        if (viewerRef.current && canvasRef.current) { 
            initView(fileName).then(createdPlugin => {
            plugin = createdPlugin;
          }).catch(error => console.error("Failed to initialize Mol* viewer", error));
        }
    
        return () => {
          if (plugin) {
            plugin.dispose();
          }
        };
      }, []);
  
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