import StatusBadge from "@/components/common/Badge/StatusBadge";

import Icon from "@/components/common/Icon";
import ProgressBar from "@/components/common/ProgressBar";

import { PATTERN_CONFIGS, STATUS_CONFIGS } from "@/constants/simulation";
import type { PatternType } from "@/types/simulation/domain";

import type { GroupDetail } from "@/types/simulation/simulationDetail";

interface StepHeaderProps {
  id: number;
  patternType: PatternType;
  group: GroupDetail;
  isOpen: boolean;
  toggleCard: () => void;
}

export default function GroupHeader({ id, patternType, group, isOpen, toggleCard }: StepHeaderProps) {
  return (
    <div className="hover:bg-gray-10 cursor-pointer p-5" onClick={toggleCard}>
      <div className="flex items-center gap-4">
        <GroupIndexText index={id} unit={PATTERN_CONFIGS[patternType].unit} />
        <GroupTemplate />
        <StatusBadge status={group.status} />
        <ProgressPercentage progress={group.progress} />
        <ToggleIcon isOpen={isOpen} />
      </div>
      <ProgressBar progress={group.progress} color={STATUS_CONFIGS[group.status].highlightColor} className="mt-3.5" />
    </div>
  );
}

function GroupIndexText({ index, unit }: { index: number; unit: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-sm font-bold">{index}</div>
      {unit}
    </div>
  );
}

function GroupTemplate() {
  return (
    <div
      className="mr-auto ml-[-6px] rounded-md p-1.5 text-sm text-gray-600 hover:bg-gray-50"
      onClick={(e) => {
        alert("TODO: 템플릿 모달 띄우기");
        e.stopPropagation();
      }}
    >
      템플릿
    </div>
  );
}

function ProgressPercentage({ progress }: { progress: number }) {
  return <div className="text-sm font-semibold">{progress.toFixed(1)}%</div>;
}

function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="flex items-center">
      {isOpen ? <Icon name="keyboard_arrow_up" /> : <Icon name="keyboard_arrow_down" />}
    </div>
  );
}
