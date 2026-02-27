import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ error, className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border px-4 py-2.5 text-sm placeholder:text-gray-500 text-gray-900 outline-none transition focus:ring-2 focus:ring-rose-400 ${
        error
          ? "border-red-400 bg-red-50 focus:ring-red-300"
          : "border-gray-300 bg-white focus:border-rose-400"
      } ${className}`}
    />
  );
}
