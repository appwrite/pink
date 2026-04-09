<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
</script>

<Stack inline alignItems="center" justifyContent="center" class="ai-icon-holder">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
            d="M11.0156 6.20801C11.3539 5.29392 12.6461 5.29392 12.9844 6.20801L14.5801 10.5186C14.7776 11.052 15.198 11.4724 15.7314 11.6699L20.042 13.2656C20.9561 13.6039 20.9561 14.8961 20.042 15.2344L15.7314 16.8301C15.198 17.0276 14.7776 17.448 14.5801 17.9814L12.9844 22.292C12.6461 23.2061 11.3539 23.2061 11.0156 22.292L9.41992 17.9814C9.2224 17.448 8.80197 17.0276 8.26855 16.8301L3.95801 15.2344C3.04392 14.8961 3.04392 13.6039 3.95801 13.2656L8.26855 11.6699C8.80196 11.4724 9.2224 11.052 9.41992 10.5186L11.0156 6.20801Z"
            fill="url(#paint0_linear_3662_39953)"
            stroke="#FD366E"
            stroke-width="0.9"
        />
        <path
            d="M22.3828 19.6611C22.552 19.2042 23.198 19.2042 23.3672 19.6611L23.8994 21.0977C24.0286 21.4466 24.3034 21.7214 24.6523 21.8506L26.0889 22.3828C26.5458 22.552 26.5458 23.198 26.0889 23.3672L24.6523 23.8994C24.3034 24.0286 24.0286 24.3034 23.8994 24.6523L23.3672 26.0889C23.198 26.5458 22.552 26.5458 22.3828 26.0889L21.8506 24.6523C21.7214 24.3034 21.4466 24.0286 21.0977 23.8994L19.6611 23.3672C19.2042 23.198 19.2042 22.552 19.6611 22.3828L21.0977 21.8506C21.4466 21.7214 21.7214 21.4466 21.8506 21.0977L22.3828 19.6611Z"
            fill="url(#paint1_linear_3662_39953)"
            stroke="#FD366E"
            stroke-width="0.75"
        />
        <path
            d="M22.3828 3.91113C22.552 3.45421 23.198 3.45421 23.3672 3.91113L23.8994 5.34766C24.0286 5.6966 24.3034 5.97145 24.6523 6.10059L26.0889 6.63281C26.5458 6.802 26.5458 7.448 26.0889 7.61719L24.6523 8.14941C24.3034 8.27855 24.0286 8.5534 23.8994 8.90234L23.3672 10.3389C23.198 10.7958 22.552 10.7958 22.3828 10.3389L21.8506 8.90234C21.7214 8.5534 21.4466 8.27855 21.0977 8.14941L19.6611 7.61719C19.2042 7.448 19.2042 6.802 19.6611 6.63281L21.0977 6.10059C21.4466 5.97145 21.7214 5.6966 21.8506 5.34766L22.3828 3.91113Z"
            fill="url(#paint2_linear_3662_39953)"
            stroke="#FD366E"
            stroke-width="0.75"
        />
        <defs>
            <linearGradient
                id="paint0_linear_3662_39953"
                x1="12"
                y1="2.25"
                x2="12"
                y2="26.25"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#FD366E" stop-opacity="0" />
                <stop offset="1" stop-color="#FD366E" stop-opacity="0.4" />
            </linearGradient>
            <linearGradient
                id="paint1_linear_3662_39953"
                x1="22.875"
                y1="17.25"
                x2="22.875"
                y2="28.5"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#FD366E" stop-opacity="0" />
                <stop offset="1" stop-color="#FD366E" stop-opacity="0.4" />
            </linearGradient>
            <linearGradient
                id="paint2_linear_3662_39953"
                x1="22.875"
                y1="1.5"
                x2="22.875"
                y2="12.75"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#FD366E" stop-opacity="0" />
                <stop offset="1" stop-color="#FD366E" stop-opacity="0.4" />
            </linearGradient>
        </defs>
    </svg>
</Stack>

<style lang="scss">
    :global(.ai-icon-holder) {
        border-radius: 8px;
        background: rgba(253, 54, 110, 0.04);
        border: 1.25px solid rgba(253, 54, 110, 0.12);

        padding: 5px 0;
        width: 40px !important;
        height: 40px !important;
    }
</style>
