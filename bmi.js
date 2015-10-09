
var getCard = function(bmi)
{
  var card = {};
  card.name = "card";
  card.part = [];

  card.part.push({});
  card.part[0].name = "summary";
  if(!bmi) {
    card.part[0].valueString = "Need Height and Weight to calculate BMI.";
  } else {
    description = getBmiDescription(bmi);
    card.part[0].valueString = "Patient is " + description + " (BMI " + parseFloat(bmi).toFixed(2) + ")";
  }

  card.part.push({});
  card.part[1].name = "source";
  card.part[1].valueString = "BMI CDS Hook";

  card.part.push({});
  card.part[2].name = "indicator";
  card.part[2].valueString = "info";

  var params = {};
  params.resourceType = "Parameters";
  params.parameter = [ card ];

  return params;
}

var bmiLevels = {
  "underweight": [0.0,18],
  "healthy": [18,24],
  "overweight": [24,30],
  "obese": [30,40],
  "extremely obese": [40,999]
};

var getBmiDescription = function(value) {
  for (var k in bmiLevels) {
    if (bmiLevels.hasOwnProperty(k)) {
        var range = bmiLevels[k];
        if(value >= range[0] && value < range[1]) {
          return k;
        }
    }
  }
  return value;
};

var getEntry = function(entries,key,value) {
  for (var i in entries) {
    if(entries[i][key]==value) return entries[i];
  }
  return null;
};

var getHeightAndWeight = function(params) {
  var data = getEntry(params.parameter,"name","preFetchData");
  var entries = data.resource.entry;
  var height = null;
  var weight = null;

  for(var i in entries) {
    var item = entries[i];
    if(item.resource.resourceType=="Bundle") {
      var obs = item.resource.entry[0].resource;
      if(obs.resourceType=="Observation") {
        if(obs.code.coding[0].code=="3141-9") {
          weight = obs.valueQuantity.value;
          if(obs.valueQuantity.unit=="kg") {
            // convert to pounds
            weight = (2.20462 * weight);
            console.log("Converted " + obs.valueQuantity.value + " kg to " + weight + " pounds.");
          }
        } else if(obs.code.coding[0].code=="8302-2") {
          height = obs.valueQuantity.value;
          if(obs.valueQuantity.unit=="cm") {
            // convert to inches
            height = (0.393701 * height);
            console.log("Converted " + obs.valueQuantity.value + " cm to " + height + " inches.");
          }
        }
      }
    }
  }
  return [height,weight];
}

module.exports = {
  getCard: getCard,
  bmiLevels: bmiLevels,
  getBmiDescription: getBmiDescription,
  getEntry: getEntry,
  getHeightAndWeight: getHeightAndWeight
};
