import { updateContributors } from './updateContributors.js';
import { generateExamplesJson } from './updateExamplesList.js';
import { getComponentContributor } from './updateComponentContributor.js';

export async function main() {
  await updateContributors();
  await generateExamplesJson();
  await getComponentContributor();
}

main();
