import Badge from "@/components/common/Badge";

export default function Topics({ topics }: { topics: string[] }) {
  const isEmpty = topics.length === 0 || (topics.length === 1 && topics[0].trim() === "");

  if (isEmpty) {
    return <div className="text-sm text-gray-600">토픽 없음</div>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {topics.map((topic, index) => (
        <Badge
          text={topic}
          textColor="text-blue-600"
          bgColor="bg-blue-50"
          fontSize="text-sm"
          key={`${topic}_${index}`}
        />
      ))}
    </div>
  );
}
