import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import url from "../url.json";
import { toast } from "react-toastify";

function Test() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let timer;
    if (isUploading) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          } else {
            clearInterval(timer);
            setShowDownloadButton(true);
            return 100;
          }
        });
      }, 30); // Adjust the interval time to control the speed of the progress bar
    }

    return () => {
      clearInterval(timer);
    };
  }, [isUploading]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (
          files.every((f) => f.path !== file.path) &&
          file.name.endsWith(".java")
        ) {
          setFiles((prev) => [...prev, file]);
        }
      });
    },
    [files],
  );

  function HandleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      const token = localStorage.getItem("token");
      fetch(`${url.current}/metric/generate-csv`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then(async (response) => {
          if (!response.ok) {
            toast.error("Failed to generate CSV");
            throw new Error("Failed to generate CSV");
          }
          toast.success("File uploaded successfully");
          setIsUploading(true);
          const csvBlob = await response.blob();
          const url = window.URL.createObjectURL(csvBlob);
          setUrl(url);
        })
        .catch((error) => {
          console.error("Error handling response:", error);
        });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const HandleDownload = async (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Metrics-analyzer.csv"); // Replace with the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: files.length > 0,
  });
  const { getRootProps: getButtonProps, getInputProps: getButtonInputProps } =
    useDropzone({ onDrop, noClick: false, noKeyboard: true });

  const deleteFile = (path) => {
    setFiles(files.filter((file) => file.path !== path));
  };

  return (
    <div className="h-full w-full pt-16 fixed overflow-y-auto">
      <div className="flex justify-center h-1/4 sm:h-1/3">
        <h1 className="component-title pt-4 underline">Test</h1>
      </div>
      {isUploading ? (
        <div className="px-10 lg:px-36 h-3/4 sm:h-2/3 flex flex-col items-center gap-10 lg:gap-5">
          {showDownloadButton ? (
            <div className="w-full h-full flex flex-col items-center gap-5">
              <h1 className="lg:text-2xl">File Loaded succesfully !</h1>
              <button
                onClick={HandleDownload}
                className="btn btn-ghost w-34 lg:w-64 h-14 lg:h-24 text-lg lg:text-xl bg-second hover:bg-fourth"
              >
                Download File
              </button>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center gap-5 lg:gap-10">
              <h1 className="text-md lg:text-3xl">Results Loading...</h1>
              <div className="w-full bg-white rounded-full h-4">
                <div
                  className="bg-first h-4 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="px-10 lg:px-36 h-3/4 sm:h-2/3 flex flex-col items-center gap-10 lg:gap-5">
          <div
            className={
              files.length > 0
                ? "overflow-y-auto h-1/2 w-full border-first bg-second border-4 rounded-box"
                : "overflow-y-auto h-1/2 w-full border-first bg-second border-4 rounded-box border-dashed"
            }
          >
            {files.length === 0 ? (
              <div
                {...getRootProps({
                  className:
                    "h-full dropzone flex flex-col justify-center items-center",
                })}
              >
                <input {...getInputProps()} directory="" webkitdirectory="" />
                <p className="text-xs sm:text-lg">
                  Drag the package to test...
                </p>
              </div>
            ) : (
              <div className="flex flex-col w-full items-center gap-10 p-4">
                <ul
                  {...getRootProps({
                    className: "flex flex-col items-center gap-1 h-full w-full",
                  })}
                >
                  <input {...getInputProps()} directory="" webkitdirectory="" />
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="text-xs lg:text-sm h-16 flex justify-between items-center w-full rounded-box bg-first p-5"
                    >
                      <div className="overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                        {file.name}
                      </div>
                      <button
                        className="btn btn-ghost text-red-500"
                        onClick={() => deleteFile(file.path)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  {...getButtonProps({
                    className:
                      "btn bg-third hover:bg-fourth 1/3 lg:w-1/4 text-white",
                  })}
                >
                  <input
                    {...getButtonInputProps()}
                    directory=""
                    webkitdirectory=""
                  />
                  Add More Files
                </button>
              </div>
            )}
          </div>
          {files.length > 0 && (
            <button
              onClick={HandleSubmit}
              className="btn w-1/3 text-white bg-first hover:bg-second"
            >
              Generate CSV
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Test;
