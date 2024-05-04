import { useCallback , useState} from 'react';
import { useDropzone } from 'react-dropzone';

function Test() {
    const [files, setFiles] = useState([]);
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            if (files.every((f) => f.path !== file.path)) {
                setFiles((prev) => [...prev, file]);
            }
        });
    }, [files]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const deleteFile = (path) => {
        setFiles(files.filter(file => file.path !== path));
    };

    return (
        <div className="h-full w-full pt-16 fixed overflow-y-auto">
            <div className="flex justify-center h-1/4 sm:h-1/3">
                <h1 className="component-title pt-4 underline">Test</h1>
            </div>
            <div className="h-3/4 sm:h-2/3 flex flex-col items-center gap-10 sm:gap-5">
                <div {...getRootProps(
                    {className: "dropzone border-2 border-dashed p-10"}
                )}>
                    <input {...getInputProps()} directory="" webkitdirectory=""/>
                    <p>Drag the package to test...</p>
                </div>
                <button className="btn btn-primary">Submit</button>
                <ul className="flex flex-col justify-center items-center textarea-md">
                    {files.map((file, index) => (
                        <li key={index} className="flex justify-between w-full border-2 p-2 mb-2">
                            <div>{file.path}</div>
                            <button onClick={() => deleteFile(file.path)}>🗑️</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Test;