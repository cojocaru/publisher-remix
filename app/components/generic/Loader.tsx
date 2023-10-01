import { PropsWithChildren } from "react";

interface LoaderProps {
  loading: boolean;

  size?: "small" | "medium" | "large";
}

export default function Loader(props: PropsWithChildren<LoaderProps>) {
  const { loading } = props;

  const getSize = () => {
    switch (props.size) {
      case "small":
        return "h-4 w-4";
      case "medium":
        return "h-6 w-6";
      default:
        return "h-8 w-8";
    }
  };

  const getLoader = () => {
    if (!loading) return null;

    return (
      <div className="fixed z-50 top-0 w-full h-full flex flex-col items-center justify-center">
        <svg
          className={`animate-spin ${getSize()}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="lightgray"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="gray"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  };

  return (
    <div
      className="contents"
      style={{
        pointerEvents: loading ? "none" : "auto",
        opacity: loading ? 0.7 : 1,
      }}
    >
      {props.children}
      {getLoader()}
    </div>
  );
}
