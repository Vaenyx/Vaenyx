import { detectLanguage } from './detect-language.js';
import { blameFile } from './blame-file.js';
import { getTrackedFiles } from './get-tracked-files.js';

interface AuthoredLinesReponse {
	totalLines: number;
	languageTotalLines: Record<string, number>;
}

export async function getAuthoredLines(repoPath: string, myEmails: Set<string>): Promise<AuthoredLinesReponse> {
	const files = await getTrackedFiles(repoPath);

	let total = 0;

	const languageStats: Record<string, number> = {};

	for (const file of files) {
		const language = detectLanguage(file);

		if (!language) {
			continue;
		}

		const blamedLines = await blameFile(repoPath, file);

		for (const line of blamedLines) {
			if (!myEmails.has(line)) {
				continue;
			}

			total++;

			languageStats[language] = (languageStats[language] ?? 0) + 1;
		}
	}

	return {
		totalLines: total,
		languageTotalLines: languageStats,
	};
}
