import { Download } from "./svgs/download";
import { ChevronUp } from "./svgs/chevronUp";
import { Checklist } from "./svgs/checklist";
import { Contract } from "./svgs/contract";
import { Shield } from "./svgs/shield";

const Icon = ({
  name,
  width,
  height,
  color,
}: {
  name: "download" | "chevron" | "shield" | "contract" | "checklist";
  width: string;
  height: string;
  color: string;
}) => {
  switch (name) {
    case "download":
      return <Download color={color} height={height} width={width} />;
    case "chevron":
      return <ChevronUp color={color} height={height} width={width} />;
    case "checklist":
      return <Checklist color={color} height={height} width={width} />;
    case "contract":
      return <Contract color={color} height={height} width={width} />;
    case "shield":
      return <Shield color={color} height={height} width={width} />;
    default:
      console.warn("Incorrect icon name specified");
      return null;
  }
};

export default Icon;
