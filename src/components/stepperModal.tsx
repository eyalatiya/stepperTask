"use client";
import React, { useEffect, useState } from "react";

interface propTypes {
  text: string;
  modalSteps: React.FC[];
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
  startingStep?: number;
}
// General Stepper Modal that displays given components in order, with next/back/finish logic.
// Meant to be stateless as to be used in any given context. Handling logic is done outside of this component.
const StepperModal = ({ text, modalSteps, onSubmit, startingStep }: propTypes) => {
  const [showModal, setShowModal] = useState(false);
  const [animationOpen, setAnimationOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(startingStep ? startingStep : 0);

  // We delay the modal from stopping to render in order to have it animated
  async function closeModal() {
    setAnimationOpen(false);

    await new Promise((r) => setTimeout(r, 150));

    setCurrentStep(0);
    setShowModal(false);
  }

  async function openModal() {
    setShowModal(true);
    await new Promise((r) => setTimeout(r, 10));

    setAnimationOpen(true);
  }

  const getComponentByStep = (index: number) => {
    const Component = modalSteps[index];
    return <Component />;
  };

  const _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // We use submit for the 'next' button logic to take advantage of the 'required' functionality in forms.
    // With this in mind we can handle specific data verification outside of this generalized component.
    if (currentStep < modalSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    // Actual sumbit ('finish' button) event happens here
    else {
      onSubmit && onSubmit(e);
      closeModal();
    }
  };

  return (
    <>
      <button className="p-4 border rounded-xl shadow bg-slate-900" type="button" onClick={() => openModal()}>
        {text}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              className={`relative w-auto my-6 mx-auto max-w-3xl z-50 transition-transform duration-150 ${
                animationOpen ? "scale-100" : "scale-[0.15]"
              }`}
            >
              {/*content*/}
              <form
                className="border-0 z-50 rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none"
                onSubmit={_onSubmit}
              >
                {/*body*/}
                <div className="relative px-3 pt-3 flex-auto lg:w-[500px] w-[300px] h-[150px]">{getComponentByStep(currentStep)}</div>
                {/*footer*/}
                <div className="flex items-center justify-between flex-row-reverse p-3 rounded-b-lg">
                  {currentStep < modalSteps.length - 1 ? (
                    <button className="p-4 w-1/4 border rounded-xl shadow bg-blue-700" type="submit">
                      Next
                    </button>
                  ) : (
                    <>
                      <button className="p-4 w-1/4 border rounded-xl shadow bg-green-600" type="submit">
                        Finish
                      </button>
                    </>
                  )}

                  <button
                    className="p-4 w-1/4 border rounded-xl shadow bg-slate-900 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    type="button"
                    onClick={() => {
                      currentStep > 0 && setCurrentStep(currentStep - 1);
                    }}
                    disabled={currentStep === 0}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
            <div
              className={`duration-150 transition-opacity ${
                animationOpen ? "opacity-50" : "opacity-0"
              } fixed inset-0 z-10 bg-black`}
              onClick={() => closeModal()}
            ></div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default StepperModal;
