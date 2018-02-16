Entitize 1.0.0
==============

Introduction
------------
Entitize extends JavaScript's built-in string prototype with a `toHTML()` function which
converts a string's applicable characters to HTML entities. Extending the prototype means Entitize
immediately becomes available to every string object and is usable the same way `toLowerCase()` or
`indexOf()` might be used!

Requirements
------------
No extra requirements.

Usage
-----
    String.prototype.toHTML([option]);
    
Current options:

-   `ENT_STD`: Default HTML conversion
-   `ENT_QUOTES`: Converts single quotes to `&#39;' (double quotes are always converted)
-   `ENT_FORCENBSP`: Forces all spaces to be converted to `&nbsp;`

*Note: multiple options are currently **not** supported.*

Example:

    var myString = "Some <html>         <jargon>";
    myString.toHTML(ENT_FORCENBSP);
    
*Note: Entitize currently includes an original alias `entitize()` as in `myString.entitize()`.
Neither method is recommended.*

Compatibility
-------------
-   Chrome 5 +
-   Firefox 4.0 +
-   Internet Explorer 9 +
-   Opera 11.60 +
-   Safari 5 +

*Note: the above browser versions are required by the [`Object.defineProperties` method](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties).
If lower compatibility is in dire need, the first few lines of the library can be replaced
in a manner similar to the following (the following example is using lines 11-15 of entitize-1.0.0.js):*
    
    // before
    Object.defineProperties(window, {
        'ENT_STD': {value: 1, writable: false},
        'ENT_QUOTES': {value: 2, writable: false},
        'ENT_FORCENBSP': {value: 3, writable: false}
    });
    
    // after
    window.ENT_STD = 1,
    window.ENT_QUOTES = 2,
    window.ENT_FORCENBSP = 3;
    
The only difference is in our "before" code, we're defining constants with the
(almost) latest and greatest, but that also means it's not perfectly compatible. In our
"after" code, these variables just aren't read-only (constant) anymore, so you better not touch them.

Nothing big.
        
Best Practices
--------------
This is a super tiny library, and while you might find it super useful,
try not to include it as an external file along with the zillion other JS files you already
have loading on your webpage. Instead, copy-paste this code into your main file (or a plugins
file). This is the type of script that will probably never change, so there's no point forcing
every poor user to your website to make a separate network request!

Rant over.


Bugs
----
No known bugs (yet). To file a bug report, please send an email to me at
[slogar.sheng@gmail.com](mailto:slogar.sheng@gmail.com?subject=Entitize+Bug+Report).


Change Log
----------
1.0.0

-   Initial version (160731)
-   Published project to Github, tweak README (180216)

Credits
-------
This project originated as HTML Entities and is long since unpublished. The current codebase
is now based in part off of sample code found in the book *JavaScript: The Good Parts, by Douglas Crockford*.

License
-------
*You can use this code however you want, wherever you want, except for
illegal purposes. If something blows up or you do use this code for illegal purposes,
I'm not responsible. If you modify my wonderful creation, that's perfectly fine. Attribution
would be nice, but not neccessary. Use in good health.*