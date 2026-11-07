// Background Service Worker for Pump.fun Pro Terminal (Manifest V3)

chrome.runtime.onInstalled.addListener(() => {
  console.log("⚡ Pump.fun Pro Trading Terminal Extension installed successfully.");
  // Initialize default preferences
  chrome.storage.local.set({
    rpcUrl: "https://api.mainnet-beta.solana.com",
    slippage: 5.0,
    priorityFee: 0.005,
    presets: [0.2, 0.5, 1.0],
    devAlerts: true
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "EXECUTE_FAST_BUY") {
    handleFastBuy(request)
      .then((res) => sendResponse(res))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true; // Keep message channel open for async response
  }
});

async function handleFastBuy(request) {
  const startTime = Date.now();
  const settings = await chrome.storage.local.get(["rpcUrl", "priorityFee", "slippage"]);

  // Realistic fast execution simulation
  await new Promise((resolve) => setTimeout(resolve, 140));

  const latencyMs = Date.now() - startTime;
  return {
    success: true,
    amountSol: request.amountSol,
    latencyMs,
    txSignature: `sim_tx_${Date.now()}_ext`
  };
}

