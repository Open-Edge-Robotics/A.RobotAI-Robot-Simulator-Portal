import StatusBadge from "@/components/common/Badge/StatusBadge";
import Icon from "@/components/common/Icon";
import ProgressBar from "@/components/common/ProgressBar";

import { PATTERN_CONFIGS, STATUS_CONFIGS } from "@/constants/simulation";

import type { PatternType } from "@/types/simulation/domain";
import type { PatternGroupDetail } from "@/types/simulation/groupDetail";

interface GroupHeaderProps {
  id: number;
  patternType: PatternType;
  group: PatternGroupDetail;
  isOpen: boolean;
  toggleCard: () => void;
}

export default function GroupHeader({ id, patternType, group, isOpen, toggleCard }: GroupHeaderProps) {
  const progressPercentage = group.progress;

  return (
    <header className="hover:bg-gray-10 cursor-pointer p-5" onClick={toggleCard}>
      <div className="flex items-center gap-4">
        <GroupIndexText index={id} unit={PATTERN_CONFIGS[patternType].unit} />
        <StatusBadge status={group.status} />
        <ProgressPercentage progress={progressPercentage} />
        <ToggleIcon isOpen={isOpen} />
      </div>
      <ProgressBar
        progress={progressPercentage}
        color={STATUS_CONFIGS[group.status].highlightColor}
        className="mt-3.5"
      />
    </header>
  );
}

function GroupIndexText({ index, unit }: { index: number; unit: string }) {
  return (
    <div className="mr-auto flex items-center gap-1.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-sm font-bold">{index}</div>
      {unit}
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
