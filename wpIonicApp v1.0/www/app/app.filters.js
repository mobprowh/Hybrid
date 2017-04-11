angular.module('wpIonicApp.filters', [])
.filter('html_filters', function ($sce) {
    return function (text) {
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = text;
        var links = htmlObject.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            var link = links[i].getAttribute('href');
            links[i].removeAttribute('href');
            links[i].setAttribute('onclick', 'window.open("' + link + '", "_blank", "location=no,enableViewportScale=yes")');
        }
        return $sce.trustAsHtml(htmlObject.outerHTML);
    }
})

.filter('limitHtml', function () {
    return function (text, limit) {
        var changedString = String(text).replace(/<[^>]+>/gm, '');
        var length = changedString.length;
        return changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
    }
})

.filter("reverse", function () {
    return function (input) {
        var result = "";
        input = input || "";
        for (var i = 0; i < input.length; i++) {
            result = input.charAt(i) + result;
        }
        return result;
    };
})

.filter("youtube", function () {
    return function (input) {
        //console.log(input);
        return input.split('<iframe')[1].split('src="')[1].split('" frameborder')[0].split('<iframe>')[0];
    }

})

.filter("youtube1", function () {
    return function (input) {
        return input.split('<iframe')[1].split('embed\/')[1].split('?feature')[0].split('<iframe>')[0];
    }
})

.filter('trustAsResourceUrl', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

.filter('orderObjectBy', function () {
    return function (input, attribute) {
        if (!angular.isObject(input))
            return input;

        var array = [];
        for (var objectKey in input) {
            array.push(input[objectKey]);
        }

        array.sort(function (a, b) {
            a = parseInt(a[attribute]);
            b = parseInt(b[attribute]);
            return b - a;
        });
        return array;
    }
})

.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    })