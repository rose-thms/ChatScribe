console.log("ChatScribe content script loaded.");

function getVisibleMessages() {
  const messages = [];

  const elements = document.querySelectorAll(
    "[data-pre-plain-text]"
  );

  elements.forEach((element) => {
    const text = element.innerText?.trim();

    if (!text) {
      return;
    }

    messages.push({
      metadata: element.getAttribute("data-pre-plain-text"),
      text: text
    });
  });

  return messages;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== "GET_VISIBLE_MESSAGES") {
    return;
  }

  const messages = getVisibleMessages();

  sendResponse({
    success: true,
    messages: messages
  });
});
console.log("ChatScribe reader is ready.");