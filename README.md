## What is whaaam?

I love programs like [sfxr](https://www.drpetter.se/project_sfxr.html) and [LabChirp](http://labbed.net/software/labchirp/). They are super fun to use, and really helpful when trying to create sound effects fast (and sometimes even for making sound effects slowly!). There are a few problems with these though:

1. Neither of them are available for MacOS, Linux, iOS, or Android. Because they are passion projects made as standalone executables, the people behind them do not have the resources to make these tools cross platform. This makes them inaccessible to people on these platforms, and, frankly, even if you are on Windows, downloading a foreign executable is terrifying!
2. They can be unintuitive and difficult to use. They both force you to use “Delay” parameters when playing one sound after another, instead of laying them out on a timeline, like other music or video editing softwares. They basically list a bunch of sliders across the screen, and expect the user to know what each of them do. As someone who commonly works with audio software, I know the meaning of terms like “Frequency Modulation” and “Reverb” mean. But for someone who is coming straight from game development, the main audience for a tool like this, these terms can be intimidating or confusing.
3. They rely solely on manipulating digital synthesized sounds rather than taking advantage of the nuances of real-world recorded sounds, as many professional sound designers do.

Whaaam is designed to take care of all of these issues. First of all, it’s a web app, making it cross platform by nature. It has a minimal  interface but powerful features designed to bring popular sound design tools seen in popular audio software to an audience who may not be well-versed in these systems. Finally, it carries with it a hand-made library of well-recorded sounds that can be used for sound design.  

## Code Information

Whaaam is built using [svelte](https://svelte.dev/), using [tailwind css](https://tailwindcss.com/) for styling, alongside a little custom scss for very specific styling. Svelte files put html, styles, and scripts right next to each other, but it also allows pure js files to be used and imported by svelte files. As such, svelte files only contain GUI functions, while most of the internal audio processing and producing logic is held in Javascript files.

The effects library is a little more complex. Native effects in audio software are already hardware intensive, so writing a much slower library in Javascript is a no-go. Browsers have built-in audio effects, but they differ slightly, causing differences in heard sound when listening in different browsers. Instead, we use WebAssemnbly to attach a Rust-based audio effect library. Unlike typical audio software, the Rust code pre-renders all effects before the sound is played. This means, instead of the buffer going in and out of the effect live, Rust acts on the audio buffer all at once before it goes to the sound card. This makes room for higher performance and more possibilities for effects.

## Sample Library

Whaaam comes with one small sample library. Anyone has full permission to take these sounds and use them outside of the program. They are located in the “samples” folder.


To run the code on your computer, clone this repo and run `npm install` and `npm run dev` in the app folder.}
