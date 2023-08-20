import { updateContributors } from './updateContributors.js';
import { generateExamplesJson } from './updateExamplesList.js';
import { generateComponentContributorJson } from './updateComponentContributor.js';

export async function main() {
  await updateContributors();
  await generateExamplesJson();
  await generateComponentContributorJson();
}

main();
