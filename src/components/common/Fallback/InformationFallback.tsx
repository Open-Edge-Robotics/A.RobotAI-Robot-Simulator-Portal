import Container from "../Container.tsx/index.tsx";
import Icon from "../Icon/index.tsx";

interface InformationFallbackProps {
  message: string;
  subMessage?: string;
  removeBorder?: boolean;
  children?: React.ReactNode;
}

export default function InformationFallback({
  message,
  subMessage,
  removeBorder = false,
  children,
}: InformationFallbackProps) {
  return (
    <Container shadow borderColor={removeBorder ? "border-transparent" : "border-gray-100"}>
      <div className="flex flex-col items-center px-6 py-12 text-center">
        <div className="mb-5 flex items-center rounded-full bg-gray-50 p-4">
          <Icon name="robot_2" className="text-gray-500" size="48px" fill />
        </div>
        <h3 className="text-lg font-semibold">{message}</h3>
        {subMessage && <p className="mt-2 text-sm text-gray-500">{subMessage}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </Container>
  );
}
