interface InputTextProps extends Omit<
    React.ComponentProps<"input">,
    "onChange"
> {
    placeholder?: string; // props
    onChange?: (value: string) => void; // props

}

// kế thừa ComponentProps từ input, không lấy onChange
//  tự động nhận được các props từ input, optional props
// ...props: value, onChange

const InputText = ({
    className = "",
    type = "text",
    placeholder,
    disabled,
    onChange,
    ...props
}: InputTextProps) => {
    return (
        <input
            className={`w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[14px] placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className} `}
            type={type}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            {...props}
        />
    );
};

export default InputText;

// e.target.value
