// ==UserScript==
// @name         Soundgasm Audio Downloader with Filename
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds a download button for audio files on soundgasm.net with custom filename based on title and author.
// @author       Copilot
// @match        https://soundgasm.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const pageSource = document.documentElement.innerHTML;

    // Regex to find audio URL
    const audioRegex = /(https:\/\/media\.soundgasm\.net\/sounds\/[a-zA-Z0-9]+\.m4a)/;
    const m4aRegex = /m4a:\s*["'](https:\/\/media\.soundgasm\.net\/sounds\/[a-zA-Z0-9]+\.m4a)["']/;
    const match = pageSource.match(audioRegex) || pageSource.match(m4aRegex);
    const audioUrl = match ? match[1] : null;

    // Regex to extract title and author
    const titleMatch = pageSource.match(/<div class="jp-title"[^>]*>(.*?)<\/div>/);
    const authorMatch = pageSource.match(/<a href="https:\/\/soundgasm\.net\/u\/([^"]+)">/);

    const title = titleMatch ? titleMatch[1].trim().replace(/[\\/:*?"<>|]/g, '') : 'audio';
    const author = authorMatch ? authorMatch[1].trim().replace(/[\\/:*?"<>|]/g, '') : 'unknown';
    const filename = `${title} - ${author}.m4a`;

    if (audioUrl) {
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
        button.setAttribute('download', filename);

        document.body.appendChild(button);
    }
})();
