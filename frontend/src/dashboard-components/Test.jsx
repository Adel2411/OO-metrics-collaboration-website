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

    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: files.length > 0});

    const deleteFile = (path) => {
        setFiles(files.filter(file => file.path !== path));
    };

    return (
        <div className="h-full w-full pt-16 fixed overflow-y-auto">
            <div className="flex justify-center h-1/4 sm:h-1/3">
                <h1 className="component-title pt-4 underline">Test</h1>
            </div>
            <div className="h-3/4 sm:h-2/3 flex flex-col items-center gap-10 sm:gap-5">
                <div className="h-1/2 w-full md:w-1/2 border-first bg-second border-4 rounded-box">
                {files.length === 0 ? (
                    <div {...getRootProps(
                        {className: "h-full dropzone flex flex-col justify-center items-center"}
                    )}>
                        <input {...getInputProps()} directory="" webkitdirectory=""/>
                        <p>Drag the package to test...</p>
                    </div>
                ) : (
                    <ul {...getRootProps(
                        {className: "flex flex-col items-center gap-2 h-full overflow-y-auto"}
                    )}>
                        <input {...getInputProps()} directory="" webkitdirectory=""/>
                        {files.map((file, index) => (
                            <li key={index} className="flex justify-between items-center w-full rounded-box bg-first p-5">
                                <div>{file.name}</div>
                                <button className="btn btn-ghost" onClick={() => deleteFile(file.path)}>🗑️</button>
                            </li>
                        ))}
                    </ul>
                )}
                </div>
                <button className="btn btn-primary w-1/3 text-white">Submit</button>
            </div>
        </div>
    );
}

export default Test;