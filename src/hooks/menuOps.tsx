import { useContext } from "react";
import { fabricContext } from "@/store/context";
import { fabric } from "fabric";

interface ExtendedCanvas extends fabric.Canvas {
  clipboard?: fabric.Object[];
}

const useMenuOps = () => {
  const { canvas } = useContext(fabricContext);

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
      canvas?.forEachObject((obj) => {
        if (obj !== canvas.getActiveObject()) {
          obj.selectable = false;
        }
      });
      canvas?.requestRenderAll();
    }
  };

  const unlockLayer = () => {
    if (canvas) {
      canvas?.forEachObject((obj) => {
        obj.selectable = true;
      });
      canvas?.requestRenderAll();
    }
  };

  const emptyCanvas = () => {
    canvas?.clear();
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
  };
};

export default useMenuOps;
