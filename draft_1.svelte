<script>
  let heroes = ['Tracer', 'Reinhardt', 'Mercy', 'Ana', 'Genji', 'Winston'];
  let grid = Array(5).fill(null);
  let dragged = null;

  function handleTouchStart(hero) {
    dragged = hero;
  }

  function handleDrop(index) {
    if (dragged !== null) {
      grid[index] = dragged;
      dragged = null;
    }
  }
</script>

<h2>Hero Pool</h2>
<div class="pool">
  {#each heroes as hero}
    <div
      class="hero"
      on:touchstart={() => handleTouchStart(hero)}
      on:click={() => handleTouchStart(hero)}
    >
      {hero}
    </div>
  {/each}
</div>

<h2>Team Grid</h2>
<div class="labels">
  <div class="label">Tank</div>
  <div class="label">FDPS</div>
  <div class="label">HS</div>
  <div class="label">FS</div>
  <div class="label">MS</div>
</div>

<div class="grid">
  {#each grid as slot, i}
    <div
      class="slot"
      on:touchend={() => handleDrop(i)}
      on:click={() => handleDrop(i)}
    >
      {slot || ''}
    </div>
  {/each}
</div>

<style>
  body {
    font-family: sans-serif;
  }

  .pool {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }

  .hero {
    width: 90px;
    height: 40px;
    border: 1px solid #aaa;
    border-radius: 6px;
    background: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #000;
    user-select: none;
    touch-action: manipulation;
  }

  .labels {
    display: grid;
    grid-template-columns: repeat(5, 100px);
    gap: 10px;
    justify-content: center;
    margin-bottom: 5px;
    font-size: 14px;
    text-align: center;
  }

  .label {
    width: 100px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 100px);
    gap: 10px;
    justify-content: center;
    margin-top: 5px;
  }

  .slot {
    width: 100px;
    height: 80px;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f9f9;
    border-radius: 8px;
    font-weight: bold;
    font-size: 16px;
    color: #000;
    user-select: none;
  }

  h2 {
    text-align: center;
    margin-top: 20px;
  }
</style>
