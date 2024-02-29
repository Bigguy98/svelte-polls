import { writable } from "svelte/store";

const PollStore = writable([
    {
        id: 1,
        question: 'Python or JS',
        answerA: 'Python', 
        answerB: 'JS',
        voteA: 15,
        voteB: 7
    },
    {
        id: 2,
        question: 'Who\'s the best football player in the world?',
        answerA: 'Ronaldo', 
        answerB: 'Messi',
        voteA: 8,
        voteB: 3
    },
])

export default PollStore;
