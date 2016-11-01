// script.name = SE_stripDocument.jsx;   
// script.description = Batch opening and removing of particular elements, then saves as EPS;  
// script.requirements = none  
// script.parent = Benjamin Hamilton  
// script.elegant = false;  

  
  
var folder = Folder.selectDialog("Select Source Folder..."); // select folder  
var nameArray = [];
  
if (folder==null) {  
                    alert("Good Bye");  
}  
  
  
else {  
    var files = find_files (folder, ['.ai']);  
          var fileCount = files.length; // count them  
  
  
          if (fileCount>0) {  
                    for (i=0; i<fileCount; i++) {  
                        var currentDoc = app.open(files[i]);  
                        stripDocument(); 
                        expandAllItems();
                        
                        saveAsEPS();
                        currentDoc.close();  
                        
                    }  
        alert(fileCount + ' file(s) processed');  
          }  
          else {  
                    alert("There are no Illustrator files in this folder.");  
          }  
}  

  
// recurse subfolders - Peter Kharel  
function find_files (dir, mask_array){  
    var arr = [];  
    for (var i = 0; i < mask_array.length; i++){  
        arr = arr.concat (find_files_sub (dir, [], mask_array[i].toUpperCase()));  
    }  
    return arr;  
}  
  
function find_files_sub (dir, array, mask){  
    var f = Folder (dir).getFiles ( '*.*' );  
    for (var i = 0; i < f.length; i++){  
        if (f[i] instanceof Folder){  
            find_files_sub (f[i], array, mask);  
        } else if (f[i].name.substr (-mask.length).toUpperCase() == mask){  
            array.push (f[i]);  
        }  
    }  
    return array;  
}
function stripDocument(){
        //removes unnecessary artboards
        
        var artbs = currentDoc.artboards;  
        for (var i = artbs.length-1 ; i >= 0; i--) {  
            if (artbs[i].name != "512x512") {  
                artbs[i].remove();  
            }  
        }  

        //removes unnecessary layers
        var myLayers = currentDoc.layers;  
        for (var i = myLayers.length-1 ; i >= 0; i--) {  
            if (myLayers[i].name != "Shapes") { 
                myLayers[i].locked = false;
                myLayers[i].remove();  
            }  
        }  
        
        var i, count, itemList;  
          currentDoc = app.activeDocument;  
          currentDoc.artboards.setActiveArtboardIndex( 0 );  
          currentDoc.selectObjectsOnActiveArtboard();  
          itemList = currentDoc.pageItems;  
          count = itemList.length;  
          
          for ( i = count-1; i >= 0; i-- ) { // A reversed loop for object removal…  
                    if ( ! itemList[i].selected ) { itemList[i].remove(); }  
          };  
  
          currentDoc.selection = null;  
          app.redraw();  
}

function expandAllItems(){
    app.doScript('expandAllItems','Default Actions');
 }



function saveAsEPS() {
    var newFile = new File(folder);
    var epsOptions = new EPSSaveOptions();
    currentDoc.saveAs( newFile, epsOptions);
}
    
  
