export default function Backdrop({ onClick }: { onClick: () => void }) {
  return <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={onClick} />;
}
