import Container from "../Container.tsx";
import Icon from "../Icon";

interface LoadingFallbackProps {
  message?: string;
}

export default function LoadingFallback({ message = "정보를 불러오는 중입니다." }: LoadingFallbackProps) {
  return (
    <Container shadow>
      <div className="px-6 py-12 text-center">
        <h3 className="mb-5 text-lg font-semibold">{message}</h3>
        <Icon name="progress_activity" className="animate-spin text-blue-500" size="32px" />
      </div>
    </Container>
  );
}
