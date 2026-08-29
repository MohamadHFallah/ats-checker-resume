"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ATSChecker, ATSResponse } from "../components/ATSCheckerCom";
import ATSResultDashboard from "../components/atsJob";

export default function ATSPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [successData, setSuccessData] = useState<ATSResponse>();

  const sendResume = async () => {
    setIsLoading(true)
    const response = await fetch("/api/ats/analyze", {
      method: "POST",
      body: JSON.stringify({ content }),
    });

    setIsLoading(false)
    if (!response.ok) {
      throw new Error("Failed to analyze resume.");
    }
    const data = await response.json();
    console.log('data ', data);
    setSuccessData(data as ATSResponse);
  }

  return (
    <main className="min-h-screen bg-default-50 mt-6">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
           Please Copy & paste Your Resume
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-default-500 sm:text-base">
            Please Add your resume and get an instant ATS analysis,
            actionable feedback, and improvement suggestions.
          </p>
        </div>

        {!successData &&
          <div className="flex flex-col items-center gap-4">
            <Textarea disabled={isLoading} placeholder="Your resume" rows={8} value={content} onChange={(e) => setContent(e.target.value)} />
            {/* <Textarea placeholder="Your job description" rows={8} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} /> */}
            <Button
              disabled={isLoading}
              onClick={() => sendResume()} className={'w-fit'}>
              {isLoading ? "Please wait..." : "Submit"}

            </Button>
          </div>
        }

        {successData && <ATSChecker {...successData} />}
        {successData && <ATSResultDashboard data={successData.jobDescResult} />}
      </div>
    </main>
  );
}