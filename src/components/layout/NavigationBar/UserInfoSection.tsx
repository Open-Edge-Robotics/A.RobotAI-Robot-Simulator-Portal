import Icon from "@/components/common/Icon";

import { ICONS } from "@/constants/icon";

import { useAuth } from "@/hooks/auth/useAuth";

export default function UserInfoSection() {
  const { user } = useAuth();

  return (
    <div className="border-b border-gray-100 p-4 lg:px-6">
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
          <Icon name={ICONS.user} className="text-gray-500" size="28px" />
        </div>
        <div>
          <div className="text-sm font-semibold">{user?.email || "게스트"}</div>
          <div className="text-xs text-gray-500">{user?.role || "로그인이 필요합니다"}</div>
        </div>
      </div>
    </div>
  );
}
