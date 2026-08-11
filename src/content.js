console.log("ChatScribe content script loaded.");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== "GET_VISIBLE_MESSAGES") {
    return;
  }

  try {
    const messages = parseChatMessages();

    sendResponse({
      success: true,
      messages
    });
  } catch (error) {
    console.error("ChatScribe parser error:", error);

    sendResponse({
      success: false,
      messages: [],
      error: error.message
    });
  }
});