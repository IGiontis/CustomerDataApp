import { ReactNode } from "react";

function CustomContainerRowCol({
  containerClasses,
  rowClasses,
  colClasses,
  children,
}: {
  containerClasses: string;
  rowClasses: string;
  colClasses: string;
  children: ReactNode;
}) {
  return (
    <div className={`${containerClasses}`}>
      <div className={` ${rowClasses}`}>
        <div className={` ${colClasses}`}>{children}</div>
      </div>
    </div>
  );
}

export default CustomContainerRowCol;
