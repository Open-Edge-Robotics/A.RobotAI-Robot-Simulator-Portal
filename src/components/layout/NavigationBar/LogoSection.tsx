import IconButton from "@/components/common/IconButton.tsx";

import { ICONS } from "@/constants/icon";

interface LogoSectionProps {
  onClose?: () => void;
}

export default function LogoSection({ onClose }: LogoSectionProps) {
  return (
    <div className="flex h-18 items-center justify-between border-b border-gray-100 px-4 lg:h-24 lg:gap-2 lg:px-6">
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-800 text-xs font-bold text-white lg:h-10 lg:w-10">
          로고
        </div>
        <div>
          <div className="text-lg font-bold lg:text-xl">RoboSim</div>
          <div className="text-xs text-gray-500">K8s Dashboard</div>
        </div>
      </div>
      {onClose && (
        <IconButton
          iconName={ICONS.close}
          onClick={onClose}
          aria-label="메뉴 닫기"
          title="메뉴 닫기"
          className="rounded-md p-2 hover:bg-gray-50"
        />
      )}
    </div>
  );
}
