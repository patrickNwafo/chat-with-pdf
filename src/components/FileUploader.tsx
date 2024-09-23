"use client";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
    CheckCircleIcon,
    CircleArrowDown,
    HammerIcon,
    RocketIcon,
    SaveIcon,
} from "lucide-react";
import useUpload, { StatusText } from "@/hooks/useUpload";
import { useRouter } from "next/navigation";
import useSubscription from "@/hooks/useSubscription";
import { useToast } from "@/hooks/use-toast";

function FileUploader() {
    const { progress, status, fileId, handleUpload } = useUpload();
    const { isOverFileLimit, filesLoading } = useSubscription();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (fileId) {
            router.push(`/dashboard/files/${fileId}`);
        }
    }, [fileId, router]);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            // Do something with the files

            const file = acceptedFiles[0];
            if (file) {
                if (!isOverFileLimit && !filesLoading) {
                    await handleUpload(file);
                } else {
                    toast({
                        variant: "destructive",
                        title: "Free Plan File Limit Reached",
                        description:
                            "You have reached the maximum number of the files allowed for your account, please upgrade to add more documents.",
                    });
                }
            } else {
                // do nothing..
                // toast..
            }
        },
        [handleUpload]
    );

    const statusIcons: {
        [key in StatusText]: JSX.Element;
    } = {
        [StatusText.UPLOADING]: (
            <RocketIcon className="h-20 w-20 text-indigo-600" />
        ),
        [StatusText.UPLOADED]: (
            <CheckCircleIcon className="h-20 w-20 text-indigo-600" />
        ),
        [StatusText.SAVING]: <SaveIcon className="h-20 w-20 text-indigo-600" />,
        [StatusText.GENERATING]: (
            <HammerIcon className="h-20 w-20 text-indigo-600 animate-bounce" />
        ),
    };
    const { getRootProps, getInputProps, isDragActive, isFocused } =
        useDropzone({
            onDrop,
            maxFiles: 1,
            accept: {
                "application/pdf": [".pdf"],
            },
        });

    const uploadInProgress =
        progress != null && progress >= 0 && progress <= 100;

    return (
        <div className=" flex flex-col gap-4 items-center max-w-7xl mx-auto">
            {/* Loading Section */}
            {uploadInProgress && (
                <div className="mt-32 flex justify-center items-center gap-5">
                    <div
                        className={` radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${
                            progress === 100 && "hidden"
                        }`}
                        role="progressbar"
                        style={{
                            //@ts-ignore
                            "--value": progress,
                            "--size": "12rem",
                            "--thickness": "1.3rem",
                        }}
                    >
                        {progress} %
                    </div>
                    {/* Render Status Icon */}
                    {
                        // @ts-ignore
                        statusIcons[status!]
                    }

                    {/* @ts-ignore */}
                    <p className=" text-indigo-600 animate-pulse">{status}</p>
                </div>
            )}

            {!uploadInProgress && (
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
                                    Drag &apos;n&lsquo; drop some files here, or
                                    click to select files
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileUploader;
