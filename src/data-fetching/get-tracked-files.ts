import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export async function getTrackedFiles(repoPath: string): Promise<string[]> {
	const { stdout } = await execFileAsync('git', ['-C', repoPath, 'ls-files'], {
		maxBuffer: 100 * 1024 * 1024,
	});

	return stdout
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean);
}
