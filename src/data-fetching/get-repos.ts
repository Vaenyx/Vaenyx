export interface GitHubRepository {
	name: string;
	full_name: string;
	html_url: string;
	clone_url: string;
	fork: boolean;
}

export async function getRepos(username: string): Promise<GitHubRepository[]> {
	const repos: GitHubRepository[] = [];

	for (let page = 1; ; page++) {
		const response = await fetch(`https://api.github.com/users/${username}/repos?type=owner&per_page=100&page=${String(page)}`);

		if (!response.ok) {
			throw new Error(`GitHub API error ${String(response.status)}: ${await response.text()}`);
		}

		const current = (await response.json()) as GitHubRepository[];

		repos.push(...current);

		if (current.length < 100) {
			break;
		}
	}

	return repos;
}
