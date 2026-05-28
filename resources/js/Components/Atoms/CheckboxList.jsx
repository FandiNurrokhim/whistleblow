import React from "react";

export default function CheckboxList({ title, options, selected, onChange, disabled }) {
  return (
    <div className="mb-4">
      <p className="text-sm font-semibold mb-2">{title}</p>
      {options.map((item, idx) => {
        const inputId = `checkbox-${title}-${idx}`;
        return (
          <div key={idx} className="ml-0.5 mb-1">
            <label className="cursor-pointer relative" htmlFor={inputId}>
              <input
                type="checkbox"
                id={inputId}
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                checked={selected.includes(item)}
                onChange={() => onChange(item)}
                disabled={disabled}
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                  stroke="currentColor" strokeWidth="1">
                  <path fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"></path>
                </svg>
              </span>
            </label>
            <label htmlFor={inputId} className="cursor-pointer ml-3 text-slate-600 text-sm">
              {item}
            </label>
          </div>
        );
      })}
    </div>
  );
}