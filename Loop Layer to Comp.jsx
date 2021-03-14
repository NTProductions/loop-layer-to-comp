// loop layer to comp

app.beginUndoGroup("Loop Layer to Comp");
if(app.project.activeItem != null && app.project.activeItem instanceof CompItem) {
    if(app.project.activeItem.selectedLayers.length > 0) {
        layers = app.project.activeItem.selectedLayers;
        for(var i = 0; i < layers.length; i++) {
            loopLayerToComp(layers[i], true, true);
            }
}
}
app.endUndoGroup();

function loopLayerToComp(layer, opacityBool, precompBool) {
    var comp = layer.containingComp;
    
    var numDuplicates = Math.ceil(comp.duration / (layer.outPoint - layer.inPoint))+1;
    var duplicates = [layer];
    var thisDuplicate;
    
    if(opacityBool == true) {
        layer.property("ADBE Transform Group").property("ADBE Opacity").setValuesAtTimes([layer.inPoint, layer.inPoint+1, layer.outPoint-1, layer.outPoint], [0, 100, 100, 0]);
        }
    
    var startTime = layer.outPoint-1;
    for(var d = 0; d <= numDuplicates; d++) {
        thisDuplicate = layer.duplicate();
        duplicates.push(thisDuplicate);
        thisDuplicate.startTime = startTime;
        startTime = thisDuplicate.outPoint-1;
        }
    
    layer.moveToBeginning();
    
    var duplicateIndices = [];
    
    for(var d = 0; d < duplicates.length; d++) {
        duplicateIndices.push(duplicates[d].index);
        }
    
    if(precompBool == true) {
            comp.layers.precompose(duplicateIndices, layer.name, true);
        }

}