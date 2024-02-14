import { useContext } from "react";
import { fabricContext } from "@/store/context";
import { fabric } from "fabric";
import useCanvasUndoRedo from "./CanvasUndoRedo";

interface ExtendedCanvas extends fabric.Canvas {
  clipboard?: fabric.Object[];
}

const useMenuOps = () => {
  const { canvas, currentTshirt } = useContext(fabricContext);
  const { saveCanvasState, undo, redo } = useCanvasUndoRedo();

  const copyObject = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        const objectsToCopy = canvas.getActiveObjects();
        if (objectsToCopy && objectsToCopy.length > 0) {
          (canvas as ExtendedCanvas).clipboard = objectsToCopy;
        }
      }
    }
  };

  const pasteObject = () => {
    if (canvas) {
      const clipboard = (canvas as ExtendedCanvas).clipboard;
      if (clipboard && clipboard.length > 0) {
        clipboard.forEach((object) => {
          const clonedObject = fabric.util.object.clone(object);
          canvas?.add(clonedObject);
        });
        canvas?.discardActiveObject();
        canvas?.renderAll();
      }
      saveCanvasState(canvas);
    }
  };

  const horizontalAlign = () => {
    if (canvas) {
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects && activeObjects.length > 1) {
        const group = new fabric.Group(activeObjects);
        if (group.left !== undefined && group.width !== undefined) {
          const centerX = group.left + group.width / 2;
          activeObjects.forEach((obj) => {
            if (obj.width !== undefined) {
              obj.left = centerX - obj.width / 2;
            }
          });
          canvas?.requestRenderAll();
        }
      }
      saveCanvasState(canvas);
    }
  };

  const verticalAlign = () => {
    if (canvas) {
      const activeObjects = canvas.getActiveObjects();
      if (activeObjects && activeObjects.length > 1) {
        const group = new fabric.Group(activeObjects);
        if (group.top !== undefined && group.height !== undefined) {
          const centerY = group.top + group.height / 2;
          activeObjects.forEach((obj) => {
            if (obj.height !== undefined) {
              obj.top = centerY - obj.height / 2;
            }
          });
          canvas?.requestRenderAll();
        }
      }
      saveCanvasState(canvas);
    }
  };

  const flipObject = () => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      activeObject.flipX = !activeObject.flipX;
      canvas?.requestRenderAll();
    }
  };

  const lockLayer = () => {
    if (canvas) {
       const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set({
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        hasControls: false,
      });
      canvas.requestRenderAll(); 
    }
    }
  };

  const unlockLayer = () => {
    if (canvas) {
       const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set({
        lockMovementX: false,
        lockMovementY: false,
        lockRotation: false,
        lockScalingX: false,
        lockScalingY: false,
        hasControls: true, 
      });
      canvas.requestRenderAll();
    }
    }
  };

  const emptyCanvas = () => {
    canvas?.clear();
    if (canvas) saveCanvasState(canvas);
  };

  const save = (canvas: fabric.Canvas) => {
    // Store canvas contents in local storage
    const canvasData = JSON.stringify(canvas.toObject());
    localStorage.setItem("canvasData", canvasData);

    // Log elements present with their positions on the canvas
    const canvasObjects = canvas.getObjects().map((obj) => ({
      type: obj.type,
      position: { left: obj.left, top: obj.top },
      // Add more properties as needed
    }));
    console.log("Canvas Objects:", canvasObjects);
  };

  const print = (canvas: fabric.Canvas) => {
    // Open print preview
    window.print();
  };

  const downloadAsPNG = (canvas: fabric.Canvas) => {
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const downloadAsPNG = async (
  //   canvas: fabric.Canvas,
  //   currentTshirt?: string
  // ) => {
  //   // Render the canvas with its elements
  //   canvas.renderAll();

  //   // Load the t-shirt image
  //   fabric.Image.fromURL("./assets/tshirt.png", (tshirtImage) => {
  //     // Set t-shirt image dimensions
  //     tshirtImage.scaleToWidth(canvas.width || 100);
  //     tshirtImage.scaleToHeight(canvas.height || 100);

  //     // Add the t-shirt image to the canvas
  //     canvas.add(tshirtImage);

  //     // Render the canvas with the t-shirt image
  //     canvas.renderAll();

  //     // Generate PNG data URL with the overlaid canvas and t-shirt image
  //     const dataURL = canvas.toDataURL({ format: "png" });

  //     // Download the combined canvas and t-shirt image as a PNG file
  //     const link = document.createElement("a");
  //     link.href = dataURL;
  //     link.download = "canvas_with_image.png";
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //     // Remove the t-shirt image from the canvas after downloading
  //     canvas.remove(tshirtImage);
  //   });
  // };

  return {
    copyObject,
    pasteObject,
    horizontalAlign,
    verticalAlign,
    flipObject,
    lockLayer,
    unlockLayer,
    emptyCanvas,
    save,
    print,
    downloadAsPNG,
  };
};

export default useMenuOps;
