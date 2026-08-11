const exportBtn = document.getElementById("exportBtn");
const status = document.getElementById("status");

exportBtn.addEventListener("click", async () => {
  status.textContent = "Checking WhatsApp Web...";

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
          status.textContent = "No messages detected.";
          return;
        }

        const count = response.messages.length;

        status.textContent =
          count > 0
            ? `${count} messages detected.`
            : "No visible messages detected.";
      }
    );
  } catch (error) {
    console.error("ChatScribe error:", error);
    status.textContent = "Something went wrong.";
  }
});