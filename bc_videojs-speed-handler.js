/**
 * This part is responsible for custom controlling of the playback rate.
 * Native videojs component's handlers are rewritten for the next events:
 * - ratechange
 * - click
 *
 */

domReady(function() {

    var playbackRateMenuButton = videojs.getComponent('PlaybackRateMenuButton');
    console.log("%%%%%%%%%%%%%% playbackRateMenuButton %%%%%%%%%%%%%%" + playbackRateMenuButton);
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
            this.on('click', this.handleClick);
        }
    });

    /**
     * Update Speed button label when rate is changed.
     * Undefined rate is replaced by significant value.
     *
     * @method updateLabel
     */
    playbackRateMenuButtonExtended.prototype.updateLabel = function(event){
        console.log('LAAAAAAAA LAAAAAAAAAA LAAAAAAAAAA');
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
        console.log('VOILAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        return false;
    };

    var bcVideojsSpeedHandler = function(options){
      if (this.tagAttributes.brightcove !== undefined) {
        alert('1');
        this.controlBar.customControlSpacer.addChild('playbackRateMenuButtonExtended', options);
      } else {
        this.controlBar.addChild('playbackRateMenuButtonExtended', options);
        alert('2');
      }
    };

    // Register the component under the name of the native one to rewrite it
    videojs.registerComponent('PlaybackRateMenuButton', playbackRateMenuButtonExtended);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Charge the component into videojs
    controlBar.prototype.options_.children.push('PlaybackRateMenuButton');
    // player.addChild('PlaybackRateMenuButton');  // FIXME Brightcove
    // player.addChild('playbackRateMenuButtonExtended');  // FIXME Brightcove
    // videojs.plugin('bcVideojsSpeedHandler', bcVideojsSpeedHandler);  // TODO
    // //// this.controlBar.customControlSpacer.addChild('PlaybackRateMenuButton');        // //// this.controlBar.addChild('PlaybackRateMenuButton');

    // controlBar.addChild('playbackRateMenuButtonExtended');
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    console.log("%%%%%%%%%%%%%% playbackRateMenuButtonExtended %%%%%%%%%%%%%%" + playbackRateMenuButtonExtended);
    console.log("%%%%%%%%%%%%%% updateLabel %%%%%%%%%%%%%%" + playbackRateMenuButtonExtended.prototype.updateLabel);
    console.log("%%%%%%%%%%%%%% handleClick %%%%%%%%%%%%%%" + playbackRateMenuButtonExtended.prototype.handleClick);
    var playbackRateMenuButtonNEW = videojs.getComponent('PlaybackRateMenuButton');
    console.log("%%%%%%%%%%%%%% playbackRateMenuButton NEW %%%%%%%%%%%%%%" + playbackRateMenuButtonNEW);
    console.log("%%%%%%%%%%%%%% children %%%%%%%%%%%%%%" + controlBar.prototype.options_.children);

});
