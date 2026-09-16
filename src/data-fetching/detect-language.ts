import path from 'node:path';

const languages: Record<string, string> = {
	'.ts': 'TypeScript',
	'.tsx': 'TypeScript',
	'.js': 'JavaScript',
	'.jsx': 'JavaScript',
	'.rs': 'Rust',
	'.py': 'Python',
	'.c': 'C',
	'.h': 'C',
	'.cpp': 'Cpp',
	'.hpp': 'Cpp',
	'.sh': 'Shell',
	'.bash': 'Shell',
	'.lua': 'Lua',
};

export function detectLanguage(filename: string): string | undefined {
	return languages[path.extname(filename).toLowerCase()];
}
