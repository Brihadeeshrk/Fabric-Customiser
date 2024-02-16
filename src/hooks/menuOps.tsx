import { useContext } from "react";
import { fabricContext } from "@/store/context";
import { fabric } from "fabric";

interface ExtendedCanvas extends fabric.Canvas {
  clipboard?: fabric.Object[];
}

const useMenuOps = () => {
  const {
    canvas,
    storeCustomisationType,
    currentDesignPosition,
    currentTshirt,
  } = useContext(fabricContext);

  const saveCanvasState = (canvas: fabric.Canvas, position: string) => {
    const canvasStates = JSON.parse(localStorage.getItem("canvas") || "{}");
    if (canvas.getObjects().length === 0) {
      delete canvasStates[position];
    } else {
      const state = JSON.stringify({
        canvas: canvas.toJSON(),
      });
      canvasStates[position] = state;
    }
    localStorage.setItem("canvas", JSON.stringify(canvasStates));
  };

  const loadCanvasState = (canvas: fabric.Canvas, position: string) => {
    const canvasStates = JSON.parse(localStorage.getItem("canvas") || "{}");
    const savedState = canvasStates[position];
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (parsedState.customisationType) {
        storeCustomisationType(parsedState.customisationType);
      }
      canvas.loadFromJSON(parsedState.canvas, canvas.renderAll.bind(canvas));
    }
  };

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

  const positionMapping: {
    [key: string]: {
      width: number;
      height: number;
      top: number;
      left: number;
    };
  } = {
    "Front Left Chest": { width: 50, height: 50, top: 35, left: 70 },
    "Front Right Chest": { width: 50, height: 50, top: 35, left: 40 },
    "Front Center": { width: 125, height: 150, top: 55, left: 60 },
    "Left Sleeve": { width: 70, height: 40, top: 85, left: 55 },
    "Right Sleeve": { width: 70, height: 40, top: 85, left: 55 },
    "Back Neck": { width: 80, height: 30, top: 10, left: 47.5 },
    "Back Center": { width: 100, height: 150, top: 55, left: 50 },
  };

  // This is working fine  for downloading single image but not for multiple images and few positioning issue

  const downloadAsPNG = () => {
    if (!canvas || !currentTshirt || !positionMapping[currentDesignPosition])
      return;

    const { width, height, top, left } = positionMapping[currentDesignPosition];
    const tShirtImageWidth = 250;
    const tShirtImageHeight = 250;

    const backgroundImage = new Image();
    backgroundImage.src = currentTshirt;
    backgroundImage.onload = () => {
      const offScreenCanvas = document.createElement("canvas");
      offScreenCanvas.width = tShirtImageWidth;
      offScreenCanvas.height = tShirtImageHeight;
      const ctx = offScreenCanvas.getContext("2d");

      if (!ctx) {
        console.error("Failed to get 2D context");
        return;
      }

      // Draw the T-shirt as the background
      ctx.drawImage(backgroundImage, 0, 0, tShirtImageWidth, tShirtImageHeight);
      const scaleX = width / canvas.getWidth();
      const scaleY = height / canvas.getHeight();
      const offsetX = (left / 100) * tShirtImageWidth - width / 2;
      const offsetY = (top / 100) * tShirtImageHeight - height / 2;

      canvas.setZoom(scaleX);
      //canvas.renderAll();

      const canvasUrl = canvas.toDataURL({
        format: "png",
        multiplier: 1,
      });

      const designImage = new Image();
      designImage.src = canvasUrl;
      designImage.onload = () => {
        ctx.drawImage(designImage, offsetX, offsetY, width, height);

        const finalImage = offScreenCanvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.download = `${currentDesignPosition}-design-with-tshirt.png`;
        link.href = finalImage;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    };
  };

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
    saveCanvasState,
    loadCanvasState,
  };
};

export default useMenuOps;
