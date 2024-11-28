import React from "react";

type FormProps = {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-8 p-8"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
