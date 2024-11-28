import React from "react";

type Props = {
  children: React.ReactNode;
};

const FormButtonContainer = ({ children }: Props) => {
  return <div className="ml-auto flex gap-2">{children}</div>;
};

export default FormButtonContainer;
