import type { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "type"
> {
    variant?: "outline" | "bold";
    type?: "primary" | "secondary" | "danger";
    size?: "md";
}

const classType = {
    outline: {
        primary:
            "text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white",
        secondary:
            "text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white",
        danger: "text-red-500 border border-red-500 hover:bg-red-500 hover:text-white",
    },

    bold: {
        primary:
            "text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300",

        secondary:
            "text-white bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300",

        danger: "text-white bg-red-500 hover:bg-red-600 disabled:bg-red-300",
    },

    size: {
        md: "py-2 px-4 text-base",
    },
};

const Button: FC<ButtonProps> = ({
    children,
    className = "",
    type = "primary",
    variant = "bold",
    size = "md",
    ...props
}) => {
    return (
        <button
            className={`
                rounded-lg transition-all duration-300
                ${classType[variant][type]}
                ${classType.size[size]}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
// bold: co background
// outline: co border

// xs - iphone
// sm - ipad
// md - laptop
// lg - desktop
// xl - tv
// 2xl - 4k
