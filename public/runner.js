chrome.runtime.getURL('./1cademy-assistant.svg');

// Create a div element with id 'tmp' to allow react app mount over it
const tmp = document.createElement('div');
tmp.id = 'tmp';
document.body.appendChild(tmp);

// Inject the JavaScript file for your React application
const jssssssss = document.createElement('script');
jssssssss.src = chrome.runtime.getURL('./assets/entry.js');
document.body.appendChild(jssssssss);

// ------------------------------


// const getSelectedText = () => window.getSelection().toString();

/**
 * this will listen when user has a selection and will send a message to service worker
*/
// document.addEventListener("click", () => {
//     if (getSelectedText().length > 0) {
//         console.log('text-selected', getSelectedText())
//         chrome.runtime.sendMessage(
//             { selectedText: getSelectedText() },
//         )
//     }
// });