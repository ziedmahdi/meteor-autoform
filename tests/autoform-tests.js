/* global Tinytest, SimpleSchema, AutoForm */

Tinytest.add("AutoForm - Auto add placeholder", function(test) {

  AutoForm.addPlaceholder = true;
  
  //placeholder is not inserted if it is set to false
  var dummySchema = new SimpleSchema({
    name: {
      type: String,
      autoform: {
        placeholder: false
      }
    }
  });
  
  test.equal(dummySchema._schema, {
    name: {
      type: String,
      autoform: {}
    }
  }, 'placeholder is not inserted if it is set to false');
  
  //default placeholder is not inserted when placeholder is defined by the schema
  dummySchema = new SimpleSchema({
    name: {
      type: String,
      autoform: {
        placeholder: 'this should be kept'
      }
    }
  });
  
  test.equal(dummySchema._schema, {
    name: {
      type: String,
      autoform: {
        placeholder: 'this should be kept'
      }
    }
  }, 'default placeholder is not inserted when placeholder is defined by the schema - 1');
  
  dummySchema = new SimpleSchema({
    name: {
      type: String,
      autoform: {
        afFieldInput: {
          placeholder: 'this also should be kept'
        }
      }
    }
  });
  
  test.equal(dummySchema._schema, {
    name: {
      type: String,
      autoform: {
        placeholder: 'this also should be kept',
        afFieldInput: {}
      }
    }
  }, 'default placeholder is not inserted when placeholder is defined by the schema - 2');
  
  //default placeholder works even if no format was provided
  dummySchema = new SimpleSchema({
    name: {
      type: String
    }
  });
  
  test.equal(dummySchema._schema, {
    name: {
      type: String,
      autoform: {
        placeholder: 'Enter Name...'
      }
    }
  }, 'default placeholder works even if no format was provided');
  
  //default placeholder follow the provided format
  AutoForm.placeholderFormat = 'Please provide [label]...';
  
  dummySchema = new SimpleSchema({
    name: {
      type: String
    }
  });
  
  test.equal(dummySchema._schema, {
    name: {
      type: String,
      autoform: {
        placeholder: 'Please provide Name...'
      }
    }
  }, 'default placeholder follow the provided format');
  
  AutoForm.placeholderFormat = 'Enter [label]...';
  
  //default placeholder use label instead of key if provided
  dummySchema = new SimpleSchema({
    name: {
      label: 'Nom',
      type: String
    }
  });
  
  test.equal(dummySchema._schema, {
    name: {
      label: 'Nom',
      type: String,
      autoform: {
        placeholder: 'Enter Nom...'
      }
    }
  }, 'default placeholder use label instead of key if provided');
  
  //default placeholder detect well labels of nested fields
  dummySchema = new SimpleSchema({
    names: {
      label: 'Nom',
      type: Array(Object)
    },
    'names.first': {
      type: String
    }
  });
  
  var nestedKeyPlaceholder = dummySchema._schema['names.first'].autoform.placeholder;
  
  test.equal(nestedKeyPlaceholder, 'Enter First...', 'default placeholder detect well labels of nested fields');
  
  //placeholder is auto inserted only when addPlaceholder mode is on
  AutoForm.addPlaceholder = false;
  
  dummySchema = new SimpleSchema({
    name: {
      type: String
    }
  });
  
  test.equal(dummySchema._schema, {
    name: {
      type: String
    }
  }, 'placeholder is auto inserted only when addPlaceholder mode is on');
  
});

//Test API:
//test.isFalse(v, msg)
//test.isTrue(v, msg)
//test.equalactual, expected, message, not
//test.length(obj, len)
//test.include(s, v)
//test.isNaN(v, msg)
//test.isUndefined(v, msg)
//test.isNotNull
//test.isNull
//test.throws(func)
//test.instanceOf(obj, klass)
//test.notEqual(actual, expected, message)
//test.runId()
//test.exception(exception)
//test.expect_fail()
//test.ok(doc)
//test.fail(doc)
//test.equal(a, b, msg)
