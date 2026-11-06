document.addEventListener("DOMContentLoaded", () => {
  const rpcUrlInput = document.getElementById("rpcUrl");
  const slippageInput = document.getElementById("slippage");
  const priorityFeeInput = document.getElementById("priorityFee");
  const preset1Input = document.getElementById("preset1");
  const preset2Input = document.getElementById("preset2");
  const preset3Input = document.getElementById("preset3");
  const devAlertToggle = document.getElementById("devAlertToggle");
  const saveBtn = document.getElementById("saveBtn");
  const statusMsg = document.getElementById("status");

  // Load saved preferences from chrome.storage
  chrome.storage.local.get(
    ["rpcUrl", "slippage", "priorityFee", "presets", "devAlerts"],
    (data) => {
      if (data.rpcUrl) rpcUrlInput.value = data.rpcUrl;
      if (data.slippage) slippageInput.value = data.slippage;
      if (data.priorityFee) priorityFeeInput.value = data.priorityFee;
      if (data.presets) {
        preset1Input.value = data.presets[0] || 0.2;
        preset2Input.value = data.presets[1] || 0.5;
        preset3Input.value = data.presets[2] || 1.0;
      }
      if (data.devAlerts !== undefined) devAlertToggle.checked = data.devAlerts;
    }
  );

  // Save settings
  saveBtn.addEventListener("click", () => {
    const settings = {
      rpcUrl: rpcUrlInput.value.trim(),
      slippage: parseFloat(slippageInput.value) || 5,
      priorityFee: parseFloat(priorityFeeInput.value) || 0.005,
      presets: [
        parseFloat(preset1Input.value) || 0.2,
        parseFloat(preset2Input.value) || 0.5,
        parseFloat(preset3Input.value) || 1.0
      ],
      devAlerts: devAlertToggle.checked
    };

    chrome.storage.local.set(settings, () => {
      statusMsg.style.color = "#4ade80";
      statusMsg.textContent = "Settings saved successfully!";
      setTimeout(() => {
        statusMsg.textContent = "";
      }, 2500);
    });
  });
});
