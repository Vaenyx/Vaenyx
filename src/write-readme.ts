import fs from 'node:fs/promises';

const README_PATH = './README.md';

export async function writeReadme(content: string): Promise<void> {
	const readme = await fs.readFile(README_PATH, 'utf8');

	const replacement = `<!-- STATS:START -->\n${content}\n<!-- STATS:END -->`;

	const updated = readme.replace(/<!-- STATS:START -->[\s\S]*?<!-- STATS:END -->/, replacement);

	await fs.writeFile(README_PATH, updated);

	console.log('README updated');
}
