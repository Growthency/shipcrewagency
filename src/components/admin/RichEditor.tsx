"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Heading4,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Minus,
  Upload,
  Undo2,
  Redo2,
  Pilcrow,
  Table,
  FileCode2,
  Eye,
} from "lucide-react";
import { useAdminUI } from "./AdminUI";

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  /** Bump to re-seed the editor DOM from `value`. */
  resetKey?: number | string;
  placeholder?: string;
}

export default function RichEditor({
  value,
  onChange,
  resetKey,
  placeholder = "Write your post…",
}: RichEditorProps) {
  const { toast, prompt } = useAdminUI();
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const onChangeRef = useRef(onChange);
  const initializedRef = useRef(false);
  const savedSelectionRef = useRef<Range | null>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"visual" | "html">("visual");

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Seed the contentEditable once when content first arrives.
  useEffect(() => {
    if (viewMode !== "visual") return;
    if (editorRef.current && value && !initializedRef.current) {
      editorRef.current.innerHTML = value;
      initializedRef.current = true;
    }
  }, [value, viewMode]);

  // Re-seed on resetKey change (e.g. data loaded into edit form).
  useEffect(() => {
    if (resetKey === undefined) return;
    if (viewMode !== "visual") return;
    if (!editorRef.current) return;
    editorRef.current.innerHTML = value ?? "";
    initializedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  const syncContent = useCallback(() => {
    if (editorRef.current) onChangeRef.current(editorRef.current.innerHTML);
  }, []);

  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

  const restoreSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && savedSelectionRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    }
  }, []);

  const detectFormats = useCallback(() => {
    const formats = new Set<string>();
    try {
      if (document.queryCommandState("bold")) formats.add("bold");
      if (document.queryCommandState("italic")) formats.add("italic");
      if (document.queryCommandState("underline")) formats.add("underline");
      if (document.queryCommandState("strikeThrough"))
        formats.add("strikeThrough");
      if (document.queryCommandState("insertUnorderedList"))
        formats.add("insertUnorderedList");
      if (document.queryCommandState("insertOrderedList"))
        formats.add("insertOrderedList");
      const block = document.queryCommandValue("formatBlock");
      if (block) formats.add(block.toLowerCase());
    } catch {
      /* ignore */
    }
    setActiveFormats(formats);
  }, []);

  const exec = useCallback(
    (command: string, val?: string) => {
      editorRef.current?.focus();
      document.execCommand(command, false, val);
      syncContent();
      detectFormats();
    },
    [syncContent, detectFormats],
  );

  const toggleViewMode = useCallback(() => {
    if (viewMode === "visual") {
      if (editorRef.current) onChangeRef.current(editorRef.current.innerHTML);
      setViewMode("html");
    } else {
      initializedRef.current = false;
      setViewMode("visual");
    }
  }, [viewMode]);

  const toggleHeading = (level: number) => {
    const tag = `h${level}`;
    const current = document.queryCommandValue("formatBlock").toLowerCase();
    exec("formatBlock", current === tag ? "p" : tag);
  };

  const toggleBlock = (tag: string) => {
    const current = document.queryCommandValue("formatBlock").toLowerCase();
    exec("formatBlock", current === tag ? "p" : tag);
  };

  const insertLink = async () => {
    saveSelection();
    const url = await prompt({
      title: "Insert Link",
      label: "Link URL",
      defaultValue: "https://",
      placeholder: "https://example.com",
      confirmLabel: "Insert",
    });
    if (url) {
      editorRef.current?.focus();
      restoreSelection();
      exec("createLink", url);
    }
  };

  const insertImageUrl = async () => {
    saveSelection();
    const url = await prompt({
      title: "Insert Image by URL",
      label: "Image URL",
      defaultValue: "https://",
      placeholder: "https://…",
      confirmLabel: "Next",
    });
    if (!url) return;
    const alt =
      (await prompt({
        title: "Image Alt Text",
        label: "Alt text (for SEO & accessibility)",
        placeholder: "Describe the image",
        confirmLabel: "Insert",
      })) || "Article image";
    editorRef.current?.focus();
    restoreSelection();
    exec(
      "insertHTML",
      `<img src="${url}" alt="${alt.replace(/"/g, "&quot;")}" /><p><br></p>`,
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const alt =
      (await prompt({
        title: "Image Alt Text",
        label: "Alt text for this image (SEO & accessibility)",
        defaultValue: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
        confirmLabel: "Upload",
      })) || file.name;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      const imgHtml = `<img src="${data.url}" alt="${alt.replace(
        /"/g,
        "&quot;",
      )}" /><p><br></p>`;
      editorRef.current?.focus();
      restoreSelection();
      const success = document.execCommand("insertHTML", false, imgHtml);
      if (!success && editorRef.current) editorRef.current.innerHTML += imgHtml;
      syncContent();
      toast.success("Image inserted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const insertHR = () => exec("insertHTML", "<hr />");

  const insertTable = async () => {
    const rows = parseInt(
      (await prompt({
        title: "Insert Table",
        label: "Number of rows",
        defaultValue: "3",
        confirmLabel: "Next",
      })) || "0",
      10,
    );
    if (!rows) return;
    const cols = parseInt(
      (await prompt({
        title: "Insert Table",
        label: "Number of columns",
        defaultValue: "3",
        confirmLabel: "Insert",
      })) || "0",
      10,
    );
    if (!cols) return;
    let html =
      '<table><thead><tr>' +
      Array.from({ length: cols }, () => "<th>Header</th>").join("") +
      "</tr></thead><tbody>";
    for (let i = 0; i < rows - 1; i++) {
      html +=
        "<tr>" +
        Array.from({ length: cols }, () => "<td>Cell</td>").join("") +
        "</tr>";
    }
    html += "</tbody></table><p><br></p>";
    editorRef.current?.focus();
    restoreSelection();
    exec("insertHTML", html);
  };

  const isActive = (fmt: string) => activeFormats.has(fmt);

  const Btn = ({
    onClick,
    title,
    active,
    children,
  }: {
    onClick: () => void;
    title: string;
    active?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        saveSelection();
        onClick();
      }}
      className={`a-editor__btn${active ? " is-active" : ""}`}
    >
      {children}
    </button>
  );

  const Divider = () => <span className="a-editor__divider" />;

  return (
    <div className="a-editor">
      <div className="a-editor__bar">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 2,
            opacity: viewMode === "html" ? 0.4 : 1,
            pointerEvents: viewMode === "html" ? "none" : "auto",
          }}
        >
          <Btn onClick={() => exec("undo")} title="Undo">
            <Undo2 />
          </Btn>
          <Btn onClick={() => exec("redo")} title="Redo">
            <Redo2 />
          </Btn>
          <Divider />
          <Btn onClick={() => toggleHeading(2)} title="Heading 2" active={isActive("h2")}>
            <Heading2 />
          </Btn>
          <Btn onClick={() => toggleHeading(3)} title="Heading 3" active={isActive("h3")}>
            <Heading3 />
          </Btn>
          <Btn onClick={() => toggleHeading(4)} title="Heading 4" active={isActive("h4")}>
            <Heading4 />
          </Btn>
          <Btn onClick={() => exec("formatBlock", "p")} title="Paragraph" active={isActive("p")}>
            <Pilcrow />
          </Btn>
          <Divider />
          <Btn onClick={() => exec("bold")} title="Bold" active={isActive("bold")}>
            <Bold />
          </Btn>
          <Btn onClick={() => exec("italic")} title="Italic" active={isActive("italic")}>
            <Italic />
          </Btn>
          <Btn onClick={() => exec("underline")} title="Underline" active={isActive("underline")}>
            <Underline />
          </Btn>
          <Btn
            onClick={() => exec("strikeThrough")}
            title="Strikethrough"
            active={isActive("strikeThrough")}
          >
            <Strikethrough />
          </Btn>
          <Divider />
          <Btn
            onClick={() => exec("insertUnorderedList")}
            title="Bullet List"
            active={isActive("insertUnorderedList")}
          >
            <List />
          </Btn>
          <Btn
            onClick={() => exec("insertOrderedList")}
            title="Numbered List"
            active={isActive("insertOrderedList")}
          >
            <ListOrdered />
          </Btn>
          <Divider />
          <Btn onClick={() => exec("justifyLeft")} title="Align Left">
            <AlignLeft />
          </Btn>
          <Btn onClick={() => exec("justifyCenter")} title="Align Center">
            <AlignCenter />
          </Btn>
          <Btn onClick={() => exec("justifyRight")} title="Align Right">
            <AlignRight />
          </Btn>
          <Divider />
          <Btn onClick={() => toggleBlock("blockquote")} title="Quote" active={isActive("blockquote")}>
            <Quote />
          </Btn>
          <Btn onClick={() => toggleBlock("pre")} title="Code Block" active={isActive("pre")}>
            <Code />
          </Btn>
          <Btn onClick={insertHR} title="Horizontal Line">
            <Minus />
          </Btn>
          <Btn onClick={insertTable} title="Insert Table">
            <Table />
          </Btn>
          <Divider />
          <Btn onClick={insertLink} title="Insert Link">
            <LinkIcon />
          </Btn>
          <Btn onClick={insertImageUrl} title="Image by URL">
            <ImageIcon />
          </Btn>
          <button
            type="button"
            title="Upload Image"
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
              fileInputRef.current?.click();
            }}
            className="a-editor__btn"
          >
            {uploading ? <span className="a-spin" style={{ width: 15, height: 15 }} /> : <Upload />}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>

        <span className="a-spacer" />

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleViewMode();
          }}
          title={viewMode === "visual" ? "Edit raw HTML" : "Back to visual editor"}
          className={`a-editor__toggle${viewMode === "html" ? " is-on" : ""}`}
        >
          {viewMode === "visual" ? (
            <>
              <FileCode2 /> HTML
            </>
          ) : (
            <>
              <Eye /> Visual
            </>
          )}
        </button>
      </div>

      {viewMode === "html" ? (
        <textarea
          className="a-editor__html"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          placeholder="<!-- Edit raw HTML. Switch to Visual to preview. -->"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          className="a-editor__surface"
          onInput={() => {
            syncContent();
            detectFormats();
          }}
          onBlur={() => {
            saveSelection();
            syncContent();
          }}
          onKeyUp={detectFormats}
          onMouseUp={detectFormats}
        />
      )}
    </div>
  );
}
