chrome.storage.local.get(["darkMode"], function (result) {
    if (result.darkMode) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.add("light");
    }
    
    document.body.classList.add("loaded");
});

document.addEventListener("DOMContentLoaded", function () {
    const urlDisplay = document.getElementById("current-url");
    const keyInput = document.getElementById("jwtKey");
    const enableScriptCheckbox = document.getElementById("enableScript");
    const saveButton = document.getElementById("saveKey");
    const deleteButton = document.getElementById("deleteKey");
    const statusMessage = document.getElementById("status");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const fullUrl = tabs[0].url;
        urlDisplay.textContent = `Current URL: ${fullUrl}`;

        chrome.storage.local.get([fullUrl], function (result) {
            if (result[fullUrl]) {
                keyInput.value = result[fullUrl].jwt || "";
                enableScriptCheckbox.checked = result[fullUrl].enabled || false;
            }
        });

        saveButton.addEventListener("click", function () {
            const jwt = keyInput.value.trim();
            const enabled = enableScriptCheckbox.checked;

            chrome.storage.local.set({ [fullUrl]: { jwt, enabled } }, function () {
                showStatusMessage("Saved!", "#28a745");
            });
        });

        deleteButton.addEventListener("click", function () {
            chrome.storage.local.remove(fullUrl, function () {
                keyInput.value = "";
                enableScriptCheckbox.checked = false;
                showStatusMessage("Deleted!", "#f44336");
            });
        });
    });

    chrome.storage.local.get(["darkMode"], function (result) {
        darkModeToggle.checked = result.darkMode || false;
    });

    darkModeToggle.addEventListener("change", function () {
        const isDark = darkModeToggle.checked;
        body.classList.toggle("dark", isDark);
        body.classList.toggle("light", !isDark);
        chrome.storage.local.set({ darkMode: isDark });
    });

    function showStatusMessage(message, color = "#007bff") {
        statusMessage.textContent = message;
        statusMessage.style.color = color;
        setTimeout(() => {
            statusMessage.textContent = "";
        }, 2000);
    }
});
