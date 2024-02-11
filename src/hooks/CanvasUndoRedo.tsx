import React from "react";
import { fabric } from "fabric";

interface CanvasState {
  state: fabric.Canvas;
}

const useCanvasUndoRedo = () => {
  const [undoStack, setUndoStack] = React.useState<CanvasState[]>([]);
  const [redoStack, setRedoStack] = React.useState<CanvasState[]>([]);

  React.useEffect(() => {
    console.log("undoStack changed:", undoStack);
  }, [undoStack]);

  const saveCanvasState = (canvas: fabric.Canvas) => {
    const state = canvas.toObject();
    setUndoStack((prevStack) => [...prevStack, { state }]);
    setRedoStack([]);
  };

  const undo = (canvas: fabric.Canvas) => {
    console.log("UNDO", undoStack);

    if (undoStack.length > 0) {
      // Use a local variable to store the updated undoStack
      const updatedUndoStack = [...undoStack];
      const lastState = updatedUndoStack.pop();
      if (lastState) {
        const { state } = lastState;
        canvas.loadFromJSON(state, () => {
          canvas.renderAll();
          setUndoStack(updatedUndoStack); // Update undoStack after performing the undo action
          setRedoStack((prevStack) => [...prevStack, lastState]);
        });
      }
    }
  };

  const redo = (canvas: fabric.Canvas) => {
    console.log("redo clicked", redoStack);

    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      if (nextState) {
        const { state } = nextState;
        canvas.loadFromJSON(state, () => {
          canvas.renderAll();
          setUndoStack((prevStack) => [...prevStack, nextState]);
        });
      }
    }
  };

  return { saveCanvasState, undo, redo };
};

export default useCanvasUndoRedo;
