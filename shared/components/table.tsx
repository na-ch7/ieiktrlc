import React, { HTMLAttributes, useState } from "react";
import { cx } from "@emotion/css";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  columns: {
    field: string;
    title: string;
  }[];

  data: {
    id: number | string;
    [key: string]:
      | string
      | number
      | JSX.Element
      | boolean
      | Record<string, unknown>
      | undefined;
  }[];
}

const Table = ({ columns, data, className, ...rest }: TableProps) => {
  const [fields] = useState(columns.map(({ field }) => field));
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleRowMouseEnter = (index: number) => {
    setHoveredRow(index);
  };

  const handleRowMouseLeave = () => {
    setHoveredRow(null);
  };

  return (
    <table
      cellSpacing={0}
      cellPadding={0}
      className={cx("w-full text-center", className)}
      {...rest}
    >
      <thead>
        <tr style={{ backgroundColor: '#072136' }}> {/* Header background color */}
          {columns.map((column) => (
            <th
              className="border border-black text-white"
              key={column.field}
            >
              <div className="flex flex-grow justify-center p-2">
                {column.title}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          const isHovered = hoveredRow === index;

          return (
            <tr
              key={item.id}
              onMouseEnter={() => handleRowMouseEnter(index)}
              onMouseLeave={handleRowMouseLeave}
              className={cx(
                "border border-black",
                isHovered ? "bg-gray-100" : "bg-white",
                { "hover:bg-gray-200": !isHovered }
              )}
            >
              {fields.map((field) => (
                <td
                  className="border border-black py-1 px-2"
                  key={field}
                >
                  {item[field]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
