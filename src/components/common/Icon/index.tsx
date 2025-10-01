interface IconProps {
  name: string;
  fill?: boolean;
  size?: string;
  className?: string;
}

/**
 *
 * @param name google material icon 이름
 * @param fill 채우기 여부
 * @param size 아이콘 크기 px 단위 (예: "24px")
 * @param className 추가 클래스
 * @returns
 */
export default function Icon({ name, fill = false, size, className }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: `'FILL' ${fill ? "1" : "0"}`, fontSize: size }}
    >
      {name}
    </span>
  );
}
