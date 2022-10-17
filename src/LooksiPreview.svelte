<script>
  import { onMount } from 'svelte';
  import { Looksi } from '../lib/index';

  let anchor;
  let canvas;

  onMount(() => {
    console.log(anchor);
    const looksi = new Looksi(anchor, window);
    looksi.run();
  })
</script>

<div id="anchor" bind:this={anchor}>
</div>

<style>
  #anchor {
    width: 100%;
    height: 100%;
  }
</style>

