import React from "react";
import Navbar from "@/components/common/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="bg-black w-full flex-grow overflow-x-hidden p-8 pt-6">
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
