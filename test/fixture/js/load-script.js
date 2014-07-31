$.pjax({
  area: '#primary',
  load: { script: true, ignore: ":contains('document.write')" },
  rewrite: function (document, area) {
    var script = document.createElement('script'), element;
    element = script.cloneNode();
    element.src = 'js/test.js';
    document.head.appendChild(element);
    element = script.cloneNode();
    element.innerHTML = "console.notice('inline');";
    document.body.appendChild(element);
    element = script.cloneNode();
    element.innerHTML = "console.notice('area');";
    document.getElementById(area.slice(1)).appendChild(element);
  }
});