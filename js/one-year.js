addMdToPage(`
# Student Depression Analysis

This page analyzes a survey dataset about university students in India and depression.

Depression is stored as:

- 0 = Not depressed
- 1 = Depressed
`);

let depressionData = await dbQuery(`
  SELECT Depression, COUNT(*) AS students
  FROM "students.csv"
  GROUP BY Depression
`);

addMdToPage(`
## 1. Depression Distribution

This shows how many students reported depression.
`);

tableFromData({
  data: depressionData
});

drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(depressionData, 'Depression', 'students'),
  options: {
    height: 400,
    title: 'Depression Distribution',
    legend: { position: 'none' }
  }
});


let sleepData = await dbQuery(`
  SELECT 
    "Sleep Duration" AS sleep,
    COUNT(*) AS students,
    AVG(Depression) AS avgDepression
  FROM "students.csv"
  GROUP BY "Sleep Duration"
`);

addMdToPage(`
## 2. Sleep Duration and Depression

This section compares sleep duration with average depression value.
`);

tableFromData({
  data: sleepData
});

drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(sleepData, 'sleep', 'avgDepression'),
  options: {
    height: 400,
    title: 'Sleep Duration vs Average Depression',
    legend: { position: 'none' }
  }
});


let pressureData = await dbQuery(`
  SELECT 
    "Academic Pressure" AS pressure,
    COUNT(*) AS students,
    AVG(Depression) AS avgDepression
  FROM "students.csv"
  GROUP BY "Academic Pressure"
  ORDER BY "Academic Pressure"
`);

addMdToPage(`
## 3. Academic Pressure and Depression

This section shows the relationship between academic pressure and depression.
`);

tableFromData({
  data: pressureData
});

drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(pressureData, 'pressure', 'avgDepression'),
  options: {
    height: 400,
    title: 'Academic Pressure vs Average Depression',
    legend: { position: 'none' }
  }
});


let dietData = await dbQuery(`
  SELECT 
    "Dietary Habits" AS diet,
    COUNT(*) AS students,
    AVG(Depression) AS avgDepression
  FROM "students.csv"
  GROUP BY "Dietary Habits"
`);

addMdToPage(`
## 4. Dietary Habits and Depression

This section explores whether dietary habits are connected to depression.
`);

tableFromData({
  data: dietData
});

drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(dietData, 'diet', 'avgDepression'),
  options: {
    height: 400,
    title: 'Dietary Habits vs Average Depression',
    legend: { position: 'none' }
  }
});


// Statistical summary without external statistics library
let pressureValues = pressureData.map(row => Number(row.avgDepression));

let mean = pressureValues.reduce((a, b) => a + b, 0) / pressureValues.length;

let sorted = [...pressureValues].sort((a, b) => a - b);
let middle = Math.floor(sorted.length / 2);
let median = sorted.length % 2 === 0
  ? (sorted[middle - 1] + sorted[middle]) / 2
  : sorted[middle];

let variance = pressureValues.reduce((sum, value) => {
  return sum + Math.pow(value - mean, 2);
}, 0) / pressureValues.length;

let standardDeviation = Math.sqrt(variance);

addMdToPage(`
## 5. Statistical Summary

For academic pressure, the average depression values were analyzed using statistical measures:

- Mean: ${mean.toFixed(2)}
- Median: ${median.toFixed(2)}
- Standard deviation: ${standardDeviation.toFixed(2)}

## Conclusion

The analysis shows that depression is common among students in this dataset.

The clearest relationship appears between academic pressure and depression. As academic pressure increases, the average depression value also increases.

Sleep duration and dietary habits also appear to be connected to depression, but academic pressure seems to be the strongest factor in this analysis.
`);