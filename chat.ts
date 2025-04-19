const url = "http://ec2-54-205-224-34.compute-1.amazonaws.com:11434"

const api = "/api/generate"

const headers =  {
  'Content-Type': 'application/json'
}

const request = {
  "model": "tinyllama",
  "prompt": "What's the benefit of using cloud computing",
  "stream": false
}

const main = () => {
  fetch(url+api, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(request),
  })
  .then((result) => result.json())
  .then((result) => {
    console.log(result.response);
  })
  .catch((error) => {
    throw new Error(error);
  })
}

main()
