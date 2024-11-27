"use client";

import React from "react";
import { cx } from "class-variance-authority";
import { HEADER_LIST, HEADER_MAP } from "@/constants/_tableHeader";
import { InstanceDetailResponse } from "@/type/response/_instance";

type TableSectionProps = {
  headerList: typeof HEADER_LIST;
  data: InstanceDetailResponse;
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

  return (
    <table className="flex w-full flex-row text-left">
      <thead className="flex w-36 flex-col">
        {headers.map((header, index) => (
          <tr
            key={`header-${index}`}
            className={cx(
              "border-r border-r-gray-100 p-4",
              index === headers.length - 1
                ? "border-b-0"
                : "border-b border-b-gray-100",
            )}
          >
            <th className="text-sm font-medium">{header}</th>
          </tr>
        ))}
      </thead>
      <tbody className="flex flex-grow flex-col">
        {headers.map((header, index) => (
          <tr
            key={`row-${index}`}
            className={cx(
              "p-4",
              index === headerList.length - 1
                ? "border-b-0"
                : "border-b border-b-gray-100",
              isLastSection ? "border-r-0" : "border-r border-r-gray-100",
            )}
          >
            <td className="text-sm font-normal">
              {data[HEADER_MAP[header] as keyof InstanceDetailResponse]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

type DetailTableProps = {
  headerList: string[];
  data: InstanceDetailResponse;
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
    <div className={"flex w-full rounded-[4px] bg-white text-sm"}>
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
    </div>
  );
};

export default DetailTable;
