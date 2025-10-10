/**
 * ISO Datestring을 yyyy-mm-dd hh:mm 형식으로 변환
 */
export const formatDateTime = (dateString: string): string => {
  // +00:00Z 형식에서 중복된 Z 제거 (+00:00과 Z 모두 UTC를 의미하므로)
  const normalizedDateString = dateString.replace(/\+00:00Z$/, "+00:00");
  const date = new Date(normalizedDateString);

  if (isNaN(date.getTime())) {
    return "유효하지 않은 날짜 형식입니다.";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

/**
 * 밀리초를 읽기 쉬운 형태로 변환 (예: 1일 2시간, 3시간 15분, 45초)
 */
export const formatMsToGeneralForm = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}일 ${hours % 24}시간`;
  if (hours > 0) return `${hours}시간 ${minutes % 60}분`;
  if (minutes > 0) return `${minutes}분 ${seconds % 60}초`;

  return `${seconds}초`;
};

/**
 * Date 객체를 yyyy-mm-dd 형식의 문자열로 변환
 */
export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
