# contentEditableCaret.js

contentEditableCaret.js is a lightweight JavaScrpt plugin to allow you to move the caret (or cursor) position in a contentEditable element.

You can set the caret position in your contentEditable element by providing the string.

```
<div id="content" contenteditable="true">
Neighbors bring food with death and flowers with sickness and little things in between. Boo was our neighbor. He gave us two soap dolls, a broken watch and chain, a pair of good-luck pennies, and our lives. But neighbors give in return. We never put back into the tree what we took out of it: we had given him nothing, and it made me sad.
</div>

<button onclick="onClickButton()">Focus</button>

<script>
	const element = document.getElementById( 'content' );
	function onClickButton(){
		contentEditableCaret( element, 'Boo', true, false  );
	}
</script>
```

## `contentEditableCaret( el, text, order = true, index = true, firstChild = true )`

`contentEditableCaret()` function accepts five arguments:

 * `{object} el` - Element to be search for.
 * `{string} text` - Text that needs to be looked for.
 * `{boolean} order` - Wheather to search for the first or last occurrence of the text.
 * `{boolean} index` - Wheather to search for the beginning or end of the text.
 * `{boolean} firstChild` - Wheather to search for the first occurrence or the last in nested elements.

 ## Including contentEditableCaret.js

 Below are some of the most common ways to include contentEditableCaret.js

 ### npm

 To include in Node, first install with npm.

 ```npm install contenteditablecaret```

 After that, you can include it using:

 ```import contentEditableCaret from 'contenteditablecaret';```

 ### Browser

 ```
 <script> var exports = {}; </script>
 <script src="/dist/contentEditableCaret.min.js"></script>
 ```

## License & Attribution

MIT © [Hardeep Asrani](http://www.hardeepasrani.com/).

This project is inspired by a night's worth of frustration on not finding an elegant solution. If it saves you some frustration, you can donate to the author from [here](http://www.hardeepasrani.com/donate/).