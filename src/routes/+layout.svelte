<script>
    import '../theme/colors.css'
    import '../theme/general.css'
</script>

<main>
    <slot />
</main>

<style lang="scss">
    main {
        display: grid;
        place-items: center;
        background: #222;
        min-height: 100vh;
    }
</style>