# Pokevision-mods

## Installing the script using Tampermonkey (Chrome)

Tampermonkey lets you install userscripts in Chrome, similarly to how Greasemonkey does it in Firefox.

1. Install the [Tampermonkey extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo/related) for Chrome.

2. Click this link to navigate to the script URL: https://github.com/aimiliano/Pokevision-mods/raw/master/pokevision-mod-tampermonkey.user.js

3. Tampermonkey will detect the userscript and will open a new tab. Click on `Install to Tampermonkey` and click Ok.

4. Refresh pokevision.com

## Run the script via the console (no extensions needed)

If you don't want or can't install one of the previously mentioned browser extensions, one possibility is to run the script via the developer console. However, you will need to rerun the script every time you refresh the page.

1. On the pokevision page, open your broser's developer console.
    * On Firefox, press `Ctrl` + `Shift` + `K`
    * On Chrome, press `Ctrl` + `Shift` + `J`
    * On Safari, press `Ctrl` + `Alt` + `I`
    * On IE9+, press `F12`
    * On Opera, press `Ctrl` + `Shift` + `I`
    * If you are having trouble opening your console, try reading the in depth explanation [here](http://webmasters.stackexchange.com/questions/8525/how-to-open-the-javascript-console-in-different-browsers)

2. Copy the contents of the folloing file and paste it into the developer console on the TPP page: 
  https://raw.githubusercontent.com/aimiliano/Pokevision-mods/master/pokevision-js-mod.js
3. Press `Enter` to run the code.


## How to Define the areas you want to scan.
There are 2 options.
//Easy one
1. Write down all the Lat,Long that appears on the URL and then format it as following:
[ [lat,long],[lat,long],... ] 
then paste it to the script in the section my_neighboorhood = //your array
and thats it!

2. enable click on maps
 uncomment  //L.circle(latlonarr, 1000).addTo(App.home.map);
then refresh page , click where you want to scan, then open console copy the coords, format it as following:
[ [lat,long],[lat,long],... ] 
then paste it to the script in the section my_neighboorhood = //your array
and thats it!
remember to comment again //L.circle(latlonarr, 1000).addTo(App.home.map); in the js if you dont want the circle to show
