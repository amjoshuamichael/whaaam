import makeRequest from './MakeRequest'

// adapted from https://stackoverflow.com/questions/21294/dynamically-load-a-javascript-file

let loadedScripts = []

export async function loadScript(script) {
    if (loadedScripts.includes(script)) return;
    loadedScripts.push(script);

    const code = await makeRequest('GET', script, 'text');
    await eval(code);
    console.log('completed eval!')
}