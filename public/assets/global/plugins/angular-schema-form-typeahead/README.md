angular-schema-form-marked
==========================

Display Markdown content in angular-schema-form with chjj/marked

This Marked add-on uses as the name implies the Marked plugin to provide a field to display Markdown content in schema form. [Marked](https://github.com/chjj/marked) as well as [angular-marked](https://github.com/Hypercubed/angular-marked) is used.

Marked is full-featured markdown parser and compiler. it is highly customizable and this add-on takes an options object via `markedOptions` in the form. More info below at [Options](#Options).

Installation
------------
The editor is an add-on to the Bootstrap decorator. To use it, just include
`bootstrap-marked.min.js` *after* `dist/bootstrap-decorator.min.js`.

Easiest way is to install is with bower, this will also include dependencies:
```bash
$ bower install angular-schema-form-marked
```

You'll need to load a few additional files to use the editor:

**Be sure to load this projects files after you load angular schema form**

1. Angular
2. The [Marked](https://github.com/chjj/marked) source file
3. The [angular-marked](https://github.com/Hypercubed/angular-marked) source file
4. **Angular Schema Form**
5. The Angular Schema Form Marked files (this project)

Example

```HTML
<script type="text/javascript" src="/bower_components/angular/angular.min.js"></script>
<script type="text/javascript" src="/bower_components/angular-sanitize/angular-sanitize.min.js"></script>
<script type="text/javascript" src="bower_components/marked/lib/marked.js"></script>
<script type="text/javascript" src="/bower_components/angular-marked/angular-marked.js"></script>

<script type="text/javascript" src="/bower_components/angular-schema-form/schema-form.min.js"></script>
<script type="text/javascript" src="/bower_components/angular-schema-form-marked/bootstrap-marked.js"></script>

```

When you create your module, be sure to depend on this project's module as well.

```javascript
angular.module('yourModule', ['schemaForm', 'schemaForm-marked']);
```

Usage
-----
The marked add-on adds a new form type, `marked`, and a new default
mapping.

|  Form Type     |   Becomes    |
|:---------------|:------------:|
|  marked        |  a marked widget |


| Schema             |   Default Form type  |
|:-------------------|:------------:|
| "type": "string"   |   marked   |


Options
-------
angular-marked has default option that can be configured in the module. Currently, the only option is {gfm: true}
