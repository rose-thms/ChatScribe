const exportBtn = document.getElementById("exportBtn");
const status = document.getElementById("status");
const preview = document.getElementById("preview");

exportBtn.addEventListener("click", async () => {
  status.textContent = "Reading chat...";
  preview.innerHTML = "";

  try {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    const activeTab = tabs[0];

    if (!activeTab?.id || !activeTab.url?.startsWith("https://web.whatsapp.com/")) {
      status.textContent = "Open WhatsApp Web first.";
      return;
    }

    chrome.tabs.sendMessage(
      activeTab.id,
      { type: "GET_VISIBLE_MESSAGES" },
      (response) => {
        if (chrome.runtime.lastError) {
          status.textContent = "ChatScribe is not connected to this page.";
          console.error(chrome.runtime.lastError);
          return;
        }

        if (!response?.success) {
          status.textContent = response?.error || "Unable to read messages.";
          return;
        }

        const messages = response.messages || [];

        status.textContent = `${messages.length} messages detected.`;

        messages.slice(0, 10).forEach((message) => {
          const item = document.createElement("div");

          item.className = "message";

          item.innerHTML = `
            <strong>${escapeHtml(message.sender || "Unknown")}</strong>
            <small>${escapeHtml(message.timestamp || "")}</small>
            <div>${escapeHtml(message.message)}</div>
          `;

          preview.appendChild(item);
        });
      }
    );
  } catch (error) {
    console.error("ChatScribe error:", error);
    status.textContent = "Something went wrong.";
  }
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}