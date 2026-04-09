<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <slot name="footer" />
  </footer>
</template>