(function () {
    let lastUrl = window.location.href;
    let firstTime = true

    function checkAndRunScript() {
        const currentUrl = window.location.href;

        if (firstTime || currentUrl !== lastUrl) {
            firstTime = false
            lastUrl = currentUrl;

            chrome.storage.local.get([currentUrl], function (result) {
                if (result[currentUrl] && result[currentUrl].enabled) {
                    const jwtToken = result[currentUrl].jwt;
                    if (!jwtToken) return;

                    function setToken() {
                        const authorizeButton = document.querySelector('.authorize');
                        if (authorizeButton) {
                            authorizeButton.click();
                            setTimeout(() => {
                                let inputs = document.querySelectorAll('input[type="text"]');
                                if (inputs.length > 0) {
                                    inputs[0].value = jwtToken;
                                    inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
                                    setTimeout(() => {
                                        const authorizeSubmit = document.querySelector('.auth');
                                        if (authorizeSubmit) {
                                            authorizeSubmit.click();
                                        }
                                        setTimeout(() => {
                                            const done = document.querySelector('.btn-done');
                                            if (done) {
                                                done.click();
                                            }
                                        }, 100);
                                    }, 100);
                                }
                            }, 100);
                        }
                    }

                    setTimeout(setToken, 2000);
                }
            });
        }
    }

    checkAndRunScript();

    const observer = new MutationObserver(checkAndRunScript);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("popstate", checkAndRunScript);
    window.addEventListener("pushstate", checkAndRunScript);
    window.addEventListener("replacestate", checkAndRunScript);

    window.addEventListener("load", checkAndRunScript);
})();
