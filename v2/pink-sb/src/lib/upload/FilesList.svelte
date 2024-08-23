<script lang="ts">
    import { humanFileSize } from '../../helpers/size.ts';

    export let files: {
        name: string;
        extension: string;
        size: number;
        error: string;
    }[] = [];
</script>

<ul>
    {#each files as file}
        {@const fileSize = humanFileSize(file.size)}
        <li>
            {file.name}
            {fileSize.value}
            {fileSize.unit} - {file.error}
        </li>
    {/each}
</ul>
