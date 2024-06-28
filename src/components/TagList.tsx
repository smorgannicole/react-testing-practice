import delay from "delay";
import { useEffect, useState } from "react";

const TagList = () => {
  const [tags, setTags] = useState<string[]>([]);

  // effect hook here is used to simulate fetching tags from backend by calling delay fxn and waiting 500ms
  useEffect(() => {
    const fetchTags = async () => {
      await delay(500);
      setTags(["tag1", "tag2", "tag3"]);
    };
    fetchTags();
  });

  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
};

export default TagList;
