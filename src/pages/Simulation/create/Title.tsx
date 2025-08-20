// TODO: 공통 컴포넌트로 이동
export default function Title({ title }: { title: string }) {
  return <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>;
}
