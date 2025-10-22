import { Pagination as InnogridPagination } from "innogrid-ui";

interface PaginationProps {
  currentPage: number;
  size: number;
  totalCount: number;
  onPageChange: (value: string) => void;
  onPageSizeChange: (value: string) => void;
}

export default function Pagination({ currentPage, size, totalCount, onPageChange, onPageSizeChange }: PaginationProps) {
  return (
    <div className="ml-auto w-[320px] p-0">
      <InnogridPagination
        page={currentPage}
        size={size}
        totalCount={totalCount}
        onClickPrev={() => {
          if (currentPage > 1) {
            onPageChange(String(currentPage - 1));
          }
        }}
        onClickNext={() => {
          onPageChange(String(currentPage + 1));
        }}
        onChangePageInput={(e) => {
          onPageChange(e.target.value);
        }}
        onChangePageSize={(e) => {
          onPageSizeChange(e.target.value);
        }}
      />
    </div>
  );
}
