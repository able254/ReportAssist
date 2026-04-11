import { useEffect } from "react";

const BotpressChat = () => {
  useEffect(() => {
    // Prevent duplicate loading
    if (document.getElementById("botpress-script")) return;

    const injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    injectScript.id = "botpress-script";
    injectScript.async = true;

    const configScript = document.createElement("script");
    configScript.src =
      "https://files.bpcontent.cloud/2026/03/18/11/20260318114248-B6II08PO.js";
    configScript.id = "botpress-config";
    configScript.defer = true;

    document.body.appendChild(injectScript);
    document.body.appendChild(configScript);

    return () => {
      // Remove the injected scripts and any Botpress DOM artifacts when leaving the citizen dashboard.
      if (window.botpressWebChat && typeof window.botpressWebChat.destroy === "function") {
        window.botpressWebChat.destroy();
      }
      delete window.botpressWebChat;

      document.querySelectorAll(
        [
          "#botpress-script",
          "#botpress-config",
          "script[src*='botpress.cloud']",
          "script[src*='bpcontent.cloud']",
          ".bpw-widget",
          ".bpw-rocket",
          ".bpw-frame",
          ".bp-widget",
          "[data-bp-widget]",
          "#bp-webchat",
        ].join(",")
      ).forEach((node) => node.remove());
    };
  }, []);

  return null;
};

export default BotpressChat;