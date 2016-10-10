/* global _, SimpleSchema: true, AutoForm, humanize */

/**
 * @method getKeyPlaceholder
 * @private
 * @param {Object} schemaForKey - Object that will be added to the context when calling each autoValue function
 * @returns {Boolean|String|undefined}
 *
 * Updates doc with automatic values from autoValue functions or default
 * values from defaultValue. Modifies the referenced object in place.
 */
function getKeyPlaceholder(schemaForKey) {
  var result;
  if (schemaForKey.autoform) {
    if (typeof schemaForKey.autoform.placeholder != 'undefined') {
      result = schemaForKey.autoform.placeholder;

      // delete autoform.placeholder;
      schemaForKey.autoform = _.omit(schemaForKey.autoform, 'placeholder');

      return result;
    }

    for (var key in schemaForKey.autoform) {
      if (typeof schemaForKey.autoform[key].placeholder != 'undefined') {
        result = schemaForKey.autoform[key].placeholder;

        // delete autoform[key].placeholder;
        schemaForKey.autoform[key] = _.omit(schemaForKey.autoform[key], 'placeholder');

        return result;
      }
    }
  }
}

// returns an inflected version of fieldName to use as the label
var inflectedLabel = function(fieldName) {
  var label = fieldName, lastPeriod = label.lastIndexOf(".");
  if (lastPeriod !== -1) {
    label = label.substring(lastPeriod + 1);
    if (label === "$") {
      var pcs = fieldName.split(".");
      label = pcs[pcs.length - 2];
    }
  }
  if (label === "_id") {
    return "ID";
  }
  return humanize(label);
};

var oldSimpleSchema = SimpleSchema;

SimpleSchema = function (schemas, options) {
  schemas = schemas || {};

  if (!_.isArray(schemas)) {
    schemas = [schemas];
  }
  
  // insert placeholder into the schema if addPlaceholder mode is on
  if (AutoForm.addPlaceholder) {
    for (var i = 0; i < schemas.length; ++i) {
      var schema = schemas[i];
    
      var placeholder = null;
      var keyPlaceholder = null;
      var keyLabel = null;
      
      for (var key in schema) {
        placeholder = getKeyPlaceholder(schema[key]);
        
        if (typeof placeholder == 'undefined') {
          //there is no placeholder set one using the format
          keyLabel = schema[key].label || inflectedLabel(key);
          keyPlaceholder = AutoForm.placeholderFormat.replace("[label]", keyLabel);
          
          schema[key].autoform = schema[key].autoform || {};
          schema[key].autoform.placeholder = keyPlaceholder;
          
        } else if (typeof placeholder == 'string') {
          schema[key].autoform.placeholder = placeholder;
        }
      }
    }
  }

  return oldSimpleSchema.apply(this, [schemas, options]);
};