// Injected Content Script for Pump.fun & DexScreener Pro Terminal

(function initTerminal() {
  console.log("%c⚡ [Pump.fun Pro Terminal] Injected successfully", "color: #38bdf8; font-weight: bold;");

  // Create floating terminal bar if not already present
  function injectTerminalOverlay() {
    if (document.getElementById("pumpfun-pro-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "pumpfun-pro-overlay";
    overlay.innerHTML = `
      <div style="
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 999999;
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid #334155;
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6);
        padding: 12px 16px;
        color: #f8fafc;
        display: flex;
        flex-direction: column;
        gap: 10px;
        backdrop-filter: blur(8px);
        font-family: monospace;
        min-width: 280px;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: bold; color: #38bdf8; font-size: 13px;">⚡ QUICK SNIPE</span>
          <span id="bonding-meter" style="font-size: 11px; color: #4ade80;">Bonding: 68%</span>
        </div>

        <div style="height: 4px; background: #1e293b; border-radius: 2px; overflow: hidden;">
          <div id="bonding-progress-bar" style="width: 68%; height: 100%; background: linear-gradient(90deg, #38bdf8, #4ade80);"></div>
        </div>

        <div style="display: flex; gap: 8px;">
          <button class="snipe-btn" data-sol="0.2" style="flex: 1; padding: 6px; background: #0284c7; border: none; border-radius: 6px; color: white; cursor: pointer; font-weight: bold; font-size: 12px;">+0.2</button>
          <button class="snipe-btn" data-sol="0.5" style="flex: 1; padding: 6px; background: #0284c7; border: none; border-radius: 6px; color: white; cursor: pointer; font-weight: bold; font-size: 12px;">+0.5</button>
          <button class="snipe-btn" data-sol="1.0" style="flex: 1; padding: 6px; background: #0284c7; border: none; border-radius: 6px; color: white; cursor: pointer; font-weight: bold; font-size: 12px;">+1.0</button>
        </div>

        <div id="dev-status-alert" style="font-size: 10px; color: #94a3b8; text-align: center;">
          🛡️ Dev Wallet: Holding 100% initial tokens
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Attach click listeners to Quick Snipe buttons
    overlay.querySelectorAll(".snipe-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const amount = e.target.getAttribute("data-sol");
        executeQuickBuy(amount);
      });
    });
  }

  function executeQuickBuy(amountSol) {
    const alertBox = document.getElementById("dev-status-alert");
    if (alertBox) {
      alertBox.textContent = `🚀 Dispatching 0-Block Snipe for ${amountSol} SOL...`;
      alertBox.style.color = "#38bdf8";
    }

    // Send transaction request to background service worker
    chrome.runtime.sendMessage(
      { action: "EXECUTE_FAST_BUY", amountSol: parseFloat(amountSol), url: window.location.href },
      (response) => {
        if (response && response.success) {
          if (alertBox) {
            alertBox.textContent = `✅ Order Executed in ${response.latencyMs}ms!`;
            alertBox.style.color = "#4ade80";
          }
        }
      }
    );
  }

  // Poll DOM to inject overlay when page elements load
  const checkInterval = setInterval(() => {
    if (document.body) {
      injectTerminalOverlay();
      clearInterval(checkInterval);
    }
  }, 500);
})();

