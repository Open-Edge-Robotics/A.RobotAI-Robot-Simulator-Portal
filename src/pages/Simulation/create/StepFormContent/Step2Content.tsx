import { PATTERN_DATA } from "../../constants";
import type { PatternType } from "../../types";

interface Step2ContentProps {
  patternType: PatternType | null;
  onSelectPatternType: (pattern: PatternType | null) => void;
}

export default function Step2Content({ patternType, onSelectPatternType }: Step2ContentProps) {
  return (
    <div className="flex gap-5">
      <PatternCard
        pattern="sequential"
        isSelected={patternType === "sequential"}
        onClick={() => onSelectPatternType("sequential")}
      />
      <PatternCard
        pattern="parallel"
        isSelected={patternType === "parallel"}
        onClick={() => onSelectPatternType("parallel")}
      />
    </div>
  );
}

interface PatternCardProps {
  pattern: PatternType;
  isSelected: boolean;
  onClick: () => void;
}

function PatternCard({ pattern, isSelected, onClick }: PatternCardProps) {
  const patternData = PATTERN_DATA[pattern];

  if (!patternData) return null;

  return (
    <div
      className={`relative flex-1 rounded-lg border ${isSelected ? "bg-blue-10 border-blue-500" : "border-gray-100"} cursor-pointer bg-white p-6 shadow-xs hover:border-blue-500 hover:shadow-md hover:shadow-blue-50`}
      onClick={onClick}
    >
      {/* 선택됐을 경우 체크 아이콘 */}
      {isSelected && (
        <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-1">
          <span className="material-symbols-outlined text-sm text-white">check</span>
        </div>
      )}

      <div className="mb-4 flex items-center gap-3">
        {/* 패턴 아이콘 */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${patternData.iconBgColor} ${patternData.iconTextColor} `}
        >
          <span className="material-symbols-outlined">{patternData.iconName}</span>
        </div>

        {/* 제목 */}
        <h3 className="text-lg font-semibold text-gray-900">{patternData.title}</h3>
      </div>

      {/* 설명 */}
      <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600">{patternData.description}</p>
    </div>
  );
}
