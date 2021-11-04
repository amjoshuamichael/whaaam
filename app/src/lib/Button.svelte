<!--suppress XmlInvalidId -->
<script>
    import {getNew, getLast} from './UUID'
    import Icon from './Icons/Icon.svelte'

    export let onClick, icon
</script>

<div class="flex-grow relative">
    <button on:click={onClick} id={getNew()} class="hidden"/>
    <label for={getLast()} class="full cursor-pointer">
        <Icon src={icon} />
    </label>
</div>
