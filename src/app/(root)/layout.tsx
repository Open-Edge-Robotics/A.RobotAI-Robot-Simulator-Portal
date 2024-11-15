import React from "react";
import Navbar from "@/components/common/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="bg-black flex-grow p-8 pt-6">{children}</main>
    </div>
  );
};

export default RootLayout;
