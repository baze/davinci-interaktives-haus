(function($){

    var headlineLevel = config.headline_level;
    var minCount = config.min_count;

    var content = $('._content');
    var headlines = content.find(headlineLevel);

    var tocWrapper = $('<div class="_module-post-toc"></div>');
    var tocElement = $('<div class="post-toc accordion"></div>');
    tocWrapper.append(tocElement);

    /* only run on well structured texts which
    contain at least three headlines of specified level
     */
    if (headlines.length > minCount) {

        tocWrapper.insertAfter(content.find('.flexible-content-row').first());

        // create list
        var headline = $('<h3 class="post-toc--headline accordion-headline">Inhaltsverzeichnis</h3>');
        tocElement.prepend(headline);

        var list = $('<ol class="accordion-inner"></ol>');
        tocElement.append(list);

        headlines.each(function (index) {

            var text = $(this).text();

            // add id to headline
            var linkId = 'post-toc' + '-' + index;
            $(this).attr('id', linkId);

            // create list item
            var link = $('<a></a>').attr('href', '#' + linkId).text(text);
            var listItem = $('<li></li>');
            listItem.append(link);

            // add list item  to list
            list.append(listItem);
        });
    }

    return false;

})(jQuery);