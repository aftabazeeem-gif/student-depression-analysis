addMdToPage(`
# Student Depression Analysis

This dashboard analyzes a survey dataset about university students in India and depression.

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

This section shows how many students in the dataset reported depression.
`);

tableFromData({ data: depressionData });

drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(depressionData, 'Depression', 'students'),
  options: {
    height: 400,
    title: 'Depression Distribution',
    legend: { position: 'none' },
    hAxis: { title: 'Depression Status' },
    vAxis: { title: 'Number of Students' }
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

This section compares sleep duration with the average depression value. Lower sleep duration appears to be connected with higher depression levels.
`);

tableFromData({ data: sleepData });

drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(sleepData, 'sleep', 'avgDepression'),
  options: {
    height: 400,
    title: 'Sleep Duration vs Average Depression',
    legend: { position: 'none' },
    hAxis: { title: 'Sleep Duration' },
    vAxis: { title: 'Average Depression' }
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

This section shows the relationship between academic pressure and depression. The data suggests that higher academic pressure is connected to higher average depression values.
`);

tableFromData({ data: pressureData });

drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(pressureData, 'pressure', 'avgDepression'),
  options: {
    height: 400,
    title: 'Academic Pressure vs Average Depression',
    legend: { position: 'none' },
    hAxis: { title: 'Academic Pressure' },
    vAxis: { title: 'Average Depression' }
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

This section explores whether dietary habits are connected to depression. Students with unhealthy dietary habits show higher average depression values than students with healthier habits.
`);

tableFromData({ data: dietData });

drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(dietData, 'diet', 'avgDepression'),
  options: {
    height: 400,
    title: 'Dietary Habits vs Average Depression',
    legend: { position: 'none' },
    hAxis: { title: 'Dietary Habits' },
    vAxis: { title: 'Average Depression' }
  }
});


let hoursData = await dbQuery(`
  SELECT 
    "Work/Study Hours" AS hours,
    COUNT(*) AS students,
    AVG(Depression) AS avgDepression
  FROM "students.csv"
  GROUP BY "Work/Study Hours"
  ORDER BY "Work/Study Hours"
`);

addMdToPage(`
## 5. Work/Study Hours and Depression

This section compares daily work/study hours with average depression levels. Longer work or study hours may increase stress and reduce recovery time.
`);

tableFromData({ data: hoursData });

drawGoogleChart({
  type: 'ColumnChart',
  data: makeChartFriendly(hoursData, 'hours', 'avgDepression'),
  options: {
    height: 400,
    title: 'Work/Study Hours vs Average Depression',
    legend: { position: 'none' },
    hAxis: { title: 'Work/Study Hours' },
    vAxis: { title: 'Average Depression' }
  }
});


// Statistical summary for academic pressure
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
## 6. Statistical Summary

For academic pressure, the average depression values were analyzed using statistical measures:

- Mean: ${mean.toFixed(2)}
- Median: ${median.toFixed(2)}
- Standard deviation: ${standardDeviation.toFixed(2)}

## Conclusion

The dataset shows that depression is common among surveyed university students in India.

The clearest pattern appears in academic pressure, where higher pressure levels consistently correspond to higher average depression values. This suggests that academic workload may be one of the strongest factors connected to depression.

Sleep duration and dietary habits also show visible differences. Students with less healthy routines appear to have higher depression values.

Work/study hours add another important angle, because long daily study or work time may increase stress and reduce recovery time.

Overall, the analysis suggests that student depression is not linked to one single factor, but to a combination of academic pressure, lifestyle, and workload.
`);