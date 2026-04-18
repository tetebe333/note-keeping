<script lang="ts">
	import { page } from '$app/state';
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-24 sm:py-32 lg:px-8"
>
	<!-- Background Decorative Element -->
	<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
		<div
			class="absolute top-0 left-[50%] h-250 w-250 -translate-x-[50%] rounded-full bg-amber-50/50 blur-3xl"
		></div>
	</div>

	<div class="relative z-10 text-center">
		<!-- Error Code Badge -->
		<p class="mb-2 text-base font-bold tracking-wide text-amber-600 uppercase">
			Status: {page.status}
		</p>

		<h1 class="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
			{page.status === 404 ? 'Page not found' : 'Something went wrong'}
		</h1>

		<p class="mx-auto mt-6 max-w-lg text-lg leading-7 text-slate-600">
			{page.error?.message ||
				"Sorry, we couldn't find the page you're looking for or encountered an unexpected glitch."}
		</p>

		<div class="mt-10 flex items-center justify-center gap-x-6">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<av
				href="/"
				class="rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-200 transition-all hover:bg-amber-600  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 active:scale-95"
			>
				Go back home
			</av>

			<button
				onclick={() => window.location.reload()}
				class="flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-amber-600"
			>
				Try again <span aria-hidden="true">&rarr;</span>
			</button>
		</div>
	</div>

	<!-- Bottom Brand Footer -->
	<div class="mt-16 text-sm text-slate-400">
		<p>Note Keeping App📝</p>
	</div>
</main>
