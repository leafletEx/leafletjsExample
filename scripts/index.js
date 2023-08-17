import { getAllExamples } from './updateExamplesList.js';
import { updateContributors } from './updateContributors.js';
import { getComponentContributor } from './updateComponentContributor.js';

export async function init() {
  await getAllExamples();
  // await updateContributors();
  await getComponentContributor();
}
init()
