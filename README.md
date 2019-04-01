# Classic Arcade Game Clone Project

## Table of Contents

- [How to Play](#how to play)
- [How to Load the Game](#how to load the game)
- [Dependencies](#dependencies)
- [Necessary Files](#necessary files)
- [Notes](#notes)
- [License](#license)


# How to Play

If you've ever played the old Arcade game Frogger, this game will be very similar.
You, the player, have to navigate to the water without colliding with any of the
oncoming enemies: giant bugs! If you do collide with one of the bugs, the game
ends, and you have lost. But if you manage to avoid the bugs and reach the
water at the opposite side of the playing field, you win!

To navigate, use the arrow keys to move up, down, left and right. It is not possible
to move off the board or wrap around it.

Health and Gems: You may see a Heart appear on the screen. If you can navigate to
a Heart, your player will transform into Cat Girl, and will be immune to the Bug enemies
(who will temporarily appear ghost-like)...for a short while, which may give you
an edge in reaching the water and winning the game. You may also then have a
better chance of collecting blue Gems which will appear randomly on the screen.
Note that in this version you cannot accumulate Health, and your extra Health
may run out in relation to the first Health bonus you picked up.

# How to Load the Game

To load the game, open index.html in any browser window.

# Dependencies

This game runs in all modern browsers that support Javascript ES6, CSS and HTML5.

# Necessary Files

Open index.html in any browser to play the game. This file depends on css/style.css,
the javascript files app.js, engine.js, and resources.js, as well as a bunch
of graphic files:

'images/stone-block.png',            // building blocks for the screen
'images/water-block.png',
'images/grass-block.png',
'images/enemy-bug.png',              // replaced by enemy-bug-trimmed.png
'images/char-boy.png',               // replaced by char-boy-trimmed-red-background.png
'images/char-cat-girl-trimmed.png',
'images/enemy-bug-trimmed.png',
'images/char-boy-trimmed.png',       // not currently in use
'images/char-boy-trimmed-red-background.png',   
'images/blue-gem-trimmed.png',
'images/heart-trimmed.png',          // the Heart
'images/ghost-bug.png'               // ghost version of the enemy bug

# Implementation Notes


All graphics were provided for this project, however, I did edit them so that
their actual dimensions could be programmatically determined, in figuring out
whether 2 graphical objects were overlapping, e.g. the player and a bug or
the player and the Heart or Gem. Many of the graphics originally had transparent
edges that made their dimensions much larger than they actually appeared.

Further, because the intersection of 2 graphics was determined by testing the rectangular
edges of the graphics, I gave the boy character a background so that it would be clear
when he overlapped with the bugs. However, I did not give the Cat Girl
this background since she is not affected by the bugs. An alternative would
be to shrink token's rectangle that is to be compared for overlap.

I left the objects that were provided in the base code in ES5 style (Enemy, Player).
New objects were written in ES6: Collectible, for the Heart and Gem, and
MessageField, for the convenience of sending messages to the user without
disrupting the game in progress.



# License

This game is in the public domain and was written by Noreen Wu in March of 2019.
It is assignment 3 of the Udacity Front-End Developer course.
