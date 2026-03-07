const [BuildingExplorer, BuildingExplorerViewModel] = await Promise.all([
  $arcgis.import("@arcgis/core/widgets/BuildingExplorer.js"),
  $arcgis.import(
    "@arcgis/core/widgets/BuildingExplorer/BuildingExplorerViewModel.js",
  ),
]);

const viewElement = document.querySelector("arcgis-scene");
const buildingExplorerRoot = document.querySelector("#building-explorer");
await viewElement.viewOnReady();

const view = viewElement.view;
view.ui.components = [];

const buildingLayer = view.map.allLayers.find(
  (layer) => layer.type === "building-scene",
);

if (!buildingLayer) {
  throw new Error("No building scene layer was found in the scene.");
}

if (!buildingExplorerRoot) {
  throw new Error("Building Explorer container was not found.");
}

const viewModel = new BuildingExplorerViewModel({
  view,
  layers: [buildingLayer],
});

const buildingExplorer = new BuildingExplorer({
  container: buildingExplorerRoot,
  view,
  viewModel,
  visibleElements: {
    phases: false,
    disciplines: false,
  },
});

buildingExplorer.when(() => {
  applyWidgetOverrides();

  observer.observe(buildingExplorerRoot, {
    childList: true,
    subtree: true,
  });
});
