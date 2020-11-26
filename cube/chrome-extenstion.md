---
time: '1996-09-08T23:37:07+08:00'
id: 'r7tkosu'
---

# background script console
在chrome://extensions/ 直接点自己插件的直接点自己插件的背景页
# 如何添加右键菜单
```json
//mainfest
  "permissions": [
    "contextMenus"
  ],
```
```js
//background.js
  const title = "right click memu item";
  const id = chrome.contextMenus.create({
    "title": title,
    "contexts": ["all"],
    "id": "right-click-menu-id"
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === id) {
        console.log("click me")
    }
  });
```
# 打开自己的界面
```js
chrome.tabs.create({ url: chrome.runtime.getURL("you_page.html") });
```

# pem 文件
在chrome浏览器中第一次打包时生成