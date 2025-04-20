const url = "http://localhost:11434";
const api = "/api/generate";

const headers = {
  "Content-Type": "application/json",
};

const request = {
  model: "tinyllama",
  prompt: "What's the benefit of using cloud computing",
  stream: true,
};

const main = async () => {
  const response = await fetch(url + api, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(request),
  });

  if (!response.body) {
    throw new Error("No Response Body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Process each line (assuming NDJSON)
    let lines = buffer.split("\n");
    buffer = lines.pop()!; // Last line may be incomplete, keep it in buffer

    for (const line of lines) {
      if (line.trim() === "") continue;
      try {
        const word = JSON.parse(line);
        process.stdout.write(word.response);
      } catch (e) {
        // Optionally log or handle parse errors
        console.error("Failed to parse line:", line);
      }
    }
  }
};

main().catch(console.error);

