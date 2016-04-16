# netoflux

Takes a netatmo csv export file and converts it to line format for insertion into InfluxDB

Currently you have to remove the first 2 lines of the export file so that the first line is the header row with column titles.

## Example csv lines
```
Timestamp;"Timezone : Europe/Berlin";Temperature;Humidity;CO2
1460483334;"2016/04/12 19:48:54";24;37;
1460483592;"2016/04/12 19:53:12";24.6;35;
```

```
node index.js Indoor_160507.csv -t module=Indoor > bed.lines
```

## Output
```
temperature,module=Indoor value=24 1460483334000000000
humidity,module=Indoor value=37 1460483334000000000
temperature,module=Indoor value=24.6 1460483592000000000
humidity,module=Indoor value=35 1460483592000000000
temperature,module=Indoor value=24.5 1460483643000000000
humidity,module=Indoor value=35 1460483643000000000
co2,module=Indoor value=1133 1460483643000000000
```

## Options
```
-t a_tag_key=the_tag_value
```
As many `-t` as you want can be added