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


const snippetAndExpansionState = {};

// Figure out how the page is laid out so that we know where to place the div
// with the expanded explanations. Find the last element which shares the
// same vertical offset as the one the user clicked on.
function findExpansionTarget(container, elem) {
  const snippets = $("" + container + " .snippet-link");
  const len = snippets.length;
  let i = 0;
  let snippet = undefined;
  let elemFound = false;
  while (i < len) {
    let newSnippet = snippets.get(i);
    if ($(snippet).is(elem)) {
      elemFound = true;
    }
    if (snippet !== undefined && elemFound && snippet.offsetTop !== newSnippet.offsetTop)
      break;
    snippet = newSnippet;
    i += 1;
  }
  return snippet.nextElementSibling;
}

/*
 * toggle: if true, removes the explanation box if it is active and requested
 *         if false, does nothing if the explanation box is active and requested
 */
function showRequestedSnippet(container, requestedSnippetName, toggle) {
  console.log(snippetAndExpansionState);
  const state = snippetAndExpansionState[container];
  const snippetNamesEqual     = requestedSnippetName === state.activeSnippetName;
  const snippetNamesDifferent = !snippetNamesEqual;
  if (state.activeSnippetName !== undefined && (snippetNamesDifferent || snippetNamesEqual && toggle))
    $(state.activeSnippetName).removeClass("bullet-point-active");
  const newExpansionTarget = findExpansionTarget(container, requestedSnippetName)
  if (newExpansionTarget !== state.activeExpansionTarget || snippetNamesDifferent) {
    state.activeSnippetName = requestedSnippetName;
    if (state.activeSnippetExplanation !== undefined) {
      state.activeSnippetExplanation.slideUp("fast", () => {
        state.activeSnippetExplanation.remove();
        state.activeSnippetExplanation.empty();
        $(state.activeExpansionTarget).removeClass("col-md-12").removeClass("code-snippet");
        state.activeExpansionTarget = newExpansionTarget;
        $(state.activeSnippetName).addClass("bullet-point-active")
        state.activeSnippetExplanation = $("#hidden-" + state.activeSnippetName.substring(1)).clone(true);
        $(newExpansionTarget).append(state.activeSnippetExplanation);
        $(newExpansionTarget).addClass("col-md-12").addClass("code-snippet");
        state.activeSnippetExplanation.slideDown("fast");
      });
    } else {
      state.activeExpansionTarget = newExpansionTarget;
      $(state.activeSnippetName).addClass("bullet-point-active")
      state.activeSnippetExplanation =
      $("#hidden-" + state.activeSnippetName.substring(1)).clone(true);
      $(newExpansionTarget).append(state.activeSnippetExplanation);
      $(newExpansionTarget).addClass("col-md-12").addClass("code-snippet");
      state.activeSnippetExplanation.slideDown("fast");
    }
  } else if (state.activeSnippetName !== undefined && snippetNamesEqual && toggle) {
    state.activeSnippetExplanation.slideUp("fast", () => {
      state.activeSnippetExplanation.remove();
      state.activeSnippetExplanation.empty();
      $(state.activeExpansionTarget).removeClass("col-md-12").removeClass("code-snippet");
      state.activeSnippetName = undefined;
      state.activeSnippetExplanation = undefined;
      state.activeExpansionTarget = undefined;
    });
  }
}

function refreshPositionOfExpandedSnippets() {
  for (let elem in snippetAndExpansionState)
    showRequestedSnippet(elem, snippetAndExpansionState[elem].activeSnippetName, false);
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

  ["#nutshell", "#editors", "#tooling"].forEach(
    cat => snippetAndExpansionState[cat] = { activeSnippetName: undefined, activeSnippetExplanation: undefined, activeExpansionTarget: undefined });

  ["#java-interop", "#expressive", "#concurrency-distribution", "#traits", "#pattern-matching", "#higher-order-functions"]
    .forEach(it => $(it).click(()=> showRequestedSnippet("#nutshell", it, true)));

  ["#eclipse", "#intellij", "#emacs", "#sublime", "#atom", "#vim"]
    .forEach(it => $(it).click(()=> showRequestedSnippet("#editors", it, true)));

  ["#sbt", "#stylelint", "#compat"]
    .forEach(it => $(it).click(()=> showRequestedSnippet("#tooling", it, true)));

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
$(window).resize(refreshPositionOfExpandedSnippets);
