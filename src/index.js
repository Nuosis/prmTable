import MyApp from "./myApp";
import React from "react";
import { createRoot } from "react-dom/client";

let root; // Store the root outside the function
window.loadTable = (data) => {
    console.log('version', 1.002);
    const json = JSON.parse(data);
    console.log('initData', json);
    const headlines = Array.isArray(json.headlines) ? json.headlines : (json.headlines ? [json.headlines] : []);
    console.log('initHeadlines', headlines);
    const tags = Array.isArray(json.headlineTags) ? json.headlineTags : (json.headlineTags ? [json.headlineTags] : []);
    console.log('initTags', tags);

    // Unmount existing React component if any
    if (root) {
        root.unmount();
        root = null; // Set root to null after unmounting
    }

    // Load the new React app
    try {
        const container = document.getElementById("root");
        if (container) {
            // Create a new root if it doesn't exist
            if (!root) {
                root = createRoot(container);
            }
            root.render(<MyApp initTags={tags} initHeadlines={headlines} />);
        } else {
            console.error("Element with id 'root' not found during mount");
        }
    } catch (e) {
        console.error("Error loading app v1.03:", e);
    }
};
