$(document).ready(function () {

    var sourcesApi = 'https://newsapi.org/v2/sources?apiKey={API_KEY}';
    var articlesApi = 'https://newsapi.org/v2/everything?sources=[sourceName]&apiKey={API_KEY}';
    var topHeadlinesApi = 'https://newsapi.org/v2/top-headlines?category=science-and-nature&language=en&apiKey={API_KEY}';

    displayArticles(topHeadlinesApi);
    $.getJSON(sourcesApi, fetchSources);

    $('.form-inline').submit(function (e) {
        e.preventDefault();
        var sourceSelect = $('#inlineFormCustomSelect').val();
        var customizedUrlApi = articlesApi.replace('[sourceName]', sourceSelect);
        displayArticles(customizedUrlApi);

    });

    $(document).on('click', '.article a', function (e) {
        e.preventDefault();

        var article = $(this).parents('.article');

        $('.modal').find('a').html(article.find('a').text());
        $('.modal').find('a').attr('href', article.find('a').attr('href'));
        $('.modal').find('img').attr('src', article.find('img').attr('src'));
        $('.modal').find('p').html(article.find('p').text());

    });

}); //(document).ready


/**
 * This function should download sources from remote api and fill <select> with them.
 *
 */
function fetchSources(data) {

    $.each(data.sources, function (i, source) {

        $('#inlineFormCustomSelect').append($("<option></option>")
            .attr("value", source.id)
            .text(source.name));
    });
}


function fetchArticles(data) {

    $.each(data.articles, function (i, article) {

        var template = $('#article-template').html();

        template = template.replace('[image]', article.urlToImage);
        template = template.replace('[title]', article.title);
        template = template.replace('[#]', article.url);
        template = template.replace('[article]', article.description);
        template = template.replace('[URLtoLike]', article.url);

        $('.news').append(template);

    });
    FB.XFBML.parse();
    $(".news").fadeIn("slow");

    $('.news').pinterest_grid({
        no_columns: 3,
        padding_x: 10,
        padding_y: 10,
        margin_bottom: 50,
        single_column_breakpoint: 990
    });
} // displayArticle

function displayArticles(url) {

    $(".news").fadeOut("slow", function () {
        $(this).empty();
        $.getJSON(url, fetchArticles);
    });
}




















