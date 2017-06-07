/** Do not reload a page nor navigate away while blacklisting in bulk.
 *
 * When `form.bulk_images` exist (that is, applies for bulk blacklisting only) and
 * as soon as `selectedImages` get passed to the request data,
 * allow for leaving the page.
 *
 * Docs:
 *     https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
 */
var preventUnload = function (e) {
   'use strict';
   $(window).on('beforeunload', function(e) {
        var message = "Blacklisting process in progress.";
        // e.returnValue = message;
        console.log(message);
        return message;
   })
};
