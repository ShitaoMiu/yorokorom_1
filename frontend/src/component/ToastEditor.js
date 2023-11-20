import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
const ToastEditor = forwardRef(
  ({ initialValue = "", onContentChange }, ref) => {
    const [initialValueState, setInitialValueState] = useState(initialValue); // initialValue 값을 상태값으로 관리

    // Editor DOM 선택용
    const editorRef = useRef(null);

    useEffect(() => {
      if (editorRef.current) {
        if (initialValue === "") {
          editorRef.current.getInstance().reset();
        } else {
          editorRef.current.getInstance().setMarkdown(initialValue); // cursor를 초기값의 뒤에 위치시킴
          setInitialValueState(initialValue);
        }
      }
    }, [initialValue]);

    const handleEditorContent = () => {
      const content = editorRef.current?.getInstance().getMarkdown();
      onContentChange(content);
    };

    useImperativeHandle(ref, () => ({
      getMarkdown: () => editorRef.current?.getInstance().getMarkdown(),
      getHTML: () => editorRef.current?.getInstance().getHTML(),
      focus: () => {
        editorRef.current.getInstance().focus();
      },
    }));

    return (
      <>
        <Editor
          placeholder="내용을 입력해주세요."
          previewStyle="vertical" // 미리보기 스타일 지정
          height="300px" // 에디터 창 높이
          initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
          initialValue={initialValueState}
          toolbarItems={[
            // 툴바 옵션 설정
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "image", "link"],
            ["code", "codeblock"],
          ]}
          ref={editorRef}
          useCommandShortcut={true} // 키보드 입력 컨트롤 방지
          onChange={handleEditorContent}
        />
      </>
    );
  }
);

export default ToastEditor;
