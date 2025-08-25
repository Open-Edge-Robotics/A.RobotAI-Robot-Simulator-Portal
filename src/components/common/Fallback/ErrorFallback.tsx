import { useNavigate } from "react-router-dom";

import { Button } from "innogrid-ui";

import Container from "../Container.tsx";
import Icon from "../Icon";

interface ErrorFallbackProps {
  onRetry?: () => void;
  message?: string;
  subMessage?: string;
  showBackButton?: boolean;
}

export default function ErrorFallback({
  onRetry,
  message = "에러가 발생했습니다",
  subMessage,
  showBackButton = false,
}: ErrorFallbackProps) {
  const navigate = useNavigate();

  return (
    <Container shadow>
      <div className="flex flex-col items-center px-6 py-12 text-center">
        <Icon name="error" className="mb-4 text-red-500" size="48px" />
        <h3 className="mb-2 text-lg font-semibold">{message}</h3>
        {subMessage && <p className="mb-6 text-sm text-gray-500">{subMessage}</p>}
        <div className="flex gap-3">
          {onRetry && (
            <Button onClick={onRetry} size="medium" color="primary">
              <div className="flex items-center gap-1">
                <Icon name="refresh" size="20px" className="mt-0.5 ml-[-4px]" />
                <span>다시 시도</span>
              </div>
            </Button>
          )}
          {showBackButton && (
            <Button onClick={() => navigate(-1)} size="medium" color="secondary">
              이전 페이지로
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}
