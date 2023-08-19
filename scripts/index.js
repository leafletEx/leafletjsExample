import { updateContributors } from './updateContributors.js';
import { getAllExamples } from './updateExamplesList.js';
import { getComponentContributor } from './updateComponentContributor.js';

export async function init() {
  await updateContributors();
  await getAllExamples();
  await getComponentContributor();
}

init();
