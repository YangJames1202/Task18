$ = function (el) { return document.querySelector(el); };
    var data = [];

    function render() {
      $('#result').innerHTML =
        data.map(function(d) { return "<div>" + d + "</div>"; })
          .join('');
    }

    function deal(func, succ) {
      var args = [].slice.call(arguments, 2);
      return function(e) {
        try {
          var arg = args.map(function(item) {
            return typeof item === "function" ? item(e) : item;
          });  
          var result = func.apply(data, arg);
          if (succ != null) {
            succ(result);
          }
        } catch (ex) {
          alert(ex.message);
        }
        render();
      };
    }

    function getInputValue() {
      var numStr = $('input').value;
      if (!validate(numStr)) throw new Error('input error');
      return parseInt(numStr);
    }

    function getClickIndex(e) {
      var node = e.target;
      return [].indexOf.call(node.parentNode.children, node);
    }

    function validate(str) {
      return /^\d+$/.test(str);
    }
    
    function init(){       
        document.getElementById("left-in").onclick = deal([].unshift, null, getInputValue);
        document.getElementById("right-in").onclick = deal([].push, null, getInputValue);
        document.getElementById("left-out").onclick = deal([].shift, window.alert);
        document.getElementById("right-out").onclick = deal([].pop, window.alert);
        document.getElementById("result").onclick = deal([].splice, null, getClickIndex, 1);
    }

    init();