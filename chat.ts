const url = ""
const api = "/api/generate"

const headers =  {
  'Content-Type': 'application/json'
}

const request = {
  "model": "tinyllama",
  "prompt": "What's the benefit of using cloud computing",
  "stream": true
}

const main = async () => {
  const response = await fetch(url+api, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(request),
  });

  if (!response.body) {
    throw new Error("No Response Body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read()
    if (done) break;

    const chunk = decoder.decode(value, {stream: true});
    let word = JSON.parse(chunk);
    word = word.response;
    process.stdout.write(word);
  }
}

main().catch(console.error);
