interface SubmitButtonProps {
  isLoading?: boolean;
}

export default function SubmitButton({ isLoading }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full rounded-lg cursor-pointer bg-rose-500 px-6 py-3 text-lg font-semibold text-white transition hover:bg-rose-600 active:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? "送出中..." : "確認送出"}
    </button>
  );
}
