import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  // Function to identify important parts of words
  function identifyImportantParts(inputText) {
    const words = inputText.split(" "); // Split the text into words
    const highlightedWords = [];

    for (const word of words) {
      const wordLength = word.length;
      const halfLength = Math.ceil(wordLength / 2); // Calculate the position of the first half
      const firstHalf = word.slice(0, halfLength);
      const secondHalf = word.slice(halfLength);

      // Replace the word with the first half in bold
      const highlightedWord = `<strong>${firstHalf}</strong>${secondHalf}`;
      highlightedWords.push(highlightedWord);
    }

    // Join the highlighted words back into a single string
    const highlightedText = highlightedWords.join(" ");

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
          dangerouslySetInnerHTML={{ __html: highlightedText }} // Use dangerouslySetInnerHTML to render HTML
        ></div>
      </div>
    </div>
  );
}

export default App;
