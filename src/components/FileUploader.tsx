"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    CheckCircleIcon,
    CircleArrowDown,
    HomeIcon,
    RocketIcon,
    SaveIcon,
} from "lucide-react";

function FileUploader() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        console.log(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive, isFocused } =
        useDropzone({
            onDrop,
        });

    return (
        <div className=" flex flex-col gap-4 items-center max-w-7xl mx-auto">
            {/* Loading Section */}

            <div
                {...getRootProps()}
                className={`border-indigo-600 p-10 border-2 border-dashed mt-10 w-[90%] text-indigo-600 rounded-lg h-96 flex items-center text-center justify-center ${
                    isFocused || isDragActive
                        ? "bg-indigo-300"
                        : "bg-indigo-100"
                }`}
            >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center justify-center">
                    {isDragActive ? (
                        <>
                            <RocketIcon className="h-20 w-20 animate-ping" />
                            <p>Drop the files here ...</p>
                        </>
                    ) : (
                        <>
                            <CircleArrowDown className="h-20 w-20 animate-bounce" />
                            <p>
                                Drag 'n' drop some files here, or click to
                                select files
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FileUploader;
