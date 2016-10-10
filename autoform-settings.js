/* global AutoForm*/

AutoForm.placeholderFormat = 'Enter [label]...';

var autoformSettings = Meteor.settings.public ? Meteor.settings.public.autoform : null;

if (autoformSettings) {
    if (autoformSettings.addPlaceholder || autoformSettings.placeholderFormat) {
        AutoForm.addPlaceholder = true;
        AutoForm.placeholderFormat = AutoForm.placeholderFormat || autoformSettings.placeholderFormat;
    }
}