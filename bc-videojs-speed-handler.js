/**
 * This part is responsible for custom controlling of the playback rate.
 * Native videojs component's handlers are rewritten for the next events:
 * - ratechange
 * - click
 *
 */

(function () {

    "use strict";
    function videoJSSpeedHandler(options) {

        var playbackRateMenuButton = videojs.getComponent('PlaybackRateMenuButton');
        var controlBar = videojs.getComponent('ControlBar');
        var menuButton = videojs.getComponent('MenuButton');
        var button = videojs.getComponent('Button');
        var videojsPlayer = videojs('{{ video_player_id }}');

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
                this.createEl();
            },
            onClick: function onClick() {
                console.log('&&&&&&&&&&&& CLICKED &&&&&&&&&&&&');
                return false;
            },
            createEl: function createEl(props, attributes) {
                var el = button.prototype.createEl.call(this);
                // var el = menuButton.prototype.createEl.call(this);
                this.labelEl_ = document.createElement('div')
                this.labelEl_.className = 'vjs-playback-rate-value_RRR';
                this.labelEl_.innerHTML = 1.0;
                videojsPlayer.el().appendChild(this.labelEl_);
                console.log('&&&&&&&&&&&& CREATED EL &&&&&&&&&&&&');
                return el;
            },
        });

        /**
         * Update Speed button label when rate is changed.
         * Undefined rate is replaced by significant value.
         *
         * @method updateLabel
         */
        playbackRateMenuButtonExtended.prototype.updateLabel = function(event){
            console.log('&&&&&&&&&&&& UPDATED SPEED LABEL &&&&&&&&&&&&');
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
            var el = event.currentTarget;
            console.log('&&&&&&&&&&&& CLICKED el &&&&&&&&&&&&' + el);
            return false;
        };

        // Register the component under the name of the native one to rewrite it.
        videojs.registerComponent('PlaybackRateMenuButton', playbackRateMenuButtonExtended);

        // Charge the component into videojs
        if (this.tagAttributes.brightcove !== undefined) {
            this.controlBar.customControlSpacer.addChild('PlaybackRateMenuButton', options);
            // Add the new component as a default player child
            videojsPlayer.addChild('PlaybackRateMenuButton');
        } else {
            controlBar.prototype.options_.children.push('PlaybackRateMenuButton');
        }

         // console.log("%%%%%%%%%%%%%% playbackRateMenuButtonExtended %%%%%%%%%%%%%%" + playbackRateMenuButtonExtended);
         var playbackRateMenuButtonNEW = videojs.getComponent('PlaybackRateMenuButton');
         var controlBarNEW = videojs.getComponent('ControlBar');
         console.log("%%%%%%%%%%%%%% playbackRateMenuButton NEW %%%%%%%%%%%%%%" + playbackRateMenuButtonNEW);
         // console.log("%%%%%%%%%%%%%% updateLabel %%%%%%%%%%%%%%" + playbackRateMenuButtonNEW.prototype.updateLabel);
         // console.log("%%%%%%%%%%%%%% handleClick %%%%%%%%%%%%%%" + playbackRateMenuButtonNEW.prototype.handleClick);
         console.log("%%%%%%%%%%%%%% children %%%%%%%%%%%%%%" + controlBarNEW.prototype.options_.children);

        return this;
    }

    // Export plugin to the root
    window.videoJSSpeedHandler = videoJSSpeedHandler;
    window.videojs.plugin('videoJSSpeedHandler', videoJSSpeedHandler);

}).call(this);
