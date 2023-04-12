<script lang="ts">
  import { toast } from '@zerodevx/svelte-toast';
  import { createShortURL } from '$utils/methods/server';

  let input = '';
  let isLoading = false;
  const successTheme = {
    theme: {
      '--toastBackground': '#48BB78',
      '--toastBarBackground': '#2F855A',
    },
  };

  const errorTheme = {
    theme: {
      '--toastBackground': '#E0675A',
      '--toastBarBackground': '#A34439',
    },
  };

  const handleCreate = async () => {
    try {
      toast.push('Started!', successTheme);
      isLoading = true;

      const response = await createShortURL(input);

      if (response.error) {
        isLoading = false;
        toast.push(response.error, errorTheme);
        return;
      }

      input = response.result;

      isLoading = false;

      navigator.clipboard.writeText(input);
      toast.push('Done! & Copied to clipboard!', successTheme);
    } catch (error) {
      isLoading = false;
      console.error(error);
    }
  };
</script>

<div class="relative overflow-hidden">
  <main>
    <div class="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8">
          <div
            class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center"
          >
            <div class="lg:py-24">
              <span
                class="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
              >
                <a href="https://github.com/Devang47/tiny.saklani.dev">
                  <span
                    class="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-indigo-500 rounded-full"
                  >
                    github
                  </span>
                </a>
                <a href="mailto:devangsaklani@gmail.com">
                  <span class="ml-4 text-sm"> devangsaklani@gmail.com </span></a
                >
                <!-- Heroicon name: solid/chevron-right -->
                <svg
                  class="ml-2 w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <h1
                class="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl"
              >
                <span class="block">Custom</span>
                <span class="block text-indigo-400">URL Shortener</span>
              </h1>
              <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                This is a custom url shortener which is used to minify URL.
              </p>
              <div class="mt-10 sm:mt-12">
                <div class="sm:max-w-xl sm:mx-auto lg:mx-0">
                  <div class="sm:flex">
                    <div class="min-w-0 flex-1">
                      <label for="url" class="sr-only">Enter URL:</label>
                      <input
                        disabled={isLoading}
                        id="url"
                        bind:value={input}
                        type="url"
                        placeholder="Enter your url"
                        class="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                      />
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-3">
                      <button
                        on:click={handleCreate}
                        disabled={isLoading}
                        type="submit"
                        class="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900 disabled:bg-gray-600"
                        >Shorten</button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
            <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
              <img
                class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
