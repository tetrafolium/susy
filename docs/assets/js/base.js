window.Herman = (function(t, a) {
  "use strict";
  var e = {
    SPACE: 32,
    ENTER: 13,
    TAB: 9,
    ESC: 27,
    BACKSPACE: 8,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    CAPS: 20,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46,
    COMMA: 44
  };
  return (t.initializeToggles = function() {
    var t = a("body");
    t.on("toggle:close", '[data-toggle="button"]', function() {
      var t = a(this).attr("aria-controls"),
        e = a('[data-target-id="' + t + '"]');
      a(
        '[data-toggle="button"][aria-controls="' + t + '"][aria-pressed="true"]'
      ).attr("aria-pressed", "false"), e.trigger("target:close");
    }), t.on("toggle:open", '[data-toggle="button"]', function() {
      var t = a(this),
        e = t.attr("aria-controls"),
        r = a('[data-target-id="' + e + '"]'),
        o = a('[data-toggle="button"][aria-controls="' + e + '"]').not(t);
      t.data("toggle-synced")
        ? o.filter('[data-toggle-synced="true"]').attr("aria-pressed", "true")
        : o
            .filter('[aria-pressed="true"]')
            .attr(
              "aria-pressed",
              "false"
            ), t.attr("aria-pressed", "true"), r.trigger("target:open");
    }), t.on("target:close", '[data-toggle="target"]', function(t) {
      var e = a(this);
      a(t.target).is(e) && e.attr("aria-expanded", "false");
    });
    var e = 0,
      r = function(t) {
        var e = t.attr("data-target-id"),
          r = a(
            '[data-toggle="button"][aria-controls="' +
              e +
              '"][aria-pressed="true"]'
          );
        r.length ? r.trigger("toggle:close") : t.trigger("target:close");
      },
      o = function(e, o) {
        var i = this.attr("data-target-id"),
          n = a(o.target);
        (this.data("auto-closing-on-any-click") ||
          !n.closest(this).length ||
          n.closest('[data-close-toggle="' + i + '"]').length) &&
          (t.off(e), r(this));
      };
    t.on("target:open", '[data-toggle="target"]', function(r) {
      var i = a(this);
      if (
        a(r.target).is(i) &&
        (i.attr("aria-expanded", "true"), i.data("auto-closing"))
      ) {
        var n = "click.toggle_" + (e += 1);
        t.on(n, o.bind(i, n));
      }
    }), t.on("click", '[data-toggle="button"]', function(t) {
      t.preventDefault();
      var e = a(this);
      "true" === e.attr("aria-pressed")
        ? e.trigger("toggle:close")
        : e.trigger("toggle:open");
    }), t.on("click", '[data-toggle="close"]', function(t) {
      t.preventDefault();
      var e = a(this).attr("aria-controls"),
        o = a('[data-target-id="' + e + '"]');
      r(o);
    });
  }), (t.initializeTabs = function() {
    var t = a("body"),
      r = function(t) {
        var e = t.attr("data-tab-group");
        return a('[role="tab"][data-tab-group="' + e + '"]');
      },
      o = function(t) {
        var e = t.attr("data-tab-group");
        return a('[role="tabpanel"][data-tab-group="' + e + '"]');
      },
      i = function(t) {
        var a = r(t),
          e = o(t),
          i = e.filter('[aria-labelledby="' + t.attr("id") + '"]');
        t.attr({ tabindex: 0, "aria-selected": !0 }), a
          .not(t)
          .attr("tabindex", -1)
          .removeAttr("aria-selected"), i
          .removeAttr("aria-hidden")
          .trigger("visible"), e.not(i).attr("aria-hidden", !0), t.trigger(
          "tab:active"
        );
      };
    t.on("tabs:close", '[role="tab"]', function() {
      var t = a(this),
        e = r(t),
        i = o(t);
      e
        .attr("tabindex", -1)
        .removeAttr("aria-selected"), i.attr("aria-hidden", !0);
    }), t.on("click", '[role="tab"]', function(t) {
      t.preventDefault(), i(a(this));
    }), t.on("keydown", '[role="tab"]', function(t) {
      var o = a(this),
        n = r(o),
        g = n.index(o),
        l = g;
      switch (t.keyCode) {
        case e.LEFT:
          l = g > 0 ? g - 1 : g;
          break;
        case e.RIGHT:
          l = g + 1;
      }
      var s = n.eq(l);
      g !== l && s.length && (i(s), s.focus());
    });
  }), (t.initializeIframes = function() {
    var t = function(t) {
        t.contentWindow.document.body &&
          (t.height = t.contentWindow.document.body.scrollHeight);
      },
      e = function() {
        a("iframe").each(function() {
          t(this);
        });
      };
    e(), a("iframe").on("load", function() {
      t(this);
    }), a(window).on("resize", e);
  }), t;
})(window.Herman || {}, window.jQuery);
