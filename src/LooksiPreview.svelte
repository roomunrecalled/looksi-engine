<script>
  import { onMount } from 'svelte';
  import { Looksi } from '../lib/index';

  let canvas;

  onMount(() => {
    console.log(canvas);
    const looksi = new Looksi(canvas);
    looksi.run();
  })
</script>

<h1>Test</h1>

<canvas bind:this={canvas}></canvas>
