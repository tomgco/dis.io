module.exports = function(req, schema, cb) {
  var entity = {}
    , errors = {}
    ;

  Object.keys(schema.fields).forEach(function(key) {
    Object.keys(schema.fields[key]).forEach(function(item) {
      var field = schema.fields[key][item];
      field.validation.forEach(function(fieldKey, index) {
        field.validation[index].validate(field.name, req.body[item], function(err) {
          if (err) {
            errors[item] = err.message;
          }
          entity[item] = req.body[item];
        });
      });
    });
  });
  cb && cb(errors, entity);
};