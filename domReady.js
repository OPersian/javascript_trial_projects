    /** Run a callback when DOM is fully loaded */
    var domReady = function(callback) {
        'use strict';
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    };

    /** Track a signup completion with Google Tag Manager using data layer */
    var trackSignupCompletion = function(){};

    domReady(trackSignupCompletion());
    
