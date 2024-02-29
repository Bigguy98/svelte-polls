<script>
	import Header from './components/header.svelte'
	import Footer from './components/footer.svelte'
	import Tabs from './share/tabs.svelte'
	import CreatePollForm from './components/create-poll-form.svelte'
    import Polllist from './components/polllist.svelte';
	import { tweened }	from 'svelte/motion';

	const value = tweened(0);

	// tabs
	let items = ['Current polls', 'Add new poll'];
	let activeItem = 'Current polls';

	const changeTab = (event) => {
		activeItem = event.detail
	}

	const addPoll = (event) => {
		activeItem = 'Current polls';
	}
</script>

<button on:click={() => value.set(1)}>{$value}</button>

<Header/>

<main>
	<Tabs on:tabChange={changeTab} {activeItem} {items}/>
	{#if activeItem === "Current polls"}
		<Polllist></Polllist>
	{:else if activeItem === "Add new poll"}
		<CreatePollForm on:addPoll={addPoll} />
	{/if}
</main>

<Footer/>


<style>
	main {
		max-width: 960px;
		margin: 40px auto;
	}

</style>