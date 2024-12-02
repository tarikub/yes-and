# Yes-And Chrome Extension

![Yes-And Icon](src/images/icon-128.png)

"Yes, And" is an old improv technique that helps unblock ideas by encouraging acceptance of suggestions, fostering a collaborative and creative environment. The **Yes-And** Chrome Extension attempts to recreate the experience in a digital manner using built-in Chrome AI capabilities.

The **Yes-And** Chrome Extension enhances your browsing experience by suggesting "yes, and" responses. This helps to unblock conversations and create alternate narratives.

The extension leverages Chrome’s built-in AI models to provide real-time suggestions. 
## How it works
The Chrome extension detects when text in input fields changes and sends an event to the background worker. The background worker then calls the Chrome Prompt AI API, processes the data, and sends it back to the side panel for display.
<pre>
Extension               ────> Content Script
   │                            │
   │                            ▼
   │                    Text change detected
   │                            │
   └─────────────────────> Fire event
                                │
                                ▼
Background Worker (Side Panel) ────> Pick up event
   │                            │
   │                            ▼
   │          ┌─────────────────────────┐
   │          │ Call Chrome Prompt AI API│
   │          └─────────────────────────┘
   │                            │
   └─────────────────────> Data sent to side panel
                                │
                                ▼
                          Side Panel
</pre>

## Running in Development Mode ##
For development, you can load the extension in Chrome after generating the chrome extension files as follows:

- Sign up for [Chrome AI Preview](http://goo.gle/chrome-ai-dev-preview-join) 
- After signing up for preview create a [trail token](https://developer.chrome.com/docs/web-platform/origin-trials)
- Update `manifest.json` to include your token in the `trial_tokens` section
- Run `npm i` to install node dependencies.

- Run `npm run build` to generate extension artifacts.

- Go to chrome://extensions/ in your browser.

- Enable "Developer mode" by clicking the toggle switch in the top right corner.

- Click "Load unpacked" and select the dist directory from your project.

- Navigate to `dist` folder

## Scripts ##
- build: Compiles TypeScript files and copies HTML, images, and the manifest file to dist.
- copy-html: Copies HTML files from src to dist.
- copy-images: Copies image files from src/images to dist/images.
- copy-manifest: Copies manifest.json to dist.

## Features

- Automatically detects the last typed sentence in the user's browser.
- Suggests "yes, and" responses to keep the conversation flowing.
- Aims to unblock the user and foster creativity in discussions.

## Dependencies

- @types/chrome: TypeScript definitions for the Chrome extension API.
- typescript: TypeScript language support.


## Contribution

This project is licensed under the MIT License.
