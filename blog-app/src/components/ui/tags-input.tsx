import { useState } from "react";
import { Input } from "./input";

type TagsInputProps = {
  initialValue?: string[];
  onTagsChange: (tags: string[]) => void;
};

const TagsInput = ({ initialValue, onTagsChange }: TagsInputProps) => {
  const [tags, setTags] = useState(
    initialValue || [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "API",
      "Web Development",
      "Fullstack",
      "Frontend",
    ]
  );

  const handleKeyDown = (e: any) => {
    // If user did not press enter key, return
    if (e.key !== "Enter") return;
    // Get the value of the input
    const value = e.target.value;
    // If the value is empty, return
    if (!value.trim()) return;
    // Add the value to the tags array
    setTags([...tags, value]);
    onTagsChange([...tags, value]);
    // Clear the input
    e.target.value = "";
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };
  return (
    <div className="w-full flex items-center flex-wrap gap-2 mt-4 p-2">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="inline-block px-2 py-2 rounded bg-[rgb(218, 216, 216)] rounded-full border-2 border-cyan-700 border-solid"
        >
          <span className="text">{tag}</span>
          <span
            onClick={() => removeTag(index)}
            className="w-[20px] h-[20px] bg-[rgb(48, 48, 48)] text-[#d32c2c] rounded-full inline-flex justify-center items-center ml-2 cursor-pointer "
          >
            &times;
          </span>
        </div>
      ))}

      <Input
        type="text"
        onKeyDown={handleKeyDown}
        className="w-full text-3xl font-bold border-none focus:outline-none focus:ring-0 focus:border-none placeholder-gray-300 placeholder-opacity-100 bg-transparent"
        placeholder="Add Tags Here..."
      />
    </div>
  );
};

export default TagsInput;
