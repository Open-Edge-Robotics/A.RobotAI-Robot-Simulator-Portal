import React from "react";
import Step from "./Step";

interface StepperProps {
  activeStep: number;
  steps: string[];
}

export default function Stepper({ activeStep, steps }: StepperProps) {
  return (
    <div className="flex w-full items-center p-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Step
            label={step}
            stepNumber={index + 1}
            isCompleted={index < activeStep}
            isActive={index === activeStep}
          />

          {/* Connector Line between steps */}
          {index < steps.length - 1 && <ConnectorLine />}
        </React.Fragment>
      ))}
    </div>
  );
}

function ConnectorLine() {
  return <div className="mx-4 h-px max-w-30 min-w-16 flex-1 bg-gray-500" />;
}
