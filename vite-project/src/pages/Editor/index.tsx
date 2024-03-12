import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import type Event from "@ckeditor/ckeditor5-utils/src/eventinfo";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type EditorProps = {
  initiateData?: string;
  onReady?: (editor: DecoupledEditor) => void;
  onChange?: (event: Event, editor: DecoupledEditor) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

const Editor: React.FC<EditorProps> = (props) => {
  const { initiateData, onBlur, onFocus, onChange, onReady } = props;
  // const [ready, setReady] = useState<boolean>(false)
  return (
    <CKEditor
      //@ts-ignore
      editor={ClassicEditor}
      data={initiateData || ""}
      onReady={(editor) => {
        onReady?.(editor);
        // You can store the "editor" and use when it is needed.
        //@ts-ignore
        // editor.ui.view.editable.editableElement?.style.height = '300px';
        //@ts-ignore
        editor.ui.getEditableElement().parentElement.insertBefore(
          //@ts-ignore
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
      }}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
export default Editor;
