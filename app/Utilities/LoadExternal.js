import 'jquery'
import makeRequest from './MakeRequest'

// adapted from https://stackoverflow.com/questions/21294/dynamically-load-a-javascript-file

const Script = {
    loadedScripts: [],
    include: async function(script) {
        if (this.loadedScripts.includes(script)) return;
        this.loadedScripts.push(script);

        const code = await makeRequest('GET', script, 'text');
        window.eval(code);
    }
};

Script.include(`fx/${'bitcrush'}/main.js`)