import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App";

async function run() {
  console.log("-----------------------------------------");
  console.log("🚀 Starting Static Site Pre-renderer (SSG)");
  console.log("-----------------------------------------");

  const distPath = path.resolve(process.cwd(), "dist");
  const indexBuffer = path.join(distPath, "index.html");

  if (!fs.existsSync(indexBuffer)) {
    console.error("❌ Error: dist/index.html was not found. Please run 'vite build' first.");
    process.exit(1);
  }

  // 1. Copy the resultsSellIcon over so that it is served natively from the root of dist/
  const srcImage = path.resolve(process.cwd(), "src/assets/images/regenerated_image_1779429777432.webp");
  const destImage = path.join(distPath, "regenerated_image.webp");
  try {
    if (fs.existsSync(srcImage)) {
      fs.copyFileSync(srcImage, destImage);
      console.log("📂 Copied resultsSellIcon image successfully to 'dist/regenerated_image.webp'!");
    } else {
      console.warn("⚠️ Warning: Source image was not found at:", srcImage);
    }
  } catch (err) {
    console.error("❌ Failed to copy source image:", err);
  }

  // 2. Read index.html compiled by vite
  let htmlTemplate = fs.readFileSync(indexBuffer, "utf-8");

  // 2. Render the react app component tree to a static html string
  console.log("📦 Pre-rendering React component tree '<App />' to HTML string...");
  const renderedApp = renderToString(React.createElement(App));

  // 3. Inject pre-rendered content back into index.html inside <div id="root"></div>
  const rootPlaceholder = '<div id="root"></div>';
  const targetReplacement = `<div id="root">${renderedApp}</div>`;

  if (!htmlTemplate.includes(rootPlaceholder)) {
    console.warn("⚠️ Warning: Could not find exact '<div id=\"root\"></div>' in index.html.");
    // Lets try to find and replace any other version or space-variations
    const rootRegex = /<div\s+id="root"\s*><\/div>/i;
    if (rootRegex.test(htmlTemplate)) {
      htmlTemplate = htmlTemplate.replace(rootRegex, targetReplacement);
    } else {
      console.error("❌ Error: <div id=\"root\"></div> container is missing in the built index.html!");
      process.exit(1);
    }
  } else {
    htmlTemplate = htmlTemplate.replace(rootPlaceholder, targetReplacement);
  }

  // 4. Save the fully-rendered index.html
  fs.writeFileSync(indexBuffer, htmlTemplate, "utf-8");
  console.log("🌟 Success! Loaded all components successfully. Prebuilt static HTML generated in 'dist/index.html'!");
  console.log("-----------------------------------------");
}

run().catch((err) => {
  console.error("❌ Prerender script failed with error:", err);
  process.exit(1);
});
