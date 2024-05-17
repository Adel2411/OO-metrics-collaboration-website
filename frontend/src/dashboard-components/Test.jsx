import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import url from "../url.json";
import { toast } from "react-toastify";

function Test() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (files.every((f) => f.path !== file.path)) {
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
      fetch(`${url.current}/metric/analyze`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            toast.error("Failed to upload files");
            throw new Error("Failed to upload files");
          }
          toast.success("Files uploaded successfully");
          return response.json();
        })
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            console.log(data[i].file_name, data[i].results);
          }
          setIsUploading(true);
          setShowDownloadButton(true);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

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
          <h1 className="text-2xl">Uploading...</h1>
          {showDownloadButton && (
            <button className="btn btn-primary text-xl">Hello</button>
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
                      className="text-xs lg:text-sm lg:h-16 flex justify-between items-center w-full rounded-box bg-first p-5 h-10"
                    >
                      <div className="overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                        {file.name}
                      </div>
                      <button
                        className="btn btn-ghost"
                        onClick={() => deleteFile(file.path)}
                      >
                        🗑️
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
          <button
            onClick={HandleSubmit}
            className="btn w-1/3 text-white bg-first hover:bg-second"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Test;
