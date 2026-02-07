interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={`h-1.5 rounded-full transition-all ${
            step === currentStep
              ? "w-8 bg-gray-900"
              : step < currentStep
                ? "w-6 bg-gray-400"
                : "w-6 bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
