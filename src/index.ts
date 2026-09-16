import { writeReadme } from './write-readme.js';

import { fetchData } from './data-fetching/index.js';

const data = await fetchData();

await writeReadme(`\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``);
