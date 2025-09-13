import { Node } from "reactflow";
import { DropdownOption } from "../components/dropdown/Dropdown.types";

export const defaultNode: Node = {
  id: "in",
  position: { x: 50, y: 100 },
  data: { label: "Input" },
  type: "input",
};

export const defaultNodes: Node[] = [
  {
    id: "in0",
    position: { x: 50, y: 100 },
    data: { label: "Input" },
    type: "input",
  },
  {
    id: "in1",
    position: { x: 450, y: 100 },
    data: { label: "Output" },
    type: "output",
  },
];

export const defaultDropDownOptions: DropdownOption[] = [
  { value: "input", label: "Input" },
  { value: "output", label: "Output" },
  { value: "action", label: "Action" },
];
