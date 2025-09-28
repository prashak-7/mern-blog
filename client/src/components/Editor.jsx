/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoNgNARATAdA7DArBSIQE4CMm3qgDigBY4BmUxABlM0rLnUqOJCMtcwJQgFMA7FJTDBMYUeLFiAupB48AJmyhQIUoA==
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autosave,
  BalloonToolbar,
  BlockToolbar,
  Bold,
  Essentials,
  Italic,
  Markdown,
  MediaEmbed,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  Underline,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const LICENSE_KEY = "GPL";

export default function Editor({ props }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "mediaEmbed",
            "insertTable",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Autosave,
          BalloonToolbar,
          BlockToolbar,
          Bold,
          Essentials,
          Italic,

          MediaEmbed,
          Paragraph,

          PasteFromOffice,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          Underline,
        ],
        balloonToolbar: ["bold", "italic"],
        blockToolbar: ["bold", "italic", "|", "insertTable"],
        initialData: props?.initialData || "",
        licenseKey: LICENSE_KEY,
        menuBar: {
          isVisible: true,
        },
        placeholder: "Type or paste your content here!",
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
    };
  }, [isLayoutReady]);

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor editor-container_include-block-toolbar"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                onChange={props.onChange}
                editor={ClassicEditor}
                config={editorConfig}
                data={props.initialData || ""}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
