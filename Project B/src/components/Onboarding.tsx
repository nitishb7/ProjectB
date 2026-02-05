import { useState } from "react";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    "Science",
    "Mathematics",
    "History",
    "Art",
    "Technology",
    "Language",
    "Music",
    "Physics",
    "Chemistry",
    "Biology",
    "Literature",
    "Philosophy",
    "Economics",
    "Psychology",
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedInterests.length >= 3;
    return true;
  };

  return (
    <div className="h-screen bg-gradient-to-br from-neutral-900 via-neutral-950 to-black flex flex-col items-center justify-center p-6">
      {/* Progress Dots */}
      <div className="flex gap-2 mb-16">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === step
                ? "w-8 bg-white"
                : index < step
                  ? "w-1.5 bg-white/50"
                  : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Content Card */}
      <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl">
        
        {/* Screen 1 - Welcome */}
        {step === 0 && (
          <div className="text-center">
            <h1 className="text-white text-[28px] tracking-tight mb-3">
              Welcome to Project B
            </h1>
            <p className="text-gray-400 text-[15px] mb-12 leading-relaxed">
              Short lessons. Real understanding.
            </p>

            <button
              onClick={handleNext}
              className="w-full bg-white text-black py-3.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              Next
            </button>

            <button
              onClick={onComplete}
              className="w-full text-center text-gray-500 text-[13px] mt-4 hover:text-gray-400 transition-colors"
            >
              Skip
            </button>
          </div>
        )}

        {/* Screen 2 - Interests */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-white text-[28px] tracking-tight mb-3">
                What do you want to learn?
              </h2>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                Choose a few topics to get started.
              </p>
            </div>

            <div className="mb-8">
              <p className="text-gray-500 text-[12px] mb-4">
                Pick at least 3
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2.5 rounded-full text-[14px] transition-all ${
                      selectedInterests.includes(interest)
                        ? "bg-white/15 text-white border border-white/30"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-gray-300"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex-1 py-3.5 rounded-full border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex-1 py-3.5 rounded-full transition-all ${
                  canProceed()
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-white/10 text-gray-600 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Screen 3 - Start Learning */}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-white text-[28px] tracking-tight mb-3">
              You're ready to learn
            </h2>
            <p className="text-gray-400 text-[15px] mb-12 leading-relaxed">
              Let's get started.
            </p>

            <button
              onClick={onComplete}
              className="w-full bg-white text-black py-3.5 rounded-full hover:bg-gray-100 transition-colors mb-3"
            >
              Get Started
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full text-center text-gray-500 text-[13px] hover:text-gray-400 transition-colors"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}