import { ChatOpenAI } from "@langchain/openai";
import { ResumeSchema } from "../../../lib/ai/resumeSchema";
import { ResumeAnalysisSchema } from "@/app/lib/ai/resumeAnalysisSchema";
import { atsAnalysisSchema } from "@/app/lib/ai/atsAnalysisSchema";
import { CallbackHandler } from "@langfuse/langchain";

const model = new ChatOpenAI({ model: "gpt-4.1-mini" })

const langfuseHandler = new CallbackHandler({
  sessionId: "user-session-123",
  userId: "user-abc",
  tags: ["langchain-test"],
});

export async function POST(req: Request) {
  const body = await req.json();
  const { content, jobDescription } = body

  console.log('jobDescription ', jobDescription,);

  if (!content) {
    return new Response("can not load content", {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    console.log('String resume checker');
    const structuredLLM = model.withStructuredOutput(ResumeSchema)
    const resumeResult = await structuredLLM.invoke(`
        Extract the resume information from the following text.
        Resume:
        ${content}
        `, {
      callbacks: [langfuseHandler]
    })

    console.log('String AI Analysis your resume');

    const structuredAnalyzer = model.withStructuredOutput(ResumeAnalysisSchema)

    const analyserResult = await structuredAnalyzer.invoke(`
        You are a professional ATS resume analyzer.
        Analyze this resume.
        Focus on:
        1. ATS compatibility
        2. Resume structure
        3. Skills presentation
        4. Experience descriptions
        5. Achievement quality
        6. Clarity
        7. Potential weaknesses

        Resume:
        ${JSON.stringify(resumeResult)}
        `, {
      callbacks: [langfuseHandler]
    })


    let jobDescResult = {}
    if (jobDescription) {
      const structuredAtsJOb = model.withStructuredOutput(atsAnalysisSchema)

      jobDescResult = await structuredAtsJOb.invoke(`
          You are an ATS resume analysis system.
          Analyze the candidate resume against the job description.
          Do not invent candidate experience.
          Only consider a skill matched if the resume provides evidence.
          Identify:
          - matched skills
          - missing skills
          - experience match
          - education match
          - important keywords
          - strengths
          - weaknesses
          - actionable recommendations

            Return structured JSON.

            RESUME:
            ${JSON.stringify(resumeResult)}
            JOB DESCRIPTION:
            ${jobDescription}
      `, {
        callbacks: [langfuseHandler]
      })


    }

    return Response.json({
      success: true,
      resumeResult,
      analyserResult,
      jobDescResult
    });

  } catch (error) {
    console.log(error);
  }

  return new Response("Error ", {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}