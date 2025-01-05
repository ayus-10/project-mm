import { BeatLoader as Loading } from "react-spinners";

interface ButtonContentProps {
  status: boolean | undefined;
  color: string;
  label: { active: string; inactive: string };
}

export function ButtonContent({ status, color, label }: ButtonContentProps) {
  return (
    <span className="hidden text-sm font-semibold md:inline">
      {status === true ? (
        label.active
      ) : status === false ? (
        label.inactive
      ) : (
        <Loading size={10} color={color} />
      )}
    </span>
  );
}
