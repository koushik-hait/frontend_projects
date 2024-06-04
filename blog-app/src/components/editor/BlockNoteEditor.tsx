import { expressApi } from "@/lib/axios-conf";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

type EditorProps = {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

export const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable,
}) => {
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await expressApi.post(`/public/upload/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status !== 200) {
      return "https://placehold.it/200x200";
    }
    return response.data.data.fileUrl;
  };
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        onChange={() => {
          onChange(JSON.stringify(editor.document, null, 2));
        }}
        editable={editable}
        formattingToolbar={false}
      ></BlockNoteView>
    </div>
  );
};
