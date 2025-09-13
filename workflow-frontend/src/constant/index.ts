import { Node } from "reactflow";
import { DropdownOption } from "../components/dropdown/Dropdown.types";

export const defaultNodes: Node[] = [
  {
    id: "in",
    position: { x: 50, y: 100 },
    data: { label: "Input" },
    type: "input",
  },
  {
    id: "out",
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
