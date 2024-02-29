<script>
    import { fade, slide, scale} from 'svelte/transition'
    import { flip } from 'svelte/animate'

    import Polldetail from './polldetail.svelte';
    import PollStore from '../stores/PollStore'
   
    
</script>

<div class="poll-list">
    {#each $PollStore as poll (poll.id)} 
        <div class="" in:fade out:scale|local animate:flip={{duration: 500}}>
            <Polldetail {poll}/>
        </div>
        
    {/each}
</div>

<style>
    .poll-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>