import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { CONFIG } from '../config.js';
import { getRepos } from './get-repos.js';
import { getCommits, type Commit } from './get-commits.js';
import { cloneRepo } from './clone-repo.js';
import { getAuthoredLines, type AuthoredLineResponse } from './get-authored-lines.js';

interface UniqueCommit {
	hash: string;
	timestamp: number;
	repositories: Set<string>;
}

interface fetchDataReponse {
	repositoriesScanned: number;

	repositoriesContributedTo: number;

	uniqueCommits: number;

	authoredLines: number;

	languageAuthoredLines: Record<string, number>;
}

export async function fetchData(): Promise<fetchDataReponse> {
	console.log(`Loaded ${CONFIG.emails.size} git identities`);

	const repos = await getRepos(CONFIG.username);

	console.log(`Found ${repos.length} repositories`);

	const contributedRepos = new Set<string>();
	const uniqueCommits = new Map<string, UniqueCommit>();
	const totals: AuthoredLineResponse = { totalLines: 0, languageTotalLines: {} };

	const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'profile-stats-'));

	for (const [index, repo] of repos.entries()) {
		console.log(`Cloning repo ${index + 1} (${repo.name})`);

		const repoPath = await cloneRepo(repo.clone_url, repo.name, tempDir);
		const commits = await getCommits(repoPath);

		let myCommitCount = 0;

		for (const commit of commits) {
			if (!CONFIG.emails.has(commit.authorEmail.toLowerCase())) {
				continue;
			}

			myCommitCount++;

			const existing = uniqueCommits.get(commit.hash);

			if (existing) {
				existing.repositories.add(repo.full_name);
			} else {
				uniqueCommits.set(commit.hash, {
					hash: commit.hash,
					timestamp: commit.timestamp,
					repositories: new Set([repo.full_name]),
				});
			}
		}

		if (myCommitCount > 0) {
			contributedRepos.add(repo.full_name);
		}

		const loc = await getAuthoredLines(repoPath, CONFIG.emails);

		totals.totalLines += loc.totalLines;

		for (const [language, lines] of Object.entries(loc.languageTotalLines)) {
			totals.languageTotalLines[language] = (totals.languageTotalLines[language] ?? 0) + lines;
		}

		console.log(`commits=${myCommitCount}, loc=${loc.totalLines}`);
	}

	return {
		repositoriesScanned: repos.length,

		repositoriesContributedTo: contributedRepos.size,

		uniqueCommits: uniqueCommits.size,

		authoredLines: totals.totalLines,

		languageAuthoredLines: Object.fromEntries(Object.entries(totals.languageTotalLines).sort(([, a], [, b]) => b - a)),
	};
}
