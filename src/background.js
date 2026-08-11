chrome.runtime.onInstalled.addListener(() => {
  console.log("ChatScribe installed.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "GET_CHAT_MESSAGES") {
    sendResponse({
      success: true,
      messages: message.messages || []
    });
  }
});