// components/CopyToClipboardButton.js
"use client";

import { useState } from "react";
import copy from "clipboard-copy";
import { Check, Link } from "lucide-react";

const CopyToClipboard = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  return (
    <div>
      <button
        className="bg-fuchsia-200 m-1 p-2 rounded cursor-pointer"
        onClick={handleCopyClick}
      >
        {isCopied ? <Check /> : <Link />}
      </button>
    </div>
  );
};

export default CopyToClipboard;
