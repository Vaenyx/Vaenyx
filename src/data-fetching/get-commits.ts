import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

interface Commit {
	hash: string;
	authorEmail: string;
	timestamp: number;
}

export async function getCommits(repoPath: string): Promise<Commit[]> {
	const separator = '\x1f';

	const { stdout } = await execFileAsync('git', ['-C', repoPath, 'log', '--all', `--format=%H${separator}%an${separator}%ae${separator}%at`]);

	return stdout
		.trim()
		.split('\n')
		.map((line) => {
			const [hash, _authorName, authorEmail, timestamp] = line.split(separator);

			if (hash === undefined || authorEmail === undefined || timestamp === undefined) {
				return {
					hash: '',
					authorEmail: '',
					timestamp: 0,
				};
			}

			return {
				hash: hash,
				authorEmail: authorEmail,
				timestamp: +timestamp,
			};
		});
}
