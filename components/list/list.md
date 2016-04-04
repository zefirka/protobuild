# List v0.2.0

List component. 

### Options
 - `tag` - default: `ul` - Tag of list
 - `className` - classes of list or path to classes in page JSON
 - `itemClassName` - classnames for items
 - `items` - path to items array in page JSON
 - `activeClassName` - default: `b-list__item_acitve` - class name for active items
 - `template` - default: `simple` - template to render items or given markup

#### Items array example
```js
const list = [
    {text: 'List item 1', active: true},
    {text: 'List item 2', active: false}
];
```

If item's property active is true, then item gain class name `params.activeClassName`

### Simple template options 
```html
<li class="b-list__item ${className}">
    ${text}
</li>
```

### Links template options
```html
#import a from '../declarations/templates/common.html';

<li class="b-list__item ${className}">
    ${wrap: name=text, container=a, href=src}
</li>
```