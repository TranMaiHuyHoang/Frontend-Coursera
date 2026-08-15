"use client";

import type { InputHTMLAttributes } from "react";

interface RadioButtonProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange"
> {
    onChange?: (value: string) => void;
}

const RadioButton = ({
    className,
    checked,
    onChange,
    ...props
}: RadioButtonProps) => {
    return (
        <label className="group flex cursor-pointer items-center gap-2">
            <input
                type="radio"
                checked={checked}
                className={`peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white transition-all checked:border-blue-500 checked:bg-blue-500 checked:shadow-[inset_0_0_0_3px_white] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                onChange={(e) => onChange?.(e.target.value)}
                {...props}
            />
        </label>
    );
};

export default RadioButton;
