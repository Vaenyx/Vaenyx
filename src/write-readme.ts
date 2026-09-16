import fs from "node:fs/promises";

const README_PATH = "./README.md";

export async function writeReadme(content: string): Promise<void> {
  const readme = await fs.readFile(README_PATH, "utf8");
  
  const replacement = `<STATS>\n${content}\n</STATS>`;

  const updated = readme.replace(
    /<STATS>[\s\S]*?<\/STATS>/,
    replacement,
  );

  await fs.writeFile(README_PATH, updated);

  console.log("README updated");
  }
