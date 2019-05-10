I created the list of URLs by scrolling to the bottom of https://medium.com/@paulfchristiano, opening the chrome console, and entering
```js
Array.prototype.slice.call(document.getElementsByTagName('a'))
  .map(x => x.href)
  .filter(x => x.includes('paulfchristiano') || x.includes('alignment'))
  .join('\n')
```

Then in a terminal
```
pbpaste > urls.txt
```

To run crawler simply
```sh
npm install
node index.js
```

Combine pdfs, most oldest first.
```
gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=alignment.pdf $(ls pdfs/*)
```

Combine html
```
pandoc -s html/*html -o alignment.html
```