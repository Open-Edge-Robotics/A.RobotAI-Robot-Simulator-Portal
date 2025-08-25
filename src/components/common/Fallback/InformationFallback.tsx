import Container from "../Container.tsx/index.tsx";
import Icon from "../Icon/index.tsx";

interface InformationFallbackProps {
  message: string;
  subMessage?: string;
  children?: React.ReactNode;
}

export default function InformationFallback({ message, subMessage, children }: InformationFallbackProps) {
  return (
    <Container shadow>
      <div className="flex flex-col items-center px-6 py-12 text-center">
        <div className="mb-5 flex items-center rounded-full bg-gray-50 p-4">
          <Icon name="robot_2" className="text-gray-500" size="48px" fill />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{message}</h3>
        {subMessage && <p className="mb-6 text-sm text-gray-500">{subMessage}</p>}
        {children}
      </div>
    </Container>
  );
}
