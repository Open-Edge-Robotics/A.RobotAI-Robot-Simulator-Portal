import Header from "./Header";
import NavigationBar from "./NavigationBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full grid-cols-[auto_1fr] grid-rows-[auto_1fr] text-gray-900">
      <NavigationBar />
      <Header />
      <main>{children}</main>
    </div>
  );
}
