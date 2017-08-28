'use strict';

var $ = require('jquery');

module.exports = function () {

    $(function () {

        //Get all text nodes in a given container
//Source: http://stackoverflow.com/a/4399718/560114
        function getTextNodesIn(node, includeWhitespaceNodes) {
            var textNodes = [], nonWhitespaceMatcher = /\S/;

            function getTextNodes(node) {
                if (node.nodeType == 3) {
                    if (includeWhitespaceNodes || nonWhitespaceMatcher.test(node.nodeValue)) {
                        textNodes.push(node);
                    }
                } else {
                    for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                        getTextNodes(node.childNodes[i]);
                    }
                }
            }

            getTextNodes(node);
            return textNodes;
        }

        var textNodes = getTextNodesIn($(".wrapper")[0], false);
        var i = textNodes.length;
        var node;
        while (i--) {
            node = textNodes[i];
            node.textContent = node.textContent.replace(/DAVINCI/g, "DAVINCI®");
        }

    });

};