import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

export async function readInput(prompt: string): Promise<string> {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(prompt);
  rl.close();
  return answer;
}
