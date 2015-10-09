console.log('Loading function');

var bmi = require('./bmi');

exports.handler = function(event, context) {
  console.log(JSON.stringify(event));

  var value = null;
  var hw = bmi.getHeightAndWeight(event);
  var height = hw[0];
  var weight = hw[1];

  console.log("Height: " + height + "; Weight: " + weight);

  if(height && weight) {
    value = (703 * weight) / (height * height);
  }
  card = bmi.getCard(value);

  console.log(JSON.stringify(card));

  if(context){
    context.succeed(card);
  }
  // context.fail(failCard)};
};
