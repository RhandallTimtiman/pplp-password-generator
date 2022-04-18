import { useState } from "react";
import "./App.css";

function App() {
  const LOWER_CASE_CHARS = "abcdefghijklmnopqrstuvwxyz".split("");
  const UPPER_CASE_CHARS = LOWER_CASE_CHARS.map((x) => x.toUpperCase());
  const SYMBOLS = "!£$%^&*()@~:;,./?{}=-_".split("");
  const NUMBERS = "0123456789".split("");
  const LETTERS_MIX = [
    ...LOWER_CASE_CHARS,
    ...UPPER_CASE_CHARS,
    ...SYMBOLS,
    ...NUMBERS,
  ];
  const CHARS_LENGTH = LETTERS_MIX.length;

  function containsLowerCase(str) {
    return LOWER_CASE_CHARS.some((x) => str.includes(x));
  }

  function containsUpperCase(str) {
    return UPPER_CASE_CHARS.some((x) => str.includes(x));
  }

  function containsSymbol(str) {
    return SYMBOLS.some((x) => str.includes(x));
  }

  function containsNumber(str) {
    return NUMBERS.some((x) => str.includes(x));
  }

  function isValidPassword(password) {
    return (
      containsLowerCase(password) &&
      containsUpperCase(password) &&
      containsSymbol(password) &&
      containsNumber(password)
    );
  }

  function generateStrongPassword() {
    const buff = new Uint8Array(15);

    let generatedPassword = "";

    do {
      window.crypto.getRandomValues(buff);
      generatedPassword = [...buff]
        .map((x) => LETTERS_MIX[x % CHARS_LENGTH])
        .join("");
    } while (!isValidPassword(generatedPassword));

    setPassword(generatedPassword);
  }

  function copyPassword() {
    navigator.clipboard.writeText(password);
  }

  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <div className="min-h-screen flex flex-col justify-center">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center h-48 p-4 shadow-2xl rounded-md border-b-4 border-green-500">
            <div className="flex flex-row space-x-2 items-center">
              <div className="flex-1">
                <p
                  className={`text-lg ${
                    password.length === 0 ? "font-bold" : "italic"
                  }`}
                >
                  {password.length !== 0 ? password : "Generate Password"}
                </p>
              </div>
              <div className="w-36 flex flex-row justify-end space-x-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 cursor-pointer ${
                    password.length === 0 ? "animate-bounce" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={() => generateStrongPassword()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={() => copyPassword()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
