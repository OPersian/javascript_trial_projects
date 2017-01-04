/**
 * This part is responsible for custom controlling of the playback rate.
 * Native videojs component's handlers are rewritten for the next events:
 * - ratechange
 * - click
 *
 */

/** Run a callback when DOM is fully loaded */
var domReady = function(callback) {
  if (document.readyState === "interactive" || document.readyState === "complete") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

domReady(function() {

    var playbackRateMenuButton = videojs.getComponent('PlaybackRateMenuButton');
    var controlBar = videojs.getComponent('ControlBar');

    /**
     * The custom component for controlling the playback rate.
     *
     * @param {Player|Object} player
     * @param {Object=} options
     * @extends PlaybackRateMenuButton
     * @class PlaybackRateMenuButtonExtended
     */
    var playbackRateMenuButtonExtended = videojs.extend(playbackRateMenuButton, {
        /** @constructor */
        constructor: function (player, options) {
            playbackRateMenuButton.call(this, player, options);
            this.on('ratechange', this.updateLabel);
            this.on('click', this.onClick);
        },
        onClick: function onClick() {
            console.log('&&&&&&&&&&&& playbackRateMenuButtonExtended CLICKED &&&&&&&&&&&&');
            return false;
    },
    });

    /**
     * Update Speed button label when rate is changed.
     * Undefined rate is replaced by significant value.
     *
     * @method updateLabel
     */
    playbackRateMenuButtonExtended.prototype.updateLabel = function(event){
        console.log('&&&&&&&&&&&& playbackRateMenuButtonExtended UPDATED SPEED LABEL &&&&&&&&&&&&');
        var speed = this.player().playbackRate() || 1;
        this.labelEl_.innerHTML = speed + 'x';
    };

    /**
     * Handle click on Speed control.
     * Do nothing when control is clicked.
     *
     * @method handleClick
     */
    playbackRateMenuButtonExtended.prototype.handleClick = function(event){
        // FIXME for Brightcove
        console.log('&&&&&&&&&&&& playbackRateMenuButtonExtended CLICKED &&&&&&&&&&&&');
        // return false;
        var speed = this.player().playbackRate() || 1;
        this.player().playbackRate(speed)
    };

    var videoJSSpeedHandler = function(options){
      if (this.tagAttributes.brightcove !== undefined) {
        console.log('&&&&&&&&&&&& brightcove &&&&&&&&&&&&');
        this.controlBar.customControlSpacer.addChild('playbackRateMenuButtonExtended', options);
      } else {
        console.log('&&&&&&&&&&&& NOT brightcove &&&&&&&&&&&&');
        this.controlBar.addChild('playbackRateMenuButtonExtended', options);
      }
    };

    // Register the component under the name of the native one to rewrite it
    videojs.registerComponent('PlaybackRateMenuButton', playbackRateMenuButtonExtended);

    // Charge the component into videojs
    // controlBar.prototype.options_.children.push('PlaybackRateMenuButton');
    // player.controlBar.customControlSpacer.addChild('PlaybackRateMenuButton');
    videojs.plugin('videoJSSpeedHandler', videoJSSpeedHandler);

    // console.log("%%%%%%%%%%%%%% playbackRateMenuButtonExtended %%%%%%%%%%%%%%" + playbackRateMenuButtonExtended);
    // var playbackRateMenuButtonNEW = videojs.getComponent('PlaybackRateMenuButton');
    // console.log("%%%%%%%%%%%%%% playbackRateMenuButton NEW %%%%%%%%%%%%%%" + playbackRateMenuButtonNEW);
    // console.log("%%%%%%%%%%%%%% updateLabel %%%%%%%%%%%%%%" + playbackRateMenuButtonNEW.prototype.updateLabel);
    // console.log("%%%%%%%%%%%%%% handleClick %%%%%%%%%%%%%%" + playbackRateMenuButtonNEW.prototype.handleClick);
    // console.log("%%%%%%%%%%%%%% children %%%%%%%%%%%%%%" + controlBar.prototype.options_.children);

});
