import { execFile } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export async function cloneRepo(cloneUrl: string, repoName: string, directory: string): Promise<string> {
	const target = path.join(directory, repoName);

	await execFileAsync('git', ['clone', '--quiet', cloneUrl, target]);

	return target;
}
