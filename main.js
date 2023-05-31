// ==UserScript==
// @name         自动查找文本并显示数量
// @version      1.3
// @description  在页面中查找勾选的文本，并将查找到的数目显示在光标附近。当查找到的匹配文本个数是一个或两个时，提示框背景显示为浅绿色；大于两个时显示为浅红色。
//在下面可以修改作用的网页
// @match        https://baike.sogou.com/*
// ==/UserScript==

(function() {
    'use strict';

    // 显示查找到的数目
    function showResultCount(count) {
        const countDisplay = document.createElement('div');
        countDisplay.style.position = 'fixed';
        countDisplay.style.border = '1px solid #000';
        countDisplay.style.padding = '4px';
        countDisplay.style.fontWeight = 'bold';
        countDisplay.style.zIndex = '9999';

        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        countDisplay.textContent = '查找到 ' + count + ' 个结果';
        countDisplay.style.top = rect.top + 'px';
        countDisplay.style.left = rect.left + 'px';

        // 设置提示框背景颜色
        if (count === 1 || count === 2) {
            countDisplay.style.background = 'lightgreen';
        } else {
            countDisplay.style.background = 'lightcoral';
        }

        document.body.appendChild(countDisplay);
      
        setTimeout(function() {
            countDisplay.remove();
        }, 700);//自定义显示的持续时间单位ms
    }

    // 查找选中的文本
    function findSelectedText() {
        const selection = window.getSelection();
        const text = selection.toString().trim();

        if (text.length > 0) {
            const regex = new RegExp(text, 'gi');
            const count = (document.body.innerText.match(regex) || []).length;
            showResultCount(count);
        }
    }

    // 启用光标选择文本后自动查找
    document.addEventListener('mouseup', findSelectedText);
})();
