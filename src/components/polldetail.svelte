<script>
    import Card from '../share/card.svelte'
    import Button from '../share/button.svelte';
    import PollStore from '../stores/PollStore';
    import { tweened }	from 'svelte/motion';

    export let poll;

    // reactive value
    $: totalVotes = poll.voteA + poll.voteB;
    $: percentA = Math.floor(poll.voteA*100/totalVotes) || 0;
    $: percentB = Math.floor(poll.voteB*100/totalVotes) || 0;

    // tweend percentages
    const tweendPercentA = tweened(0);
    const tweendPercentB = tweened(0);
    $: tweendPercentA.set(percentA); // reactive function
    $: tweendPercentB.set(percentB);

    const vote = (option, id) => {
        PollStore.update(currentPolls => {
            let copiedPolls = [...currentPolls];
            let upvotePoll = copiedPolls.find(poll => poll.id == id)
            if (option === 'a' ) {
                upvotePoll.voteA++;
            } else {
                upvotePoll.voteB++;
            }
            return copiedPolls;
        })
    }


    const deletePoll = (pollId) => {
        PollStore.update(currentPolls => {
            return currentPolls.filter(poll => poll.id != pollId);
        })
    }
</script>

<Card>
    <div class="poll">
        <h3>{poll.question}</h3>
        <p>Total votes: {totalVotes}</p>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click={ () => vote('a', poll.id)}>
            <div style="width: {$tweendPercentA}%" class="percent percent-a"></div>
            <span>{poll.answerA} ({poll.voteA})</span>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click={ () => vote('b', poll.id)}>
            <div style="width: {$tweendPercentB}%" class="percent percent-b"></div>
            <span>{poll.answerB} ({poll.voteB})</span>
        </div>

        <div class="delete">
            <Button on:click={() => { deletePoll(poll.id)}} flat={true}>Delete</Button>
        </div>
       
    </div>
</Card>


<style>

    h3{
        margin: 0 auto;
        color: #555;
    }
    p{
        margin-top: 6px;
        font-size: 14px;
        color: #aaa;
        margin-bottom: 30px;
    }
    .answer{
        background: #fafafa;
        cursor: pointer;
        margin: 10px auto;
        position: relative;
    }
    .answer:hover{
        opacity: 0.6;
    }
    span{
        display: inline-block;
        padding: 10px 20px;
    }

    .percent {
        height: 100%;
        position: absolute;
        box-sizing: border-box;
    }

    .percent-a {
        border-left: 4px solid #d91b42;
        background: rgba(217,27,66,0.2);
    }
    .percent-b {
        border-left: 4px solid  #45c496;
        background: rgba(69,196,150,0.2);
    }
    .delete {
        margin-top: 30px;
        text-align: center;
    }
</style>