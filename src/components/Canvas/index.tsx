import useFabricOps from "@/hooks/fabricOps";
import { fabricContext } from "@/store/context";
import { Icon, Image } from "@chakra-ui/react";
import { fabric } from "fabric";
import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";

type FabricCanvasProps = {};

const FabricCanvas: React.FC<FabricCanvasProps> = () => {
  const [canvas, setCanvas] = React.useState<fabric.Canvas>();
  const [isVisible, setIsVisible] = React.useState(false);
  const { storeCanvas, storeElementType, switchTab } =
    useContext(fabricContext);

  const { removeObject, addImage } = useFabricOps();

  React.useEffect(() => {
    const c = new fabric.Canvas("canvas", {
      height: 600,
      width: 600,
    });

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2BEBC8";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
    fabric.Object.prototype.cornerSize = 6;

    setCanvas(c);
    storeCanvas(c);

    c.on("mouse:down", onSelectionChange);
    c.on("selection:created", onSelectionChange);
    c.on("selection:updated", onSelectionChange);
    c.on("selection:cleared", onSelectionChange);

    function onSelectionChange(event: fabric.IEvent) {
      const activeObject = event.target;
      if (activeObject) {
        switch (activeObject.type) {
          case "image":
            switchTab("Upload");

            break;

          case "text":
            switchTab("Text");

            break;

          default:
            switchTab("Products");
        }
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    c.on("object:modified", (event: any) => {
      const modifiedObject = event.target;
      if (modifiedObject instanceof fabric.Text) {
        setIsVisible(true);
        console.log(
          `Text has been resized to ${modifiedObject.width}x${modifiedObject.height} pixels`
        );
      }
    });

    return () => {
      c.dispose();
    };
  }, []);

  return (
    <>
      <Icon
        onClick={removeObject}
        as={MdDelete}
        fontSize={30}
        color={isVisible ? "red" : "gray"}
      />

      <div className="h-full flex justify-center items-center">
        <Image
          src="/assets/tshirt.png"
          height={500}
          width={500}
          alt="Tshirt"
          className="absolute"
        />
        <canvas
          id="canvas"
          className="border-dashed border-2 border-red-500 h-full relative"
        ></canvas>
      </div>
    </>
  );
};
export default FabricCanvas;
