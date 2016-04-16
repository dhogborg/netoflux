var fs = require('fs')
var csv = require('csv')

function readCSV (filename, cb) {
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err

    csv.parse(data, {delimiter: ';', columns: true}, function (err, output) {
      if (err) throw err
      cb(output)
    })
  })
}

function writeReadings (readings, tags) {
  readings.forEach((reading) => {
    writeReading(reading, tags)
  })
}

function writeReading (reading, tags) {
  var time = new Date(Number(reading.Timestamp + '000000'))
  if (!time) {
    return
  }

  for (var key in reading) {
    if (!reading[key] || reading[key] == '') {
      continue
    }

    if (key == 'Timestamp' || key.indexOf('Timezone') > -1) {
      continue
    }

    var keys = [key.toLowerCase()]

    for (var a = 0; a < tags.length; a++) {
      keys.push(tags[a])
    }

    var value = 'value=' + reading[key]
    console.log(keys.join(',') + ' ' + value + ' ' + time.getTime() + '000')
  }
}

(function () {
  var tags = []
  var file = null
  var argl = process.argv.length

  // start at 2 because that's where the arguments start
  for (var a = 2; a < argl; a++) {
    var val = process.argv[a]

    if (val == '-t' && argl > a) {
      tags.push(process.argv[a + 1])
      a++
      continue
    }

    // without a switch, this is a file path
    file = val
  }

  readCSV(file, function (readings) {
    writeReadings(readings, tags)
  })
})()
