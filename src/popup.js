const exportBtn = document.getElementById("exportBtn");
const status = document.getElementById("status");

exportBtn.addEventListener("click", async () => {
  status.textContent = "Checking WhatsApp Web...";

  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  const activeTab = tabs[0];

  if (!activeTab || !activeTab.url?.startsWith("https://web.whatsapp.com/")) {
    status.textContent = "Open WhatsApp Web first.";
    return;
  }

  status.textContent = "ChatScribe is ready.";
});