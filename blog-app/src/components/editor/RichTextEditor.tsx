import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Controller } from "react-hook-form";

type RTProps = {
  name?: string;
  control: any;
  label?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const RichTextEditor: React.FC<RTProps> = ({
  name,
  control,
  label,
  defaultValue,
  disabled,
}) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <CKEditor
            editor={ClassicEditor}
            data={defaultValue}
            disabled={disabled}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              // const data = editor.getData();
              // console.log({ event, editor, data });
              onChange(editor.getData());
            }}
            onBlur={(event, editor) => {
              // console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              // console.log("Focus.", editor);
            }}
          />
        )}
      />
    </div>
  );
};

export default RichTextEditor;
