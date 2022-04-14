import { Download } from "./svgs/download";
import { ChevronUp } from "./svgs/chevronUp";

const Icon = ({
  name,
  width,
  height,
  color,
}: {
  name: "download" | "chevron";
  width: string;
  height: string;
  color: string;
}) => {
  switch (name) {
    case "download":
      return <Download color={color} height={height} width={width} />;
    case "chevron":
      return <ChevronUp color={color} height={height} width={width} />;
    default:
      console.warn("Incorrect icon name specified");
      return null;
  }
};

export default Icon;
