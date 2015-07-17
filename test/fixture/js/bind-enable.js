$.pjax({
  bind: function (event, setting, orig, dest) {
    dest.pathname = dest.pathname.replace(/(?:()\.\w+|([^/.]*))$/, '$1.json');
    return {
      url: dest.href,
      dataType: 'json',
      timeout: 2500,
      always: function(){console.log(arguments)}
    };
  },
  rewrite: function(document, area, host, data) {
    if (!data) {return;}
    $('h1', document).text(data.text);
  },
  cache: {
    click: true,
    popstate: true
  }
});