interface Envs {
	emails: Set<string>;
}

function toSet(input: string): Set<string> {
	return new Set(
		input
			.split(',')
			.map((email) => email.trim().toLowerCase())
			.filter(Boolean),
	);
}

function getEnvs(): Envs {
	if (process.env['MY_GIT_EMAILS'] === undefined) throw new Error('MY_GIT_EMAILS is not set');
	const emails = toSet(process.env['MY_GIT_EMAILS']);

	return {
		emails: emails,
	};
}

const envs = getEnvs();

export interface CONFIG extends Envs {
	username: string;
}

export const CONFIG: CONFIG = {
	emails: envs.emails,
	username: 'Vaenyx',
};
