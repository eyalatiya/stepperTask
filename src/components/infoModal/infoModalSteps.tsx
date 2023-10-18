import { InfoModalContext } from "@/app/page";
import React, { useContext } from "react";

export const InfoModalNameStep = () => {
  const context = useContext(InfoModalContext);
  const [firstName, setFirstName] = context.firstName ? context.firstName : [];
  const [lastName, setLastName] = context.lastName ? context.lastName : [];
  return (
    <div className="text-black flex flex-col gap-5 h-full">
      <input
        type="text"
        onChange={(e) => {
          let value = e.target.value;

          value = value.replace(/[0-9]/g, "");
          setFirstName && setFirstName(value);
        }}
        placeholder="First Name"
        value={firstName}
        required
        className="border rounded-xl border-slate-700 p-3"
      />
      <input
        type="text"
        onChange={(e) => {
          let value = e.target.value;

          value = value.replace(/[0-9]/g, "");
          setLastName && setLastName(value);
        }}
        placeholder="Last Name"
        value={lastName}
        required
        className="border rounded-xl border-slate-700 p-3"
      />
    </div>
  );
};

export const InfoModalAgeStep = () => {
  const context = useContext(InfoModalContext);
  const [age, setAge] = context.age ? context.age : [];
  return (
    <div className="text-black flex flex-col gap-5 h-full justify-center">
      <input
        type="number"
        onChange={(e) => {
          let value: number | undefined = +e.target.value;
          value = value < 0 ? 0 : value;
          value = value > 120 ? 120 : value;
          setAge && setAge(value);
        }}
        placeholder="Age"
        value={age}
        required
        className="border rounded-xl border-slate-700 p-3"
      />
    </div>
  );
};

export const InfoModalReviewStep = () => {
  const context = useContext(InfoModalContext);
  const [firstName] = context.firstName ? context.firstName : [];
  const [lastName] = context.lastName ? context.lastName : [];
  const [age] = context.age ? context.age : [];

  return (
    <div className="text-black flex flex-col gap-5 h-full rounded-xl bg-slate-200 shadow-inner p-3">
      <h1>First Name: {firstName}</h1>
      <h1>Last Name: {lastName}</h1>
      <h1>Age: {age}</h1>
    </div>
  );
};
