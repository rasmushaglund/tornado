var _ = require("underscore")

export function sort(o, conditionsString) {
  var conditions = []

  _.each(conditionsString.split(','), (c) => {
    var condition = c.trim().toLowerCase()
    var isDesc = condition.charAt(0) === '!'

    if (isDesc) {
      condition = condition.substring(1)
    }

    conditions.push({
      name: condition,
      order: isDesc ? -1 : 1
    })
  })

  o.sort((a,b) => {
    var result = 0

    _.every(conditions, (condition) => {
      var order = condition.order
      var aCondition = a[condition.name]
      var bCondition = b[condition.name]
      
      if (!bCondition || aCondition > bCondition) { 
        result = 1 * order;  
      } else if (!aCondition || aCondition < bCondition) { 
        result = -1 * order;
      } 

      return result === 0;
    })

    return result;
  })

  return o
}
