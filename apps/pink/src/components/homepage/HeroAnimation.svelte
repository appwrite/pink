<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { fade } from "svelte/transition";
  import CodePreview from "../CodePreview.svelte";

  function transformTextByOne(text: string, newText: string) {
    for (let i = 0; i < newText.length; i++) {
      if (newText[i] !== text[i]) {
        return text.slice(0, i) + newText[i] + text.slice(i);
      }
    }
    return text;
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const steps = [
    `<td class="table-col" data-title="Name">
  <div class="u-inline-flex u-cross-center u-gap-12">
    <span class="avatar">RR</span>
    <!-- ... -->
    </div></td>
    <!-- ... -->
    <td class="table-col" data-title="Name">
      <div class="u-inline-flex u-cross-center u-gap-12">
        <div class="avatar">
          <img src="" alt="JW" />
          </div>
          <!-- ... -->
          </div>
          </td>`,
    `<td class="table-col" data-title="Name">
  <div class="u-inline-flex u-cross-center u-gap-12">
    <span class="avatar is-color-pink">RR</span>
    <!-- ... -->
    </div></td>
    <!-- ... -->
    <td class="table-col" data-title="Name">
      <div class="u-inline-flex u-cross-center u-gap-12">
        <div class="avatar">
          <img src="" alt="JW" />
          </div>
          <!-- ... -->
          </div>
          </td>`,
    `<td class="table-col" data-title="Name">
  <div class="u-inline-flex u-cross-center u-gap-12">
    <span class="avatar is-color-pink">RR</span>
    <!-- ... -->
    </div></td>
    <!-- ... -->
    <td class="table-col" data-title="Name">
      <div class="u-inline-flex u-cross-center u-gap-12">
        <div class="avatar">
          <img src="/jenny.jpg" alt="JW" />
          </div>
          <!-- ... -->
          </div>
          </td>`,
  ];

  let html = writable({
    index: 3,
    time: performance.now(),
    code: steps[2],
  });

  const next = async () => {
    const now = performance.now();
    if (now - $html.time < 50) {
      return window.requestAnimationFrame(next);
    }

    $html.code = transformTextByOne($html.code, steps[$html.index]);

    if ($html.code === steps[$html.index]) {
      $html.index++;
      await sleep(500);
    }

    $html.time = performance.now();

    if (steps[$html.index]) {
      window.requestAnimationFrame(next);
    }
  };

  onMount(() => {
    html.update((v) => {
      v.index = 0;
      v.code = steps[0];
      return v;
    });

    const timeout = window.setTimeout(() => {
      window.requestAnimationFrame(next);
    }, 5000);

    return () => {
      window.clearTimeout(timeout);
    };
  });
</script>

<div class="hero-animation">
  <div class="wrapper">
    <svg
      class="dashboard"
      width="665"
      height="398"
      viewBox="0 0 665 398"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2!88)">
        <g filter="url(#filter0_d_2_88)">
          <rect width="665" height="398" rx="10" fill="white" class="bg" />
          <rect
            x="0.5"
            y="0.5"
            width="664"
            height="397"
            rx="9.5"
            stroke="#F2F2F8"
            class="border-1"
          />
        </g>
        <path
          class="dark-rect"
          d="M664 125H122V36H656C660.418 36 664 39.5817 664 44V125Z"
          fill="transparent"
        />
        <path
          class="light-rect"
          d="M664 125H122V397H656C660.418 397 664 393.418 664 389V125Z"
          fill="#FCFCFF"
        />
        <rect
          x="17"
          y="61"
          width="89"
          height="8"
          rx="4"
          fill="url(#paint0_linear_2_88)"
        />
        <rect
          x="569"
          y="13"
          width="80"
          height="10"
          rx="5"
          fill="url(#paint1_linear_2_88)"
        />
        <rect
          x="17"
          y="93"
          width="89"
          height="8"
          rx="4"
          fill="url(#paint2_linear_2_88)"
        />
        <rect
          x="17"
          y="125"
          width="89"
          height="8"
          rx="4"
          fill="url(#paint3_linear_2_88)"
        />
        <rect
          x="17"
          y="157"
          width="89"
          height="8"
          rx="4"
          fill="url(#paint4_linear_2_88)"
        />
        <rect
          x="17"
          y="189"
          width="89"
          height="8"
          rx="4"
          fill="url(#paint5_linear_2_88)"
        />
        <path
          class="border-2"
          d="M664 35.5H664.5V35V9C664.5 4.30558 660.694 0.5 656 0.5H9C4.30558 0.5 0.5 4.30558 0.5 9V35V35.5H1H664Z"
          stroke="#F2F2F8"
        />
        <rect
          x="174.5"
          y="101.5"
          width="210"
          height="103"
          rx="7.5"
          fill="url(#paint6_linear_2_88)"
          stroke="url(#paint7_linear_2_88)"
        />
        <!-- Bar Chart Start -->
        <rect
          x="202"
          y="116"
          width="6"
          height="75"
          rx="3"
          fill="url(#paint8_linear_2_88)"
        />
        <rect
          x="202.25"
          y="116.25"
          width="5.5"
          height="74.5"
          rx="2.75"
          stroke="url(#paint9_linear_2_88)"
          stroke-opacity="0.4"
          stroke-width="0.5"
        />
        <rect
          x="227"
          y="136"
          width="6"
          height="55"
          rx="3"
          fill="url(#paint10_linear_2_88)"
        />
        <rect
          x="227.25"
          y="136.25"
          width="5.5"
          height="54.5"
          rx="2.75"
          stroke="url(#paint11_linear_2_88)"
          stroke-opacity="0.4"
          stroke-width="0.5"
        />
        <rect
          x="252"
          y="123"
          width="6"
          height="68"
          rx="3"
          fill="url(#paint12_linear_2_88)"
        />
        <rect
          x="252.25"
          y="123.25"
          width="5.5"
          height="67.5"
          rx="2.75"
          stroke="url(#paint13_linear_2_88)"
          stroke-opacity="0.4"
          stroke-width="0.5"
        />
        <rect
          x="277"
          y="163"
          width="6"
          height="28"
          rx="3"
          fill="url(#paint14_linear_2_88)"
        />
        <rect
          x="277.25"
          y="163.25"
          width="5.5"
          height="27.5"
          rx="2.75"
          stroke="url(#paint15_linear_2_88)"
          stroke-opacity="0.4"
          stroke-width="0.5"
        />
        <rect
          x="302"
          y="143"
          width="6"
          height="48"
          rx="3"
          fill="url(#paint16_linear_2_88)"
        />
        <rect
          x="302.25"
          y="143.25"
          width="5.5"
          height="47.5"
          rx="2.75"
          stroke="url(#paint17_linear_2_88)"
          stroke-opacity="0.4"
          stroke-width="0.5"
        />
        <rect
          x="327"
          y="131"
          width="6"
          height="60"
          rx="3"
          fill="url(#paint18_linear_2_88)"
        />
        <rect
          x="327.25"
          y="131.25"
          width="5.5"
          height="59.5"
          rx="2.75"
          stroke="url(#paint19_linear_2_88)"
          stroke-opacity="0.4"
          stroke-width="0.5"
        />
        <rect
          x="352"
          y="163"
          width="6"
          height="28"
          rx="3"
          fill="url(#paint20_linear_2_88)"
        />
        <rect
          x="352.25"
          y="163.25"
          width="5.5"
          height="27.5"
          rx="2.75"
          stroke="url(#paint21_linear_2_88)"
          stroke-opacity="0.4"
          stroke-width="0.5"
        />
        <!-- Bar Chart End -->
        <rect
          x="401.5"
          y="101.5"
          width="210"
          height="103"
          rx="7.5"
          fill="url(#paint22_linear_2_88)"
          stroke="url(#paint23_linear_2_88)"
        />
        <path
          d="M582.725 168.755C581.401 170.431 550.591 173.662 541.596 164.962C540.027 163.444 536.634 158.382 532.029 157.077C526.272 155.446 524.245 158.029 520.678 157.077C517.11 156.126 505.435 149.601 500.976 143.619C496.516 137.638 493.76 141.444 492.3 142.532C490.841 143.619 483.706 152.591 478.922 135.327C475.095 121.515 468.277 126.626 465.139 130.433C462.079 133.445 439.646 176.074 431.884 179.508H430.275C430.697 179.808 431.24 179.793 431.884 179.508H582.725V168.755Z"
          fill="url(#paint24_linear_2_88)"
          fill-opacity="0.79"
        />

        <g filter="url(#filter1_d_2_88)">
          <path
            d="M582.725 168.755C581.401 170.431 550.591 173.662 541.596 164.962C540.027 163.444 536.634 158.382 532.029 157.077C526.272 155.446 524.245 158.029 520.678 157.077C517.11 156.126 505.435 149.601 500.976 143.619C496.516 137.638 493.76 141.444 492.3 142.532C490.841 143.619 483.706 152.591 478.922 135.327C475.095 121.515 468.277 126.626 465.139 130.433C461.825 133.695 435.788 183.423 430.275 179.508"
            class="line-chart__stroke"
            stroke="#E8E9F0"
            stroke-opacity="0.41"
          />
        </g>
        <rect
          x="174.5"
          y="237.5"
          width="437"
          height="115"
          rx="7.5"
          fill="url(#paint25_linear_2_88)"
          stroke="url(#paint26_linear_2_88)"
        />
        <rect
          x="190"
          y="253"
          width="89"
          height="8"
          rx="4"
          fill="url(#paint27_linear_2_88)"
        />
        <rect
          x="222"
          y="277"
          width="352"
          height="4"
          rx="2"
          fill="url(#paint28_linear_2_88)"
        />
        <rect
          x="222"
          y="313"
          width="352"
          height="4"
          rx="2"
          fill="url(#paint29_linear_2_88)"
        />
        <rect
          x="222"
          y="289"
          width="213"
          height="4"
          rx="2"
          fill="url(#paint30_linear_2_88)"
        />
        <rect
          x="222"
          y="325"
          width="213"
          height="4"
          rx="2"
          fill="url(#paint31_linear_2_88)"
        />
        <circle cx="200" cy="285" r="10" fill="url(#paint32_linear_2_88)" />
        <circle cx="200" cy="321" r="10" fill="url(#paint33_linear_2_88)" />
      </g>
      <defs>
        <filter
          id="filter0_d_2_88"
          x="-32"
          y="-16"
          width="729"
          height="462"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="16" />
          <feGaussianBlur stdDeviation="16" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.215686 0 0 0 0 0.231373 0 0 0 0 0.301961 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2_88"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_88"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_2_88"
          x="425.985"
          y="121.773"
          width="161.132"
          height="62.4543"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.909804 0 0 0 0 0.913725 0 0 0 0 0.941176 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2_88"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_88"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2_88"
          x1="13.5437"
          y1="65"
          x2="108.592"
          y2="65"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.6" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2_88"
          x1="565.893"
          y1="18"
          x2="651.33"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.6" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2_88"
          x1="13.5437"
          y1="97"
          x2="108.592"
          y2="97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.6" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_2_88"
          x1="13.5437"
          y1="129"
          x2="108.592"
          y2="129"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.6" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_2_88"
          x1="13.5437"
          y1="161"
          x2="108.592"
          y2="161"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.6" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_2_88"
          x1="13.5437"
          y1="193"
          x2="108.592"
          y2="193"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.6" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_2_88"
          x1="279.5"
          y1="101"
          x2="280"
          y2="217"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_2_88"
          x1="280"
          y1="235"
          x2="280"
          y2="36.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F2F2F8" />
          <stop offset="1" stop-color="#F2F2F8" stop-opacity="0" />
        </linearGradient>
        <!-- Bar Chart Linear Start -->
        <linearGradient
          id="paint8_linear_2_88"
          x1="205"
          y1="116"
          x2="205"
          y2="191"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.42" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_2_88"
          x1="205"
          y1="116"
          x2="205"
          y2="175.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_2_88"
          x1="230"
          y1="136"
          x2="230"
          y2="191"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.42" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_2_88"
          x1="230"
          y1="136"
          x2="230"
          y2="191"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" />
          <stop offset="0.808466" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_2_88"
          x1="255"
          y1="123"
          x2="255"
          y2="191"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.42" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_2_88"
          x1="255"
          y1="123"
          x2="255"
          y2="177.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_2_88"
          x1="280"
          y1="163"
          x2="280"
          y2="191"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.42" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_2_88"
          x1="280"
          y1="163"
          x2="280"
          y2="181.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_2_88"
          x1="305"
          y1="143"
          x2="305"
          y2="191"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.42" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint17_linear_2_88"
          x1="305"
          y1="143"
          x2="305"
          y2="191"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" />
          <stop offset="0.756224" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint18_linear_2_88"
          x1="330"
          y1="131"
          x2="330"
          y2="191"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.42" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint19_linear_2_88"
          x1="330"
          y1="131"
          x2="330"
          y2="191"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" />
          <stop offset="0.774418" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint20_linear_2_88"
          x1="355"
          y1="163"
          x2="355"
          y2="191"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.42" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <!-- Bar Chart Linear Stop -->

        <linearGradient
          id="paint21_linear_2_88"
          x1="355"
          y1="163"
          x2="355"
          y2="179.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint22_linear_2_88"
          x1="506.5"
          y1="101"
          x2="507"
          y2="217"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint23_linear_2_88"
          x1="507"
          y1="235"
          x2="507"
          y2="36.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F2F2F8" />
          <stop offset="1" stop-color="#F2F2F8" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint24_linear_2_88"
          x1="482.991"
          y1="61.2795"
          x2="485.819"
          y2="198.661"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.220685" stop-color="#E8E9F0" />
          <stop offset="0.714158" stop-color="#E8E9F0" stop-opacity="0.19" />
          <stop offset="0.840181" stop-color="#E8E9F0" stop-opacity="0.04" />
          <stop offset="0.88716" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint24_linear_2_88_pink"
          x1="482.991"
          y1="61.2795"
          x2="485.819"
          y2="198.661"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.220685" stop-color="#F02E65" />
          <stop offset="0.714158" stop-color="#F02E65" stop-opacity="0.19" />
          <stop offset="0.840181" stop-color="#F02E65" stop-opacity="0.04" />
          <stop offset="0.88716" stop-color="#F02E65" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint25_linear_2_88"
          x1="207"
          y1="387.8"
          x2="210.755"
          y2="197.303"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint26_linear_2_88"
          x1="147"
          y1="341.4"
          x2="692.943"
          y2="388.464"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F2F2F8" />
          <stop offset="1" stop-color="#F2F2F8" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint27_linear_2_88"
          x1="167.5"
          y1="253"
          x2="293.956"
          y2="277.262"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.75" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint28_linear_2_88"
          x1="-113.556"
          y1="256.5"
          x2="112.022"
          y2="615.901"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.8" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint29_linear_2_88"
          x1="-113.556"
          y1="292.5"
          x2="112.022"
          y2="651.901"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.8" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint30_linear_2_88"
          x1="18.9508"
          y1="268.5"
          x2="269.276"
          y2="509.838"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.8" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint31_linear_2_88"
          x1="18.9508"
          y1="304.5"
          x2="269.276"
          y2="545.838"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.8" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint32_linear_2_88"
          x1="200"
          y1="275"
          x2="200"
          y2="295"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.4" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint33_linear_2_88"
          x1="200"
          y1="311"
          x2="200"
          y2="331"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E8E9F0" stop-opacity="0.4" />
          <stop offset="1" stop-color="#E8E9F0" stop-opacity="0" />
        </linearGradient>
        <clipPath id="clip0_2_88">
          <rect width="665" height="398" fill="white" />
        </clipPath>
      </defs>
    </svg>

    <div class="header">
      <p class="heading-level-7">Header</p>
      <button class="button">Button</button>
    </div>

    <div class="pen-wrapper">
      <img class="pen" src="/images/pen.svg" alt="Pen tool" />
      <div class="line">
        <div class="dot" />
        <div class="dot" />
        <div class="dot" />
      </div>
    </div>

    <div class="color-card">
      <div class="thumb" />
      <span class="code">#F02E65</span>
      <span class="opacity">100%</span>
    </div>

    <div class="avatar avatar-1 is-color-pink">RR</div>
    <div class="avatar avatar-2">
      <img src="/images/jenny.jpg" alt="JW" />
    </div>

    <div class="editor">
      <div class="buttons">
        <span />
        <span />
        <span />
      </div>
      <div class="preview">
        {#key $html.code}
          <CodePreview code={$html.code} language="html" lineNumbers />
        {/key}
      </div>
    </div>

    <div class="git-commit">
      <code>$ git commit</code>
    </div>

    <div class="table-wrapper">
      <table class="table is-selected-columns-mobile">
        <thead class="table-thead">
          <tr class="table-row">
            <th class="table-thead-col">
              <span class="eyebrow-heading-3">Name</span>
            </th>
          </tr>
        </thead>
        <tbody class="table-tbody">
          <tr class="table-row">
            <td class="table-col" data-title="Name">
              <div class="u-inline-flex u-cross-center u-gap-12">
                <div class="avatar" class:is-color-pink={$html.index > 1}>
                  RR
                </div>
                <div>
                  <span class="text u-bold">Ronald Richards</span>
                  <span class="text">ronald@appwrite.io</span>
                </div>
              </div>
            </td>
          </tr>
          <tr class="table-row">
            <td class="table-col" data-title="Name">
              <div class="u-inline-flex u-cross-center u-gap-12">
                <div class="avatar">
                  {#if $html.index > 2}
                    <img
                      in:fade={{ duration: 500, delay: 100 }}
                      src="/images/jenny.jpg"
                      alt="JW"
                    />
                  {:else}
                    JW
                  {/if}
                </div>
                <div>
                  <span class="text u-bold">Jenny Wilson</span>
                  <span class="text">jenny@appwrite.io</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<style lang="scss">
  @media (prefers-reduced-motion) {
    .hero-animation * {
      animation-delay: 0s !important;
      animation-duration: 0s !important;
    }
  }

  @media (max-width: 768px) {
    .hero-animation * {
      animation-delay: 0s !important;
      animation-duration: 0s !important;
    }

    .dashboard {
      max-width: 100%;
      height: 300px;
    }

    .header,
    .avatar-1,
    .avatar-2 {
      display: none !important;
    }
  }

  :global(pre) {
    margin: 0;
  }

  .hero-animation {
    display: grid;
    place-items: center;
    text-align: initial;

    margin-top: 4rem;
    direction: ltr;

    --pink-color: #f02e65;
  }

  .wrapper {
    position: relative;
  }

  /* Animation utilities */
  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes scale-in {
    from {
      opacity: 0;
      scale: 0;
    }

    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes scale-out {
    to {
      opacity: 0;
      scale: 0;
    }
  }

  .header {
    position: absolute;
    top: 12.5%;
    left: 26.5%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 67%;

    p {
      opacity: 0;
      animation: fade-in 450ms ease-in-out 3500ms forwards;
    }

    .button {
      opacity: 0;
      scale: 0.75;
      animation: fade-in 450ms ease-in-out 4250ms forwards;
    }
  }

  .pen-wrapper {
    position: absolute;
    top: 45%;
    left: 60%;
    rotate: -135deg;

    @keyframes pen-1 {
      from {
        scale: 2;
        opacity: 0;
      }

      to {
        scale: 1.5;
        opacity: 1;
      }
    }

    .pen {
      scale: 1.5;
      opacity: 0;
      rotate: 180deg;

      animation: pen-1 450ms ease-in-out 500ms forwards,
        scale-out 800ms ease-out 2000ms forwards;
    }

    @keyframes line-1 {
      0% {
        opacity: 0;
        width: 0;
      }

      to {
        opacity: 1;
        width: 50px;
      }
    }

    .line {
      position: absolute;
      bottom: 0;
      left: 50%;
      translate: -50%;

      background: rgba(0, 0, 0, 0.25);

      width: 0px;
      height: 1px;
      opacity: 0;

      animation: line-1 400ms ease 1000ms forwards,
        scale-out 800ms ease-out 2000ms forwards;

      :global(.theme-dark) & {
        filter: invert(1);
      }

      .dot {
        position: absolute;
        border-radius: 999px;

        top: -1.5px;
        width: 4px;
        height: 4px;

        &:nth-child(1) {
          border: 1px solid rgba(0, 0, 0, 0.25);
          left: -4px;
        }

        &:nth-child(2) {
          background: rgba(0, 0, 0, 1);
          left: calc(50% - 2px);
        }

        &:nth-child(3) {
          border: 1px solid rgba(0, 0, 0, 0.25);
          right: -4px;
        }
      }
    }
  }

  .color-card {
    display: flex;
    align-items: center;

    position: absolute;
    top: 22%;
    left: 75%;

    background: #fff;
    box-shadow: var(--shadow-large);
    color: rgb(55, 59, 78);
    border: 1px solid #f2f2f8;
    border-radius: 6px;
    padding-inline: 4px;
    opacity: 0;

    animation: scale-in 800ms ease 1100ms forwards,
      scale-out 800ms ease 3000ms forwards;

    .thumb {
      background-color: var(--pink-color);
      width: 16px;
      height: 16px;
      border-radius: 3px;
    }

    .code {
      margin-left: 6px;
    }

    .opacity {
      position: relative;
      margin-left: 12px;

      &::before {
        display: block;
        position: absolute;
        left: -6px;
        top: 0;

        background: #f2f2f8;
        content: " ";

        width: 1px;
        height: 100%;

        :global(.theme-dark) & {
          background: hsla(229, 17%, 26%, 1);
        }
      }
    }

    :global(.theme-dark) & {
      background: hsl(240, 19%, 13%);

      border-color: hsla(229, 17%, 26%, 1);
      color: white;
    }
  }

  .dashboard {
    @keyframes line-color {
      to {
        stop-color: var(--pink-color);
        stroke: var(--pink-color);
        stroke-opacity: 0.7;
      }
    }

    .line-chart__stroke {
      animation: line-color 800ms ease 2150ms forwards;
    }

    #paint24_linear_2_88 stop {
      animation: line-color 800ms ease 2150ms forwards;
    }

    @for $i from 8 through 21 {
      #paint#{$i}_linear_2_88 stop {
        animation: line-color 800ms ease 2150ms forwards;
      }
    }

    :global(.theme-dark) & {
      .bg {
        fill: hsl(240, 21%, 11%) !important;
      }

      .border-1,
      .border-2 {
        stroke: hsla(229, 17%, 26%, 1);
      }

      .dark-rect {
        fill: #1b1b28;
      }

      .light-rect {
        fill: transparent;
      }

      #paint24_linear_2_88 stop {
        stop-color: hsl(234, 19, 30);
      }

      .line-chart__stroke {
        stroke: hsl(234, 19%, 50%);
      }

      @for $i from 8 through 21 {
        #paint#{$i}_linear_2_88 stop {
          stop-color: hsl(234, 19, 30);
        }
      }

      @for $i from 0 through 5 {
        #paint#{$i}_linear_2_88 stop {
          stop-color: hsl(234, 19%, 30%);
        }
      }

      @for $i from 27 through 33 {
        #paint#{$i}_linear_2_88 stop {
          stop-color: hsl(234, 19%, 30%);
        }
      }

      #paint6_linear_2_88 stop,
      #paint22_linear_2_88 stop,
      #paint25_linear_2_88 stop {
        stop-color: #1b1b28;
      }

      #paint7_linear_2_88 stop,
      #paint23_linear_2_88 stop,
      #paint26_linear_2_88 stop {
        stop-color: #373b4d;
      }
    }
  }

  .editor {
    @keyframes editor-in {
      from {
        opacity: 0;
        scale: 0.45;
      }

      to {
        opacity: 1;
        scale: 1;
      }
    }

    position: absolute;
    top: 20%;
    left: -20%;

    background-color: white;
    border: 1px solid #e9eaf1;
    border-radius: 8px;
    box-shadow: var(--shadow-large);

    padding: 12px 8px;
    opacity: 0;

    animation: editor-in 1500ms ease 4250ms forwards,
      editor-in 750ms ease 9750ms forwards reverse;

    .buttons {
      display: flex;
      gap: 8px;

      span {
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 999px;

        &:nth-child(1) {
          background-color: hsl(0, 100%, 82%);
        }

        &:nth-child(2) {
          background-color: hsl(32, 97%, 76%);
        }

        &:nth-child(3) {
          background-color: hsl(172, 50%, 72%);
        }

        :global(.theme-dark) & {
          &:nth-child(1) {
            background-color: hsl(0, 100%, 70%);
          }

          &:nth-child(2) {
            background-color: hsl(32, 97%, 56%);
          }

          &:nth-child(3) {
            background-color: hsl(172, 50%, 52%);
          }
        }
      }
    }

    .preview {
      margin-top: 0.5rem;
      padding: 16px;
    }

    :global(.theme-dark) & {
      background: hsl(240, 19%, 13%);

      border-color: hsla(229, 17%, 26%, 1);
      color: white;
    }
  }

  .git-commit {
    @keyframes commit-in {
      from {
        scale: 2;
        opacity: 0;
      }
      to {
        scale: 1;
        opacity: 1;
      }
    }

    position: absolute;
    top: 19%;
    left: 32%;

    background-color: white;
    border: 1px solid #e9eaf1;
    border-radius: 4px;
    box-shadow: var(--shadow-large);
    padding: 0 4px;

    opacity: 0;

    animation: commit-in 1000ms ease 8000ms forwards,
      scale-out 1000ms ease 9500ms forwards;

    :global(.theme-dark) & {
      background: hsl(240, 19%, 13%);

      border-color: hsla(229, 17%, 26%, 1);
      color: white;
    }
  }

  .table-wrapper {
    @keyframes table-in {
      from {
        opacity: 0;
        scale: 0.5;
        translate: -300px;
      }

      to {
        opacity: 1;
        scale: 1;
        translate: 0 0;
      }
    }

    position: absolute;
    top: 40%;
    left: 70%;

    box-shadow: var(--shadow-large);
    width: 250px;

    opacity: 0;

    animation: table-in 1500ms ease 4750ms forwards,
      table-in 750ms ease 10250ms forwards reverse;

    .avatar {
      transition: 500ms ease;
    }

    img {
      object-fit: cover;
    }
  }

  .avatar-1 {
    position: absolute;
    left: 26.9%;
    top: 65.5%;
    scale: 0.5;
    opacity: 0;
    animation: fade-in 500ms ease 9500ms forwards;
  }

  .avatar-2 {
    position: absolute;
    left: 26.9%;
    top: 74%;
    scale: 0.5;
    opacity: 0;
    animation: fade-in 500ms ease 9500ms forwards;
  }
</style>
