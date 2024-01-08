[![Build Status](https://scrutinizer-ci.com/g/alfs18/jsramverk/badges/build.png?b=master)](https://scrutinizer-ci.com/g/alfs18/jsramverk/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/alfs18/jsramverk/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/alfs18/jsramverk/?branch=master)

# my-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Redovisningstext
Till frontenden användes ramverket Vue, då det verkade enklast. Detta eftersom jag då kunde återanvända en hel del från föregående kursmoment.

Hade en del problem med hur jag skulle göra för att anpassa sidan till olika skärmar. Visste inte riktigt hur jag skulle göra med tabellerna för att få dem att fungera för t.ex. en mobiltelefon - i slutändan gjorde jag mer av en informationsruta till de olika aktierna. Dessa informationsrutor visas endast vid en viss skärmstorlek, vilket regleras genom css.

För att inte låta en användare ta del av alla sidorna (och för att slippa att backenden kraschar när den försöker hämta något okänt) så användes v-if="token". Detta gör att ett visst innehåll på sidan inte laddas om token inte finns, dvs. när ingen är inloggad. Det som istället visas är en text om att användaren behöver logga in för att ta del av innehållet.

Användaren kan lägga till hur mycket pengar den vill, men jag gjorde en spärr så att man inte kan köpa för mer än sina tillagda tillgångar.

Till post-requesterna användes axios, då jag tyckte det fungerade bra i de tidigare kursmomenten.
