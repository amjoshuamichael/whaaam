<!--suppress XmlInvalidId -->
<script>
    import {getNew, getLast} from '../Utilities/UUID'
    import Icon from '../Icons/Icon.svelte'

    export let onClick, icon
</script>

<button on:click={onClick} id={getNew()} class="hidden"/>
<label for={getLast()} class="full cursor-pointer">
    <Icon src={icon} />
</label>
