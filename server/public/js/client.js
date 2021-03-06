(function() {

  $(document).ready(function() {
    var launch, sync;
    launch = function() {
      return $.get('/launch');
    };
    sync = function() {
      var host;
      host = $("#hostInput").val();
      $("#syncBtn").prop("disabled", true);
      if (!(host != null) || host === "") {
        return alert("Please specify a server to synchronize with.");
      } else {
        return $.post("/sync", {
          host: host
        }).fail(function() {
          $("#info").html("<div class=\"fail\">Failed to connect to Starbind server at <b>" + host + "</b>.<br/>Please verify the server information is correct and retry.</div>");
          return $("#launchBtn").hide();
        }).done(function() {
          $("#info").html("<div class=\"success\">Successfully synchronized to <b>" + host + "</b></div>");
          return $("#launchBtn").show();
        }).always(function() {
          return $("#syncBtn").prop("disabled", false);
        });
      }
    };
    $("#launchBtn").hide();
    $("#launchBtn").click(function() {
      return launch();
    });
    $("#syncBtn").click(function() {
      return sync();
    });
    return $(window).keydown(function(event) {
      if (event.keyCode === 13) {
        if (!$("#launchBtn").is(":visible")) {
          sync();
        } else {
          launch();
        }
        event.preventDefault();
        return false;
      }
    });
  });

}).call(this);
