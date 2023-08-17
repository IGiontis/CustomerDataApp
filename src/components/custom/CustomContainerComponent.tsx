import { ReactNode } from "react";

// i made this type
interface CustomContainerRowColProps {
  containerClasses: string;
  rowClasses: string;
  colClasses: string;
  children: ReactNode;
}

function CustomContainerRowCol({
  containerClasses,
  rowClasses,
  colClasses,
  children,
}: CustomContainerRowColProps) {
  return (
    <div className={`${containerClasses}`}>
      <div className={` ${rowClasses}`}>
        <div className={` ${colClasses}`}>{children}</div>
      </div>
    </div>
  );
}

export default CustomContainerRowCol;
