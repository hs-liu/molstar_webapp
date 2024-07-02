import { createRootViewer } from "./init";
//import { StateSelection, StateTransform } from "molstar/lib/mol-state";
//import { createStructureRepresentationParams } from "molstar/lib/mol-plugin-state/helpers/structure-representation-params";

/* const byres = document.getElementById("byres")!;
const bychain = document.getElementById("bychain")!;
const bypos = document.getElementById("bypos")!; */

export async function initView() {
    const plugin = await createRootViewer();

    const fileData = await plugin.builders.data.download({
        url: "https://models.rcsb.org/5ee7.bcif",
        isBinary: true,
    })

    const trajectorySO = await plugin.builders.structure.parseTrajectory(
        fileData,
        "mmcif",
    );

    const modelSO = await plugin.builders.structure.createModel(trajectorySO);
    const structureSO = await plugin.builders.structure.createStructure(modelSO);
    const structure = structureSO.data!;

    const representationSO = await plugin.builders.structure.representation.addRepresentation(
        structureSO,
        {
            type: "cartoon",
            color:'chain-id',
        },
        {tag: "my-cartoon"}
    );
    return plugin;
}