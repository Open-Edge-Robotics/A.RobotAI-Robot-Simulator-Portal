"use client";

import React from "react";
import { cx } from "class-variance-authority";
import { TableData, TableKeys } from "@/type/_table";

type TableSectionProps = {
  headerList: string[];
  data: TableData[];
  startIndex: number;
  endIndex: number;
  isLastSection?: boolean;
};

const TableSection = ({
  headerList,
  data,
  startIndex,
  endIndex,
  isLastSection = false,
}: TableSectionProps) => {
  const headers = headerList.slice(startIndex, endIndex);
  const rows = data.slice(startIndex, endIndex);

  return (
    <div className="flex w-full flex-row text-left">
      <thead className="flex w-36 flex-col">
        {headers.map((header, index) => (
          <th
            key={`header-${index}`}
            className={cx(
              "border-r border-r-gray-100 p-4",
              index === headers.length - 1
                ? "border-b-0"
                : "border-b border-b-gray-100",
            )}
          >
            {header}
          </th>
        ))}
      </thead>
      <tbody className="flex flex-grow flex-col">
        {rows.map((row, index) => (
          <td
            key={`row-${index}`}
            className={cx(
              "p-4",
              index === rows.length - 1
                ? "border-b-0"
                : "border-b border-b-gray-100",
              isLastSection ? "border-r-0" : "border-r border-r-gray-100",
            )}
          >
            {row[headers[index] as TableKeys]}
          </td>
        ))}
      </tbody>
    </div>
  );
};

type DetailTableProps = {
  headerList: string[];
  data: TableData[];
  headersPerColumn: number;
};

const DetailTable = ({
  headerList,
  data,
  headersPerColumn,
}: DetailTableProps) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <table className={"flex w-full rounded-[4px] bg-white text-sm"}>
      <TableSection
        headerList={headerList}
        data={data}
        startIndex={0}
        endIndex={headersPerColumn}
      />
      <TableSection
        headerList={headerList}
        data={data}
        startIndex={headersPerColumn}
        endIndex={headerList.length}
        isLastSection
      />
    </table>
  );
};

export default DetailTable;
