import IconButton from "@/components/common/IconButton.tsx";

export default function CardHeader({ name }: { name: string }) {
  return (
    <div className="mb-2.5 flex justify-between">
      <h3 className="font-semibold">{name}</h3>
      <ActionButtons />
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex gap-1">
      <IconButton
        iconName="edit"
        className={`flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-blue-50 hover:text-blue-500 active:text-blue-700 disabled:bg-white`}
      />
      <IconButton
        iconName="delete"
        className={`flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-red-50 hover:text-red-500 active:text-red-700 disabled:bg-white`}
      />
    </div>
  );
}
