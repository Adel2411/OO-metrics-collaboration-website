import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import MathJax from "react-mathjax2";
import url from "../url.json";

function Documentation() {
  const [copy, setCopy] = useState({});
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([documents]);
  const [showImplementation, setShowImplementation] = useState(false);

  function handleCopy(id, codeString) {
    navigator.clipboard.writeText(codeString);
    setCopy((prevState) => ({ ...prevState, [id]: true }));
    setTimeout(() => {
      setCopy((prevState) => ({ ...prevState, [id]: false }));
    }, 3000);
  }

  function handleSearch(e) {
    let search = e.target.value;
    let filteredDocuments = documents.filter((document) =>
      document.metricName.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredDocuments(filteredDocuments);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${url.current}/client/documents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data.data);
        setFilteredDocuments(data.data);
      });
  }, []);

  const displayListElementLink = (id, title) => {
    id = "#" + id;
    return (
      <div className="flex justify-center items-center">
        <li className="w-full">
          <a
            href={id}
            className="documentation-left-content w-full lg:h-16 btn btn-ghost subtitle rounded-box bg-third hover:bg-second"
          >
            {title}
          </a>
        </li>
      </div>
    );
  };

  const displayListElement = (id, title, description, formula, code) => {
    return (
      <div>
        <li id={id} className="px-3 lg:px-16 flex flex-col gap-10">
          <h1 className="documentation-right-title underline underline-offset-4">
            {title} :
          </h1>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="documentation-right-subtitle underline">
                Description :
              </h1>
              <p className="documentation-right-description">{description}</p>
            </div>
            {formula === "" ? null : (
              <div className="shadow shadow-first p-5 rounded-box">
                <h1 className="documentation-right-subtitle underline">
                  Formule :
                </h1>
                <MathJax.Context input="tex">
                  <div className="md:text-md lg:text-lg documentation-right-formula">
                    <MathJax.Node>{formula}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
            )}
          </div>
          {!showImplementation || code === "" ? null : (
            <div className="min-w-sm  overflow-auto rounded-md max-h-96 shadow-2xl">
              <div className="flex justify-between px-4 bg-first text-white text-xs items-center">
                <p className="documentation-right-subtitle">Implementation :</p>
                {copy[id] ? (
                  <button className="py-1 inline-flex items-center gap-1">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Copied!
                  </button>
                ) : (
                  <button
                    className="py-1 inline-flex items-center gap-1"
                    onClick={() => handleCopy(id, code)}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
                          clipRule="evenodd"
                        />
                        <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                        <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                      </svg>
                    </span>
                    Copy code
                  </button>
                )}
              </div>
              <SyntaxHighlighter
                className="max-h-80 overflow-auto"
                language="java"
                style={atomOneDark}
                customStyle={{
                  padding: "10px",
                  fontSize: "15px",
                }}
                wrapLongLines={true}
                showLineNumbers={true}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          )}
        </li>
        <div className="divider"></div>
      </div>
    );
  };

  return (
    <div className="z-0">
      <div>
        <div className="overflow-y-auto w-1/5 hidden lg:flex bg-fourth gap-10 py-10 flex-col items-center h-screen fixed">
          <h1 className="documentation-left-title pt-16">Available Metrics</h1>
          <div className="mx-5 input input-bordered bg-second flex items-center">
            <input
              type="text"
              className="w-full h-10"
              name="Search"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <span className="text-xs text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
          </div>
          <div className="divider"></div>
          <ul className="flex flex-col w-full rounded-box gap-1">
            {filteredDocuments.map((document, index) => {
              return displayListElementLink(index, document.metricName);
            })}
          </ul>
        </div>
        <div className="lg:w-4/5 w-full bg-second flex flex-col fixed right-0 overflow-y-auto h-screen top-16">
          <div className="flex justify-center">
            <h1 className="component-title py-10 underline underline-offset-8">
              Documentation
            </h1>
          </div>
          <ul className="flex flex-col gap-y-3 py-20 ">
            {filteredDocuments.map((document, index) => {
              return displayListElement(
                index,
                document.metricName,
                document.researchDescription,
                document.metricMathFormula,
                document.code,
              );
            })}
          </ul>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
          <span className="label flex items-center text-sm font-medium text-white">
            {showImplementation ? "Hide " : "Show "} Implementations
          </span>
          <input
            type="checkbox"
            name="autoSaver"
            className="sr-only"
            checked={showImplementation}
            onChange={() => setShowImplementation(!showImplementation)}
          />
          <span
            className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
              showImplementation ? "bg-primary" : "bg-[#CCCCCE]"
            }`}
          >
            <span
              className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                showImplementation ? "translate-x-6" : ""
              }`}
            ></span>
          </span>
        </label>
      </div>
    </div>
  );
}

export default Documentation;
