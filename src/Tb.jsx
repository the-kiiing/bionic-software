import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  // Function to identify important parts of words
  function identifyImportantParts(inputText) {
    const paragraphs = inputText.split("\n"); // Split the text into paragraphs
    const highlightedParagraphs = [];

    for (const paragraph of paragraphs) {
      const words = paragraph.split(" "); // Split each paragraph into words
      const highlightedWords = [];

      for (const word of words) {
        let highlightedWord = "";

        // Check if the word is an email address
        if (isValidEmail(word)) {
          const emailParts = splitEmail(word);
          const emailFirst30Percent = emailParts[0].slice(
            0,
            Math.ceil(emailParts[0].length * 0.3)
          );
          const emailRemaining70Percent = emailParts[0].slice(
            emailFirst30Percent.length
          );
          highlightedWord = `<strong>${emailFirst30Percent}</strong>${emailRemaining70Percent}${emailParts[1]}`;
        } else {
          const wordWithoutSymbols = word.replace(/[^a-zA-Z0-9\-@.]/g, ""); // Remove symbols except dashes, @, and .
          const wordLength = wordWithoutSymbols.length;

          if (wordLength > 0) {
            const firstThirtyPercent = wordWithoutSymbols.slice(
              0,
              Math.ceil(wordLength * 0.3)
            );
            const remainingSeventyPercent = wordWithoutSymbols.slice(
              firstThirtyPercent.length
            );

            // Replace the word with the first 30% in bold, and add back any removed symbols
            highlightedWord = word.replace(
              wordWithoutSymbols,
              `<strong>${firstThirtyPercent}</strong>${remainingSeventyPercent}`
            );
          }
        }

        highlightedWords.push(highlightedWord);
      }

      // Join the highlighted words back into a single paragraph
      const highlightedParagraph = highlightedWords.join(" ");
      highlightedParagraphs.push(highlightedParagraph);
    }

    // Join the highlighted paragraphs with line breaks
    const highlightedText = highlightedParagraphs.join("<br>");

    return highlightedText;
  }

  // Function to check if a word is an email address
  function isValidEmail(word) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(word);
  }

  // Function to split an email address into two parts: before and after the "@" symbol
  function splitEmail(email) {
    const atIndex = email.indexOf("@");
    if (atIndex === -1) {
      return [email, ""];
    } else {
      return [email.slice(0, atIndex + 1), email.slice(atIndex + 1)];
    }
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
