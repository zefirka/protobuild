# List v0.1.1

---

List component. 

### Options
 - `tag` - default: `ul` - Tag of list
 - `className` - classes of list or path to classes in page JSON
 - `itemClassName` - classnames for items
 - `items` - path to items array in page JSON
 - `template` - default: `simple` - template to render items. **@TODO** - make posible to use custom templates

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