import React, {useState} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import MathJax from 'react-mathjax2';
import {findReturnStatement} from "eslint-plugin-react/lib/util/ast.js";

function Documentation() {
    const [copy, setCopy] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText(codeString);
        setCopy(true);
        setTimeout(() => {
            setCopy(false);
        }, 3000);
    }

    const displayListElementLink = (id, title) => {
        id = "#" + id;
        return (
            <div className="flex justify-center link link-hover decoration-0 rounded-box hover:bg-third">
                <li className="py-3"><a href={id} className="subtitle">{title}</a></li>
            </div>
        );
    }

    const displayListElement = (id, title, description, formula, code) => {
        return (
            <div>
                <li id={id} className="px-10 flex flex-col gap-10">
                    <h1 className="title">{title}</h1>
                    <div>
                        <h1>Description :</h1>
                        <p className="text">
                            {description}
                        </p>
                        <MathJax.Context input='tex'>
                            <div>
                                <MathJax.Node>{formula}</MathJax.Node>
                            </div>
                        </MathJax.Context>
                    </div>
                    <div className="max-w-xl min-w-[25rem] rounded-md overflow-hidden font-mono shadow-2xl">
                        <div className="flex justify-between px-4 bg-first text-white text-xs items-center">
                            <p className="text-sm">Implementation</p>
                            {
                                copy ?
                                    <button className="py-1 inline-flex items-center gap-1">
                                      <span>
                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                              className="w-6 h-6">
                                            <path fillRule="evenodd"
                                                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                                                  clipRule="evenodd"/>
                                            <path fillRule="evenodd"
                                                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                                                  clipRule="evenodd"/>
                                         </svg>

                                      </span>
                                        Copied!
                                    </button>
                                    :
                                    <button className="py-1 inline-flex items-center gap-1" onClick={handleCopy}>
                                      <span>
                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                              className="w-6 h-6">
                                             <path fillRule="evenodd"
                                                   d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
                                                   clipRule="evenodd"/>
                                             <path
                                                 d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z"/>
                                             <path
                                                 d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z"/>
                                         </svg>

                                      </span>
                                        Copy code
                                    </button>
                            }
                        </div>
                        <SyntaxHighlighter language="java" style={atomOneDark} customStyle={{
                            padding: "10px",
                        }}
                                           wrapLongLines={true}
                                           showLineNumbers={true}>
                            {code}
                        </SyntaxHighlighter>
                    </div>
                </li>
                <div className="divider"></div>
            </div>
        )
    }

    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const codeString = `
    async function isAuthorized() {
        try {
            const response = await fetch("http://localhost:8000/auth/is-verify", {
                method: "GET",
                headers: {token: localStorage.getItem("token")}
            });

            const jsonResponse = await response.json();

            setAuth(jsonResponse);

        } catch (err) {
            console.error(err.message)
        }
    }
    `;

    const codeString2 = `
        public class Main {
            public static void main(String[] args) {
                System.out.println("Hello, World!");
                String str = "Hello, World!";
                System.out.println(str);
                int a = 10;
                int b = 20;
                int c = a + b;
                System.out.println(c);
            }
        }
    `;

    const tex = `f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi`;

    return (
        <div className="z-0">
            <div className="h-fit relative">
                <div className=" w-1/4 bg-fourth flex flex-col justify-center items-center h-screen fixed">
                    <h1>Available Metrics</h1>
                    <ul className="flex flex-col gap-y-3 w-screen">
                        {displayListElementLink("1", "Documentation1")}
                        {displayListElementLink("2", "Documentation2")}
                        {displayListElementLink("3", "Documentation3")}
                        {displayListElementLink("4", "Documentation4")}
                        {displayListElementLink("5", "Documentation5")}
                    </ul>
                </div>
                <div className="w-3/4 bg-second flex flex-col absolute right-0">
                    <div className="flex justify-center">
                        <h1 className="title py-10 underline underline-offset-8">Documentation</h1>
                    </div>
                    <ul className="flex flex-col gap-y-3 py-20 ">
                        {displayListElement("1", "Documentation 1", description, tex, codeString)}
                        {displayListElement("2", "Documentation 2", description, tex, codeString2)}
                        {displayListElement("3", "Documentation 3", description, tex, codeString)}
                        {displayListElement("4", "Documentation 4", description, tex, codeString2)}
                        {displayListElement("5", "Documentation 5", description, tex, codeString)}
                    </ul>
              </div>
          </div>
      </div>
  );
}

export default Documentation;