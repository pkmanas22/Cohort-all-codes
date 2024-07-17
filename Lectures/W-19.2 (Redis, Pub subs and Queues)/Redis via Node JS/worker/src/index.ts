import { createClient } from 'redis';

const client = createClient();

async function processSubmission(submission:string) {
    const { problemId, userId, code, language } = JSON.parse(submission);

    console.log("Processing submission for problem:", problemId);
    console.log("Code:", code);
    console.log("Language:", language);

    // Implement your code processing logic here

    // simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Finished processing submission for problem:", problemId);
}

async function startWorker() {
    try {
        await client.connect();
        console.log("Worker connected to Redis");

        // Main loop
        while (true) {
            try {
                const submission = await client.brPop('submissions', 0);
                // @ts-ignore
                // process the submission
                await processSubmission(submission.element)
            } catch (error) {
                console.error("Error processing submission:", error);
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startWorker();