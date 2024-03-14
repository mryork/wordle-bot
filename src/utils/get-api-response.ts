export default async function getApiResponse(words: string[] | [], clues: string[] | [], abortController: AbortController) {
  const response = await fetch(`https://interviewing.venteur.co/api/wordle`, {
    method: 'POST',
    signal: abortController.signal,
    body: JSON.stringify([...words.map((word, index) => ({ word, clue: clues[index] }))]),
  });
  if(!response.ok) throw new Error(await response.text());
  const data = await response.json();
  return data;
}