export default function UserInfoSection() {
  return (
    <div className="border-b border-gray-100 p-4 lg:px-6">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-800 text-sm font-semibold text-white">
          A
        </div>
        <div>
          <div className="text-sm font-semibold">admin@robotics.ai</div>
          <div className="text-xs text-gray-500">관리자</div>
        </div>
      </div>
    </div>
  );
}
