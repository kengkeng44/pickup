import { readFileSync } from 'node:fs';
const data = JSON.parse(readFileSync('./public/lessons-ch1.json', 'utf-8'));
for (const lessonId of ['kt-ch1-l3', 'kt-ch1-l4']) {
  const l = data.find((x) => x.id === lessonId);
  console.log(`\n=== ${lessonId} ===`);
  for (const q of l.questions) {
    console.log(`${q.id} type=${q.type} correctIndex=${q.correctIndex} opts=${q.options ? q.options.length : 'N/A'}`);
  }
}
