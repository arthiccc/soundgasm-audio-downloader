// ==UserScript==
// @name         Soundgasm Audio Downloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a download button for audio files on soundgasm.net by parsing the page source.
// @author       Copilot
// @match        https://soundgasm.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get full page source
    const pageSource = document.documentElement.innerHTML;

    // Regex to find audio URL
    const audioRegex = /(https:\/\/media\.soundgasm\.net\/sounds\/[a-zA-Z0-9]+\.m4a)/;
    const m4aRegex = /m4a:\s*["'](https:\/\/media\.soundgasm\.net\/sounds\/[a-zA-Z0-9]+\.m4a)["']/;

    // Try both patterns
    const match = pageSource.match(audioRegex) || pageSource.match(m4aRegex);
    const audioUrl = match ? match[1] : null;

    if (audioUrl) {
        // Create download button
        const button = document.createElement('a');
        button.href = audioUrl;
        button.textContent = '⬇ Download Audio';
        button.style.position = 'fixed';
        button.style.top = '20px';
        button.style.right = '20px';
        button.style.padding = '10px 15px';
        button.style.backgroundColor = '#ff5c5c';
        button.style.color = '#fff';
        button.style.fontWeight = 'bold';
        button.style.borderRadius = '5px';
        button.style.textDecoration = 'none';
        button.style.zIndex = '9999';
        button.setAttribute('download', '');

        document.body.appendChild(button);
    }
})();
