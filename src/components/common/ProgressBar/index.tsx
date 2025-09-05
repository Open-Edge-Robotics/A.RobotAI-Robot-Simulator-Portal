interface ProgressBarProps {
  progress: number;
  color?: string;
  className?: string;
}

export default function ProgressBar({ progress, color = "bg-green-500", className }: ProgressBarProps) {
  return (
    <div className={`h-2.5 rounded-lg bg-gray-100 ${className}`}>
      <div className={`h-2.5 rounded-lg ${color}`} style={{ width: `${progress}%` }} />
    </div>
  );
}
