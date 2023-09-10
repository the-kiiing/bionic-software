import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  // Function to identify important parts of words
  function identifyImportantParts(inputText) {
    const paragraphs = inputText.split("\n"); // Split the text into paragraphs
    const highlightedParagraphs = [];

    for (const paragraph of paragraphs) {
      const wordsAndSymbols = paragraph.split(
        /(\s+|[,~!@#$%^&*()_+{}:"|<>?\-=\[\];',./]+)/
      ); // Split by spaces and specified symbols
      const highlightedWordsAndSymbols = [];

      for (const item of wordsAndSymbols) {
        let highlightedItem = "";

        if (item.match(/\s+/)) {
          // If it's a space (whitespace), keep it as is
          highlightedItem = item;
        } else {
          const wordWithoutSymbols = item.replace(/[^a-zA-Z0-9@.]/g, ""); // Remove symbols except @ and .
          const wordLength = wordWithoutSymbols.length;

          if (wordLength > 0) {
            const firstThirtyPercent = wordWithoutSymbols.slice(
              0,
              Math.ceil(wordLength * 0.3)
            );
            const remainingSeventyPercent = wordWithoutSymbols.slice(
              firstThirtyPercent.length
            );

            // Replace the item with the first 30% in bold, and add back any removed symbols
            highlightedItem = item.replace(
              wordWithoutSymbols,
              `<strong>${firstThirtyPercent}</strong>${remainingSeventyPercent}`
            );
          } else {
            // If the item is only symbols (no alphanumeric characters), keep it as is
            highlightedItem = item;
          }
        }

        highlightedWordsAndSymbols.push(highlightedItem);
      }

      // Join the highlighted words and symbols back into a single paragraph
      const highlightedParagraph = highlightedWordsAndSymbols.join("");
      highlightedParagraphs.push(highlightedParagraph);
    }

    // Join the highlighted paragraphs with line breaks
    const highlightedText = highlightedParagraphs.join("<br>");

    return highlightedText;
  }

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // Call the function to identify important parts and set the highlighted text
    const highlighted = identifyImportantParts(newText);
    setHighlightedText(highlighted);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Editor</h2>
        <textarea
          className="w-full h-96 p-4 border border-gray-300 rounded-lg"
          value={text}
          onChange={handleInputChange}
          placeholder="Enter your text here..."
        ></textarea>
      </div>
      <div className="w-1/2 bg-white p-4">
        <h2 className="text-2xl font-bold mb-4">Bionic Reading Preview</h2>
        <div
          className="border border-gray-300 rounded-lg h-96 p-4"
          style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }} // Make the right side scrollable
          dangerouslySetInnerHTML={{ __html: highlightedText }} // Use dangerouslySetInnerHTML to render HTML
        ></div>
      </div>
    </div>
  );
}

export default App;
