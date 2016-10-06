// Helper for pagination rendering
// Eshop uses this helper
F.helpers.pagination = function (model) {
    var pagination = new Pagination(model.count, model.page, model.limit).render();

    var builder = '';
    for (var i = 0, len = pagination.length; i < len; i++) {
        if (pagination[i].selected)
            builder += '<li><span>{1}</span></li>'.format(pagination[i].url, pagination[i].page);
        else
            builder += '<li><a href="{0}">{1}</a></li>'.format(pagination[i].url, pagination[i].page);
    }

    /*<li><a href="javascript:;">&laquo;</a></li>
     <li><a href="javascript:;">1</a></li>
     <li><span>2</span></li>
     <li><a href="javascript:;">3</a></li>
     <li><a href="javascript:;">4</a></li>
     <li><a href="javascript:;">5</a></li>
     <li><a href="javascript:;">&raquo;</a></li>*/

    return builder;
};

// Parses all parent categories from selected category
// This helper is used in layout.html
F.helpers.sitemap_category = function (url, category) {

    var a = category.name.split('/');
    var b = category.linker.split('/');
    var builder = '';
    var linker = '';
    
    //console.log(category);

    for (var i = 0, length = a.length; i < length; i++) {
        linker += (linker ? '/' : '') + b[i];
        builder += '<li><a href="{0}/{1}/">{2}</a></li>'.format(url + linker,category._id,a[i].trim());
    }

    return builder;
};

// Helper for formatting number with currency
// Eshop uses this helper
F.helpers.currency = function (value, decimals) {
    if (typeof (value) === 'string')
        return F.config.custom.currency_entity.format(value);
    return F.config.custom.currency_entity.format(value.format(decimals || 2));
};