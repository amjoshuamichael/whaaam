<!--suppress XmlInvalidId -->
<script>
    import {getNew, getLast} from './UUID'

    export let onClick
</script>

<div>
    <button on:click={onClick} id={getNew()} class="hidden"/>
    <label for={getLast()} class="w-full cursor-pointer">
        <slot></slot>
    </label>
</div>
