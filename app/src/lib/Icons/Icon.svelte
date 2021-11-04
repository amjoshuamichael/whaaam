<script>
    export let src

    import {icons} from './IconManager'

    console.log(icons, src)
</script>

{@html icons[src]}