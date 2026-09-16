import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
type email = string;

export async function blameFile(repoPath: string, filename: string): Promise<email[]> {
	let stdout: string;

	try {
		({ stdout } = await execFileAsync('git', ['-C', repoPath, 'blame', '-wMCC', '--line-porcelain', 'HEAD', '--', filename], {
			maxBuffer: 100 * 1024 * 1024,
		}));
	} catch {
		return [];
	}

	const lines: email[] = [];

	let currentEmail = '';

	for (const line of stdout.split('\n')) {
		if (line.startsWith('author-mail ')) {
			currentEmail = line.slice('author-mail '.length).replace(/^</, '').replace(/>$/, '').toLowerCase();
		}

		if (line.startsWith('\t')) {
			lines.push(currentEmail);
		}
	}

	return lines;
}
