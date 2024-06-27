import { useState } from "react";

const ExpandableText = ({ text }: { text: string }) => {
  const limit = 255;
  const [isExpanded, setExpanded] = useState(false);

  // if text is <255 chars, the entire text is rendered
  if (text.length <= limit) return <article>{text}</article>;

  // else it's truncated with "..." at the end
  return (
    <div>
      {isExpanded ? (
        <article>{text}</article>
      ) : (
        <article>{text.substring(0, limit)}...</article>
      )}
      {/* btn for expanding/collapsing text */}
      <button className="btn" onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default ExpandableText;
