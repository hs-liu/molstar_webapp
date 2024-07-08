import { createRootViewer } from "./init";

export async function initView(filename: string, pdbData: string) {
    const plugin = await createRootViewer();

    /* const dataFile = new File([pdbData], filename, { type: 'text/plain' });
    const fileData = await plugin.builders.data.readFile({file: dataFile, isBinary: false }); */
      
    const trajectorySO = await plugin.builders.structure.parseTrajectory(
        pdbData,
        "pdb",
    );
    
    const modelSO = await plugin.builders.structure.createModel(trajectorySO);
    const structureSO = await plugin.builders.structure.createStructure(modelSO);
    const structure = structureSO.data!;
    
    await plugin.builders.structure.representation.addRepresentation(
        structureSO,
        {
        type: "cartoon",
        color: 'chain-id',
        },
        { tag: "my-cartoon" }
    );
    return plugin;
}