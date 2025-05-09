# 🚀 Swagger Auto Authorize - Chrome Extension

**Swagger Auto Authorize** is a Chrome extension that **automates JWT token authentication** for Swagger UI.  
It automatically inserts your saved JWT token into Swagger UI, making API testing faster and easier.

## 📌 Features

✅ **Automatic JWT Entry:** Save your JWT token, and it will be automatically inserted into Swagger UI.  
✅ **Easy to Use:** Add, edit, and delete tokens through the extension popup.  
✅ **Dark & Light Mode Support:** Switch themes based on your preference.  
✅ **Auto Authorization:** Re-applies the token when the page changes.  
✅ **Secure Storage:** Tokens are stored locally using **Chrome Storage API**.  

---

## 🛠️ Installation

### 1️⃣ **Manual Installation (Developer Mode)**
1. **Clone or download this repository:**
   ```sh
   git clone https://github.com/kemkum53/swagger-auto-authorize.git
   ```
2. **Open Chrome Extensions page:**  
   `chrome://extensions/`
3. **Enable "Developer Mode"** (top-right corner).
4. Click **"Load Unpacked"**, then **select the project folder**.
5. Once loaded, you’ll see the extension icon in the toolbar! 🎉  

---

## 🔧 Usage

### **1️⃣ Saving a JWT Token**
- Open **Swagger UI** (`https://your-api.com/swagger/`).
- Click the extension icon, enter your **JWT token**, and press **"Save"**.
- Refresh the page, and the token will be **automatically applied!** ✅

### **2️⃣ Deleting a Saved Token**
- Open the extension and click **"Delete"**.
- Refresh the page; the token will be removed.

### **3️⃣ Enabling Dark Mode**
- Use the **Dark Mode Toggle** in the popup to switch between themes.

---

## 📂 Project Structure

```sh
swagger-auto-authorize/
│── icon.png             # Extension icons
│── content.js           # Injected script to automate JWT insertion
│── popup.html           # User interface (Popup)
│── popup.js             # Handles popup interactions
│── popup.css            # Styles for the popup
│── manifest.json        # Chrome extension configuration
│── README.md            # This file 📖
```

---

## 📜 **manifest.json Configuration**
This extension is configured as follows in **manifest.json**:

```json
{
    "manifest_version": 3,
    "name": "Swagger Auto Authorize",
    "version": "1.1",
    "description": "Automatically inserts JWT tokens into Swagger UI.",
    "permissions": ["storage"],
    "host_permissions": ["*://*/swagger/*"],
    "content_scripts": [
        {
            "matches": ["*://*/swagger/*"],
            "js": ["content.js"],
            "run_at": "document_end"
        }
    ],
    "action": {
        "default_popup": "popup.html",
        "default_icon": {
            "16": "icon.png",
            "48": "icon.png",
            "128": "icon.png"
        }
    },
    "background": {
        "service_worker": "background.js"
    },
    "icons": {
        "16": "icon.png",
        "48": "icon.png",
        "128": "icon.png"
    }
}
```

### 🔐 Permissions Configuration

If your Swagger UI URL does not follow the pattern `*/swagger/*`, you need to update the `host_permissions` and `content_scripts.matches` fields accordingly.

Here is an example configuration you can use:

```json
"host_permissions": ["<all_urls>"],
"content_scripts": [
    {
        "matches": ["<all_urls>"],
        "js": ["content.js"],
        "run_at": "document_end"
    }
],
```

> ℹ️ **Note:** Although `<all_urls>` allows the extension to request access to all pages, the script **will not run automatically**. It is only executed **after being explicitly activated by the user**, ensuring controlled and intentional behavior.

---

## 🏗️ **Development & Contributions**
🎯 If you'd like to contribute:  
- **Report bugs or suggest improvements.**  
- **Submit a pull request with new features.**  
- **Enhance the codebase for better performance.**  

---

## 📜 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

💡 **Congratulations on building Swagger Auto Authorize!** 🎉  
If you need any help, feel free to ask! 🚀
