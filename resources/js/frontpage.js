---
---

function resizeAllSnippetBoxes() {
  var snippetIds = ["#nutshell", "#platforms", "#tooling"];
  snippetIds.forEach(function(id) {resizeSnippetBoxesIn(id)});
}

function resizeSnippetBoxesIn(id) {
  // Exclude the heading
  var snippets = $(id + " .bullet-point").not(".col-md-12");

  // same height hack for scala in a nutshell boxes
  function makeAllBoxesSameHeight(boxes) {
    boxes.map(function() { $(this).css('height', 'auto'); });
    maxHeight = Math.max.apply(
      Math, boxes.map(function() {
          return $(this).height();
    }).get());
    //console.log('resized to ' + maxHeight);
    boxes.height(maxHeight);
  }

  makeAllBoxesSameHeight(snippets);
}

$(document).ready(function(){
  // background image on frontpage
  $(".splash").backstretch("{{ site.baseurl }}/resources/img/view-leman-opt2.jpg");

  // tooltips (front page)
  $(".marker").mouseover(function(){ $("#tip").show(); });
  $(".marker").mouseout(function(){ $("#tip").hide(); });

  $("#source-code").mouseover(function(){ $(this).find(".toptip").show(); });
  $("#source-code").mouseout(function(){ $(this).find(".toptip").hide(); });
  $("#scala-lang-twitter").mouseover(function(){ $(this).find(".toptip").show(); });
  $("#scala-lang-twitter").mouseout(function(){ $(this).find(".toptip").hide(); });

  // get current year and put it in span
  var currYear = new Date().getFullYear()
  $(".current-year").text(currYear);

  resizeAllSnippetBoxes();

  // expanding code snippets (front page)
  function expandSnippetAction(snippetID, container) {
    var codeBox = container.find(".row");

    function go() {
      var snippet = $(snippetID).html();

      // for positioning the arrow
      var arrow = $(this).parent().siblings(".code-snippet-arrow");
      var centerPoint = $(this).position().left + $(this).width()/2;
      arrow.css("left", centerPoint);

      var codeSnippetInContainer = codeBox.html();

      if (container.is(":hidden")) {
        arrow.show();
        arrow.addClass("hover");
        codeBox.html(snippet);
        container.slideDown();
      } else if (codeSnippetInContainer == snippet) {
        container.slideUp(function() {
          arrow.hide();
        });
      } else {
        var hgt = $(snippetID).height();
        arrow.addClass("hover");
        codeBox.html(snippet);
        codeBox.animate({height: hgt}, 400);
      }
    }
    return go;
  }

  var row1 = $("#code-snippet-row1");
  var row2 = $("#code-snippet-row2");
  var row3 = $("#code-snippet-row3");
//var row4 = $("#code-snippet-row4");
  var row5 = $("#code-snippet-row5");
  var row6 = $("#code-snippet-row6");
  var row7 = $("#code-snippet-row7");

  $("#java-interop").click(expandSnippetAction("#hidden-java-interop", row1));
  $("#type-inference").click(expandSnippetAction("#hidden-type-inference", row1));
  $("#concurrency-distribution").click(expandSnippetAction("#hidden-concurrency-distribution", row1));

  $("#traits").click(expandSnippetAction("#hidden-traits", row2));
  $("#pattern-matching").click(expandSnippetAction("#hidden-pattern-matching", row2));
  $("#higher-order-functions").click(expandSnippetAction("#hidden-higher-order-functions", row2));

/*
  $("#jvm").click(expandSnippetAction("#hidden-jvm", row4));
  $("#browser").click(expandSnippetAction("#hidden-browser", row4));
  $("#android").click(expandSnippetAction("#hidden-android", row4));
*/

  // arrow color hack for hover-overs
  function arrowMouseover(snippetID, container) {

    function go() {
      var codeSnippetInContainer = container.find(".row").html();
      var snippet = $(snippetID).html();
      if (codeSnippetInContainer == snippet) {
        var arrow = $(this).parent().siblings(".code-snippet-arrow");
        arrow.addClass("hover");
      }
    }
    return go;
  }
  function arrowMouseout() {
    var arrow = $(this).parent().siblings(".code-snippet-arrow");
    arrow.removeClass("hover");
  }

  $("#java-interop").hover(arrowMouseover("#hidden-java-interop", row1), arrowMouseout);
  $("#type-inference").hover(arrowMouseover("#hidden-type-inference", row1), arrowMouseout);
  $("#concurrency-distribution").hover(arrowMouseover("#hidden-concurrency-distribution", row1), arrowMouseout);

  $("#traits").hover(arrowMouseover("#hidden-traits", row2), arrowMouseout);
  $("#pattern-matching").hover(arrowMouseover("#hidden-pattern-matching", row2), arrowMouseout);
  $("#higher-order-functions").hover(arrowMouseover("#hidden-higher-order-functions", row2), arrowMouseout);

/*
  $("#jvm").hover(arrowMouseover("#hidden-jvm", row4), arrowMouseout);
  $("#browser").hover(arrowMouseover("#hidden-browser", row4), arrowMouseout);
  $("#android").hover(arrowMouseover("#hidden-android", row4), arrowMouseout);
*/

  // truncate main visible news item if it exceeds height of sidebar
  var sideboxHgt = $(".recent-news-items").height();
  var mainboxHgt = $(".newsbox.left").height();
  if (sideboxHgt < mainboxHgt) {
    $(".newsbox.left").height(sideboxHgt);
    $(".shadow").css('display','block');
  }
});

$(window).resize(resizeAllSnippetBoxes);
