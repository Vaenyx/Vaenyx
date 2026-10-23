import path from 'node:path';

const languages: Record<string, string[]> = {
	TypeScript: ['.ts', '.tsx', '.mts', '.cts'],
	JavaScript: ['.js', '.jsx', '.mjs', '.cjs'],
	Rust: ['.rs'],
	Python: ['.py', '.pyw', '.pyi'],
	C: ['.c', '.h'],
	Cpp: ['.cpp', '.cc', '.cxx', '.hpp', '.hh', '.hxx', '.ipp', '.tpp'],
	CSharp: ['.cs', '.csx'],
	Java: ['.java'],
	Kotlin: ['.kt', '.kts'],
	Swift: ['.swift'],
	Go: ['.go'],
	Ruby: ['.rb', '.rake', '.gemspec'],
	PHP: ['.php', '.phtml'],
	Scala: ['.scala', '.sc'],
	Dart: ['.dart'],
	Lua: ['.lua'],
	LLVM: ['.ll', '.bc'],
	Shell: ['.sh', '.bash', '.zsh', '.fish', '.ksh'],
	Perl: ['.pl', '.pm'],
	Haskell: ['.hs', '.lhs'],
	OCaml: ['.ml', '.mli'],
	Elixir: ['.ex', '.exs'],
	Erlang: ['.erl', '.hrl'],
	Julia: ['.jl'],
	R: ['.r', '.rmd'],
	Assembly: ['.asm', '.s', '.inc'],
	Zig: ['.zig'],
	Nim: ['.nim', '.nims'],
	Fortran: ['.f', '.for', '.f90', '.f95', '.f03', '.f08'],
	COBOL: ['.cob', '.cbl'],
	SQL: ['.sql', '.psql'],
	HTML: ['.html', '.htm'],
	CSS: ['.css', '.scss', '.sass', '.less'],
	JSON: ['.json', '.jsonc', '.json5'],
	YAML: ['.yaml', '.yml'],
	TOML: ['.toml'],
	XML: ['.xml', '.xsl', '.xslt', '.xsd'],
	Markdown: ['.md', '.mdx', '.markdown'],
	GraphQL: ['.graphql', '.gql'],
	Protobuf: ['.proto'],
	Vue: ['.vue'],
	Svelte: ['.svelte'],
	SvelteKit: ['.svelte.ts', '.svelte.js'],
	Solidity: ['.sol'],
	PowerShell: ['.ps1', '.psm1', '.psd1'],
	Batch: ['.bat', '.cmd'],
	Docker: ['.dockerfile'],
	Nix: ['.nix'],
	TeX: ['.tex', '.sty', '.cls'],
};

export function detectLanguage(filename: string): string | undefined {
	const name = path.basename(filename).toLowerCase();

	return Object.entries(languages).find(
		([, extensions]) => extensions.some(ext => name.endsWith(ext))
	)?.[0];
}
