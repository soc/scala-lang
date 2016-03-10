---
---

"use strict";

function resizeAllSnippetBoxes() {
  const snippetIds = ["#nutshell", "#platforms", "#editors", "#tooling"];
  snippetIds.forEach(function(id) {resizeSnippetBoxesIn(id)});
}

function resizeSnippetBoxesIn(id) {
  // Exclude the heading
  const snippets = $(id + " .bullet-point").not(".col-md-12");

  // same height hack for scala in a nutshell boxes
  function makeAllBoxesSameHeight(boxes) {
    boxes.map(function() { $(this).css('height', 'auto'); });
    const maxHeight = Math.max.apply(
      Math, boxes.map(function() {
          return $(this).height();
    }).get());
    //console.log('resized to ' + maxHeight);
    boxes.height(maxHeight);
  }

  makeAllBoxesSameHeight(snippets);
}

let requestedSnippet = undefined;
let expandedExplanation = undefined;
// Figure out how the page is laid out so that we know where to place the div
// with the expanded explanations. Find the last element which shares the
// same vertical offset as the one the user clicked on.
function findExpansionTarget(elem) {
  if (expandedExplanation !== undefined)
    expandedExplanation.remove();
  const snippets = $("#nutshell .snippet-link");
  const len = snippets.length;
  let i = 0;
  let snippet = undefined;
  let elemFound = false;
  while (i < len) {
    let newSnippet = snippets.get(i);
    if ($(snippet).is(elem)) {
      elemFound = true;
      console.log("elemFound!")
    }
    if (snippet !== undefined && elemFound && snippet.offsetTop !== newSnippet.offsetTop)
      break;
    snippet = newSnippet;
    i += 1;
  }
  return snippet;
}

function showRequestedSnippet(requested) {
  let req = undefined;
  if (requested !== undefined) {
    if (requested === requestedSnippet) return;
    requestedSnippet = requested;
  }
  req = requestedSnippet;
  if (req === undefined) return;
  const snip = findExpansionTarget(req);
  console.log(snip);
  expandedExplanation =
    $("#hidden-" + req.substring(1))
      .clone(true)
      .addClass("code-snippet");
  expandedExplanation
    .insertAfter(snip).slideDown();
}

$(document).ready(function(){
  // background image on frontpage
  $(".splash").backstretch("{{ site.baseurl }}/resources/img/view-leman-opt2.jpg");

  // tooltips (front page)
  $(".marker").mouseover(() => $("#tip").show());
  $(".marker").mouseout(() => $("#tip").hide());

  $("#source-code").mouseover(() => $(this).find(".toptip").show());
  $("#source-code").mouseout(() => $(this).find(".toptip").hide());

  // get current year and put it in span
  $(".current-year").text(new Date().getFullYear());

  resizeAllSnippetBoxes();

  // expanding code snippets (front page)
  function expandSnippetAction(snippetID) {
    const codeBox = findExpansionTarget(snippetID);
    console.log(codeBox);

    function go() {
      const snippet = $(snippetID).html();

      // for positioning the arrow
      const arrow = $(this).parent().siblings(".code-snippet-arrow");
      const centerPoint = $(this).position().left + $(this).width()/2;
      arrow.css("left", centerPoint);

      const codeSnippetInContainer = codeBox.html();

      if (container.is(":hidden")) {
        arrow.show();
        arrow.addClass("hover");
        codeBox.html(snippet);
        container.slideDown();
      } else if (codeSnippetInContainer == snippet) {
        container.slideUp(() => arrow.hide());
      } else {
        const hgt = $(snippetID).height();
        arrow.addClass("hover");
        codeBox.html(snippet);
        codeBox.animate({height: hgt}, 400);
      }
    }
    return go;
  }

  ["#java-interop", "#type-inference", "#concurrency-distribution", "#traits", "#pattern-matching", "#higher-order-functions"]
    .forEach(it => $(it).click(()=> showRequestedSnippet(it)));

  // truncate main visible news item if it exceeds height of sidebar
  const sideboxHgt = $(".recent-news-items").height();
  const mainboxHgt = $(".newsbox.left").height();
  if (sideboxHgt < mainboxHgt) {
    $(".newsbox.left").height(sideboxHgt);
    $(".shadow").css('display','block');
  }

  //showRequestedSnippet();
});

$(window).resize(resizeAllSnippetBoxes);
$(window).resize(() => showRequestedSnippet());
