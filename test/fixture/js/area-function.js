$.pjax({
  area: function (event, param, origUrl, destUrl) {
    switch (true) {
      case 'object' !== typeof event:
      case 1 !== param:
      case location.href !== origUrl:
      case destUrl == origUrl:
        return;
    }
    return ['.chooseA, .chooseB, .chooseC', '.chooseA', '.chooseB', '.chooseC'];
  },
  param: 1
});