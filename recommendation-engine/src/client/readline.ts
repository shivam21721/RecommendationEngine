import readline from 'readline';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



export function asyncUserInput(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    })
}