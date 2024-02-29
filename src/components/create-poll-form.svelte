<script>
    import Button from '../share/button.svelte'
    import { createEventDispatcher } from 'svelte';
    import PollStore from '../stores/PollStore';

    const dispatch = createEventDispatcher();

    let fields = {
        question: '',
        answerA: '',
        answerB: ''
    }
    let errors = { question: '', answerA: '', answerB: '' };
    let valid = false;

    const createPoll = () => {
        valid = true;
        if (fields.question.trim().length < 5) {
            errors.question = 'Question must be at least 5 characters long';
            valid = false
        } else {
            errors.question = '';
        }

        if (fields.answerA.trim().length == 0) {
            errors.answerA = 'Answer must not be empty';
            valid = false
        } else {
            errors.answerA = '';
        }

        if (fields.answerB.trim().length == 0) {
            errors.answerB = 'Answer must not be empty';
            valid = false
        } else {
            errors.answerB = '';
        }

        if(valid) {
            let poll = {... fields, voteA: 0, voteB: 0 , id: Math.random()}
            PollStore.update(currentPolls => {
                return [...currentPolls, poll];
            })
            dispatch('addPoll')
        }
    }
</script>

<form on:submit|preventDefault={createPoll}>
    <div class="form-field">
        <label for="question" class="">Poll Question</label>
        <input type="text" id="question" class="" bind:value={fields.question}>
        <div class="error">{errors.question}</div>
    </div>
    <div class="form-field">
        <label for="answer-a" class="">Answer A:</label>
        <input type="text" id="answer-a" class="" bind:value={fields.answerA}>
        <div class="error">{errors.answerA}</div>
    </div>
    <div class="form-field">
        <label for="answer-b" class="">Answer B:</label>
        <input type="text" id="answer-b" class="" bind:value={fields.answerB}>
        <div class="error">{errors.answerB}</div>
    </div>


    <Button type="secondary" inverse={false} >Add Poll</Button>
</form>

<style>
    form {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }
    .form-field {
        margin: 18px auto;
    }
    input  {
        width: 100%;
        border-radius: 6px;
    }
    label {
        margin: 10px auto;
        text-align: left;
    }

    .error {
        font-weight: bold;
        font-size: 12x;
        color: #d91b42;
    }
</style>