/*!
 * FormValidation (http://bootstrapvalidator.com)
 * The best jQuery plugin to validate form fields. Support Bootstrap, Foundation, SemanticUI, UIKit frameworks
 *
 * @version     v0.6.0-dev, built on 2014-12-04 5:22:01 PM
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     http://bootstrapvalidator.com/license/
 */
/**
 * This class supports validating Foundation form (http://foundation.zurb.com/)
 */
/* global Foundation: false */
(function($) {
    FormValidation.Framework.Foundation = function(element, options) {
        options = $.extend(true, {
            button: {
                // The class for disabled button
                // http://foundation.zurb.com/docs/components/buttons.html
                disabled: 'disabled'
            },
            err: {
                clazz: 'error',
                parent: '^.*((small|medium|large)-[0-9]+)\\s.*(columns).*$'
            },
            // Foundation doesn't support feedback icon
            icon: {
                valid: null,
                invalid: null,
                validating: null,
                feedback: 'fv-control-feedback'
            },
            row: {
                // http://foundation.zurb.com/docs/components/forms.html
                selector: '.row',
                valid: '',
                invalid: 'error',
                feedback: 'fv-has-feedback fv-foundation-has-feedback'
            }
        }, options);

        FormValidation.Base.apply(this, [element, options]);
    };

    FormValidation.Framework.Foundation.prototype = $.extend({}, FormValidation.Base.prototype, {
        /**
         * Specific framework might need to adjust the icon position
         *
         * @param {jQuery} $field The field element
         * @param {jQuery} $icon The icon element
         */
        _fixIcon: function($field, $icon) {
            var type = $field.attr('type');
            if ('checkbox' === type || 'radio' === type) {
                var $next = $icon.next();
                if ($next.is('label')) {
                    $icon.insertAfter($next);
                }
            }
        },

        /**
         * Create a tooltip or popover
         * It will be shown when focusing on the field
         *
         * @param {jQuery} $field The field element
         * @param {String} message The message
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _createTooltip: function($field, message, type) {
            var that  = this,
                $icon = $field.data('fv.icon');
            if ($icon) {
                $icon
                    .attr('title', message)
                    .css({
                        'cursor': 'pointer'
                    })
                    .off('mouseenter.container.fv focusin.container.fv')
                    .on('mouseenter.container.fv', function() {
                        that._showTooltip($field, type);
                    })
                    .off('mouseleave.container.fv focusout.container.fv')
                    .on('mouseleave.container.fv focusout.container.fv', function() {
                        that._hideTooltip($field, type);
                    });
                Foundation.libs.tooltip.create($icon);
                $icon.data('fv.foundation.tooltip', $icon);
            }
        },

        /**
         * Destroy the tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _destroyTooltip: function($field, type) {
            var $icon = $field.data('fv.icon');
            if ($icon) {
                $icon.css({
                    'cursor': ''
                });
                var $tooltip = $icon.data('fv.foundation.tooltip');
                if ($tooltip) {
                    // Foundation doesn't provide method to destroy particular tooltip instance
                    $tooltip.off('.fndtn.tooltip');
                    Foundation.libs.tooltip.hide($tooltip);
                    $icon.removeData('fv.foundation.tooltip');
                }
            }
        },

        /**
         * Hide a tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _hideTooltip: function($field, type) {
            var $icon = $field.data('fv.icon');
            if ($icon) {
                $icon.css({
                    'cursor': ''
                });
                var $tooltip = $icon.data('fv.foundation.tooltip');
                if ($tooltip) {
                    Foundation.libs.tooltip.hide($tooltip);
                }
            }
        },

        /**
         * Show a tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _showTooltip: function($field, type) {
            var $icon = $field.data('fv.icon');
            if ($icon) {
                var $tooltip = $icon.data('fv.foundation.tooltip');
                if ($tooltip) {
                    $icon.css({
                        'cursor': 'pointer'
                    });
                    Foundation.libs.tooltip.show($tooltip);
                }
            }
        }
    });
}(jQuery));
