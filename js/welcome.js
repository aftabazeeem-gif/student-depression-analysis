addMdToPage(`
### Välkommen

## Om STJS
Det här mallen **STJS (Statistics Template for JavaScript)** underlättar att arbeta med statistik i JavaScript, samt att kunna visa upp den på ett interaktivt sätt. Den ger bl.a. stöd för:
* Att ställa databasfrågor till en databas ([SQLite](https://sqlite.org/-databaser)).
* Att visualisera data med [Google Charts](https://developers.google.com/chart).
* Att arbeta med statistik med hjälp av JavaScript-biblioteken [Simple Statistics](https://simple-statistics.github.io), ett litet lättarbetat statistik-bibliotek, och [StdLib](https://stdlib.io), ett större bibliotek med många matematiska funktioner.
* Att skriva text som visas på webbsidor med hjälp av [Markdown](https://www.markdownguide.org) - ett enkelt formateringsspråk för text.
* Att skapa en webbplats som är responsiv, dvs. fungerar bra på olika skärmstorlekar, och ordna dina sidor med statistik i ett menysystem. (Under ytan används CSS-biblioteket [Bootstrap](https://getbootstrap.com) för detta.)
* Att skapa **dropdowns** på sidorna och reagera på användarval i dessa, t.ex. genom att låta dessa val ändra urvalet av data i tabeller och diagram.

**Obs!** Fullständig dokumentation [hittar du här](/docs)!
`);

dbQuery.use('counties-sqlite');
let countyInfo = await dbQuery('SELECT * FROM countyInfo');
tableFromData({ data: countyInfo });