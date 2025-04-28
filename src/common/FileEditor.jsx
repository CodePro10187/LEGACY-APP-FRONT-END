import { useState, useEffect } from "react";

const FileEditor = ({ initialContent = "", initialFileName = "" }) => {
  const [fileName, setFileName] = useState(initialFileName);
  const [fileContent, setFileContent] = useState(initialContent);

  useEffect(() => {
    setFileName(initialFileName);
    setFileContent(initialContent);
  }, [initialContent, initialFileName]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleContentChange = (e) => {
    setFileContent(e.target.value);
  };

  const handleDownload = () => {
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "untitled.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h3>Document Editor</h3>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <br />
      <br />
      <textarea
        style={{ width: "100%", height: "300px" }}
        value={fileContent}
        onChange={handleContentChange}
      />
      <br />
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};

export default FileEditor;
