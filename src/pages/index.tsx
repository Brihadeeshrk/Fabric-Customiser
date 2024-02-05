import Editor from "@/components/Editor";

export default function Home() {
  return (
    <div className="p-5">
      <div className="hidden md:inline">
        <Editor />
      </div>
      <div className="md:hidden">
        <p>This editor is not designed to be used on mobile</p>
      </div>
    </div>
  );
}
