"use client";

import { useRef, useState } from "react";
import { Button, Card, Chip, Spinner } from "@heroui/react";

type ResumeUploadProps = {
    onSuccess?: (data: unknown) => void;
};

export function ResumeUpload({
    onSuccess,
}: ResumeUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (selectedFile: File) => {
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        const maxSize = 10 * 1024 * 1024;

        if (!allowedTypes.includes(selectedFile.type)) {
            return "Only PDF and DOCX files are supported.";
        }

        if (selectedFile.size > maxSize) {
            return "File size must be less than 10MB.";
        }

        return null;
    };

    const handleFile = (selectedFile: File) => {
        setError(null);

        const validationError = validateFile(selectedFile);

        if (validationError) {
            setFile(null);
            setError(validationError);
            return;
        }

        setFile(selectedFile);
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            handleFile(selectedFile);
        }
    };

    const handleDrop = (
        event: React.DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();

        setIsDragging(false);

        const droppedFile = event.dataTransfer.files?.[0];

        if (droppedFile) {
            handleFile(droppedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();

            formData.append("resume", file);

            const response = await fetch("/api/ats/analyze", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to analyze resume.");
            }

            const data = await response.json();

            onSuccess?.(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong.",
            );
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setError(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <Card className="w-full border border-default-200 bg-background shadow-sm">
            <Card.Content className="p-6 sm:p-8">
                <div className="mx-auto max-w-2xl">
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path d="M12 16V4" />
                                <path d="m7 9 5-5 5 5" />
                                <path d="M5 20h14" />
                            </svg>
                        </div>

                        <h2 className="text-xl font-semibold tracking-tight">
                            Upload your resume
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-default-500">
                            Upload your resume and we'll analyze it for ATS
                            compatibility.
                        </p>
                    </div>

                    {/* Upload box */}
                    {!file && (
                        <div
                            onDragOver={(event) => {
                                event.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={() => {
                                setIsDragging(false);
                            }}
                            onDrop={handleDrop}
                            onClick={() => inputRef.current?.click()}
                            className={[
                                "group cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all sm:p-10",
                                isDragging
                                    ? "border-primary-500 bg-primary-50"
                                    : "border-default-200 bg-default-50 hover:border-primary-300 hover:bg-primary-50/40",
                            ].join(" ")}
                        >
                            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-default-200">
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path d="M12 16V4" />
                                    <path d="m7 9 5-5 5 5" />
                                    <path d="M5 20h14" />
                                </svg>
                            </div>

                            <p className="mt-4 text-sm font-medium">
                                {isDragging
                                    ? "Drop your resume here"
                                    : "Drag & drop your resume here"}
                            </p>

                            <p className="mt-1 text-xs text-default-400">
                                or click to browse from your computer
                            </p>

                            <div className="mt-4 flex justify-center gap-2">
                                <Chip
                                    size="sm"
                                    variant="primary"
                                    className="bg-background text-default-500"
                                >
                                    PDF
                                </Chip>

                                <Chip
                                    size="sm"
                                    variant="secondary"
                                    className="bg-background text-default-500"
                                >
                                    DOCX
                                </Chip>

                                <Chip
                                    size="sm"
                                    variant="secondary"
                                    className="bg-background text-default-500"
                                >
                                    Max 10MB
                                </Chip>
                            </div>

                            <input
                                ref={inputRef}
                                type="file"
                                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={handleInputChange}
                                className="hidden"
                            />
                        </div>
                    )}

                    {/* Selected file */}
                    {file && (
                        <div className="rounded-xl border border-default-200 bg-default-50 p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-danger-50 text-danger-600">
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <path d="M14 2v6h6" />
                                    </svg>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">
                                        {file.name}
                                    </p>

                                    <p className="mt-0.5 text-xs text-default-400">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    onPress={removeFile}
                                    aria-label="Remove file"
                                >
                                    ×
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mt-3 rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700">
                            {error}
                        </div>
                    )}

                    {/* Upload */}
                    {file && (
                        <Button
                            // color="primary"
                            size="lg"
                            className="mt-5 w-full font-medium"
                            isDisabled={isUploading}
                            onPress={handleUpload}
                        >
                            {isUploading ? (
                                <>
                                    <Spinner
                                        size="sm"
                                        color="current"
                                    />
                                    Analyzing resume...
                                </>
                            ) : (
                                "Analyze Resume"
                            )}
                        </Button>
                    )}

                    <p className="mt-4 text-center text-xs text-default-400">
                        Your resume will be processed securely and analyzed
                        for ATS compatibility.
                    </p>
                </div>
            </Card.Content>
        </Card>
    );
}