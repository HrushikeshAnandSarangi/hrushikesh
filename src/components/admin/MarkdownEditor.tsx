import { createSignal } from "solid-js";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface MarkdownEditorProps {
  value: string;
  onInput: (value: string) => void;
  name?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const [mode, setMode] = createSignal<"write" | "preview">("write");
  let textareaRef: HTMLTextAreaElement | undefined;

  const insertText = (before: string, after: string = "") => {
    if (!textareaRef) return;
    
    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const text = textareaRef.value;
    
    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    
    props.onInput(newText);
    
    // Reset selection after update
    setTimeout(() => {
      if (textareaRef) {
        textareaRef.focus();
        textareaRef.setSelectionRange(start + before.length, start + before.length + selectedText.length);
      }
    }, 0);
  };

  const toolbarButtons = [
    { label: "B", title: "Bold", action: () => insertText("**", "**"), class: "font-bold" },
    { label: "I", title: "Italic", action: () => insertText("*", "*"), class: "italic font-serif" },
    { label: "H1", title: "Heading 1", action: () => insertText("# ", ""), class: "font-bold font-serif" },
    { label: "H2", title: "Heading 2", action: () => insertText("## ", ""), class: "font-bold font-serif text-sm" },
    { label: "Quote", title: "Blockquote", action: () => insertText("> ", ""), class: "font-serif" },
    { label: "</>", title: "Code", action: () => insertText("`", "`"), class: "font-mono text-xs font-bold" },
    { label: "CodeBlock", title: "Code Block", action: () => insertText("```\n", "\n```"), class: "font-mono text-[10px]" },
    { label: "Link", title: "Link", action: () => insertText("[", "](url)"), class: "underline text-[#4466ee] text-xs font-bold" },
    { label: "List", title: "Bullet List", action: () => insertText("- ", ""), class: "text-xs font-bold" },
  ];

  return (
    <div class="border border-[var(--color-border)] rounded-xl overflow-hidden bg-white flex flex-col focus-within:ring-2 focus-within:ring-[var(--color-accent)] transition-all shadow-sm">
      <div class="bg-gray-50/80 border-b border-[var(--color-border)] flex flex-wrap items-center justify-between p-2 gap-2 backdrop-blur-sm">
        <div class="flex items-center gap-1 overflow-x-auto">
          {toolbarButtons.map(btn => (
            <button
              type="button"
              onClick={btn.action}
              title={btn.title}
              class={`h-8 min-w-8 px-2 flex items-center justify-center rounded hover:bg-gray-200 text-[#333] transition-colors ${btn.class}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        
        <div class="flex items-center bg-gray-200/50 rounded-lg p-1 border border-gray-200/50">
          <button
            type="button"
            onClick={() => setMode("write")}
            class={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${mode() === "write" ? "bg-white shadow-sm text-[var(--color-deep)]" : "text-gray-500 hover:text-gray-700"}`}
          >
             Write
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            class={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${mode() === "preview" ? "bg-white shadow-sm text-[var(--color-deep)]" : "text-gray-500 hover:text-gray-700"}`}
          >
             Preview
          </button>
        </div>
      </div>

      <div class="relative min-h-[250px] flex flex-col flex-1">
        {mode() === "write" ? (
          <textarea
            ref={textareaRef}
            name={props.name}
            value={props.value}
            onInput={(e) => props.onInput(e.currentTarget.value)}
            placeholder={props.placeholder || "Write in markdown..."}
            required={props.required}
            rows={props.rows || 10}
            class="w-full flex-1 p-4 border-none resize-y focus:outline-none focus:ring-0 font-mono text-sm min-h-[250px] bg-transparent text-[var(--color-text)] leading-relaxed"
          />
        ) : (
          <div class="flex-1 w-full bg-slate-50 border-none min-h-[250px]">
            <div 
              class="p-4 prose prose-indigo max-w-none text-left"
              innerHTML={
                props.value 
                  ? DOMPurify.sanitize(marked(props.value, { async: false }) as string)
                  : "<p class='text-gray-400 italic text-sm'>Nothing to preview.</p>"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
