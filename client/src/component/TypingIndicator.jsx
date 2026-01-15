import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 text-sm text-neutral-400">
      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
    </div>
  );
};

export default TypingIndicator;
