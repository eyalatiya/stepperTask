"use client";
import { InfoModalNameStep, InfoModalAgeStep, InfoModalReviewStep } from "@/components/infoModal/infoModalSteps";
import StepperModal from "@/components/stepperModal";
import { createContext, useEffect, useState } from "react";

interface storedItemsTypes {
  firstName?: string;
  lastName?: string;
  age?: number;
}

const infoModalItems = "infoModalItems";

// Since our stepper modal is stateless we use context to handle the states
export const InfoModalContext = createContext<{
  firstName?: [string | undefined, (firstName: string | undefined) => void];
  lastName?: [string | undefined, (lastName: string | undefined) => void];
  age?: [number | undefined, (age: number | undefined) => void];
}>({});

export default function MainPage() {
  // Our data is stored outside since the modal component is stateless (besides internal states)
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [age, setAge] = useState<number>();

  useEffect(() => {
    const startingItems = localStorage.getItem(infoModalItems);
    if (startingItems) {
      const infoModalStartingData: storedItemsTypes = JSON.parse(startingItems);
      // Uncomment if we want the saved data to be remembered in the modal
      // setFirstName(infoModalStartingData.firstName);
      // setLastName(infoModalStartingData.lastName);
      // setAge(infoModalStartingData.age);
    }
  }, []);

  const onSubmit = () => {
    localStorage.setItem(infoModalItems, JSON.stringify({ firstName: firstName, lastName: lastName, age: age }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <InfoModalContext.Provider
        value={{ firstName: [firstName, setFirstName], lastName: [lastName, setLastName], age: [age, setAge] }}
      >
        <StepperModal
          text="Open Modal"
          modalSteps={[InfoModalNameStep, InfoModalAgeStep, InfoModalReviewStep]}
          onSubmit={onSubmit}
        />
      </InfoModalContext.Provider>
    </div>
  );
}
