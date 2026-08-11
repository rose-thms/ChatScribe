function parseMessageElement(element) {
  const metadata = element.getAttribute("data-pre-plain-text");
  const text = element.innerText?.trim();

  if (!metadata || !text) {
    return null;
  }

  const match = metadata.match(/^\[(.*?)\]\s*(.*?):\s*$/);

  if (!match) {
    return {
      timestamp: metadata,
      sender: "",
      message: text
    };
  }

  return {
    timestamp: match[1],
    sender: match[2],
    message: text
  };
}

function parseChatMessages(root = document) {
  const elements = root.querySelectorAll(
    "[data-pre-plain-text]"
  );

  return Array.from(elements)
    .map(parseMessageElement)
    .filter(Boolean);
}