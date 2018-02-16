/**
 * @name        Entitize
 * @author      Sheng-Liang Slogar <slogar.sheng@gmail.com>
 * @version     1.0.0
 * @link        http://github.com/shengslogar/entitize/
 * @requires    None
 */

(function () {
    // const fallback for IE 9 and 10
    // http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
    Object.defineProperties(window, {
        'ENT_STD': {value: 1, writable: false},
        'ENT_QUOTES': {value: 2, writable: false},
        'ENT_FORCENBSP': {value: 3, writable: false}
    });

    var replacements = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        ' ': '&nbsp;',
        '\'': '&#39;',
        '\t': '&nbsp;&nbsp;&nbsp;&nbsp;',
        '\n': '<br>'
    };

    String.prototype.entitize =
        String.prototype.toHTML = function (option) {

            // default
            option = option || ENT_STD;

            var regex =
                (function (entType) {
                    switch (entType) {
                        case ENT_QUOTES:
                            return /[ <>&"\t\n']/g;
                        case ENT_STD:
                        case ENT_FORCENBSP:
                        default:
                            return /[ <>&"\t\n]/g;
                            break;
                    }
                }(option));

            var str = this;

            // when going through multiple spaces,
            // this is used to see if the last space
            // was replaced with `&nbsp;`
            var lastSpaceReplaced = false;

            return str.replace(regex, function (char, idx) {

                // spaces get special treatment
                if (char == ' ' && option != ENT_FORCENBSP) {
                    var prevChar = str[idx - 1];
                    var nextChar = str[idx + 1];

                    /**
                     * Only every other space needs to be &nbsp;, or the
                     * leading/trailing space on a string.
                     *
                     * For example:
                     *      1) " this is my string "    ->  "&nbsp;this is my string&nbsp;"
                     *      2) "  this is my string"    ->  "&nbsp; this is my string"
                     *      3) "this  is my string"     ->  "this&nbsp; is my string"
                     *      4) "this    is my string"   ->  "this&nbsp; &nbsp; is my string"
                     */
                    if ((!lastSpaceReplaced && (prevChar == ' ' || nextChar == ' '))
                        || (prevChar == undefined || nextChar == undefined)) {
                        lastSpaceReplaced = true;
                    }
                    else {
                        lastSpaceReplaced = false;
                        return char;
                    }
                }
                else {
                    lastSpaceReplaced = false;
                }

                return replacements[char];
            });
        }
}());