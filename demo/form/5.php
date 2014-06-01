<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>pjax demo5</title>
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">

<link rel="stylesheet" href="../lib/normalize.css">
<link rel="stylesheet" href="../lib/style.css">

<style>
#header{
  background: #ee0;
}
#footer{
  background: #0ee;
}
#wrapper{
  background: #e0e;
}
#primary{
  background: #e00;
}
#secondary{
  background: #0e0;
}
#tertiary{
  background: #00e;
}
</style>
<script charset="utf-8" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script charset="utf-8" src="../lib/jquery.pjax.js"></script>
<script>
$(function(){ $.pjax({ area: '#primary', form: 'form.pjax', callback: function(){ga('send', 'pageview', window.location.pathname+window.location.search);} }); });
</script>
<script>
if (!window.ga) {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  
  switch (location.hostname) {
    case 'github.com':
      ga('create', 'UA-43533651-1', 'github.com');
      break;
    case 'falsandtru.github.io':
      ga('create', 'UA-43533651-1', 'falsandtru.github.io');
      break;
    case 'sa-kusaku.sakura.ne.jp':
      ga('create', 'UA-37495394-1', 'sakura.ne.jp');
  }
}
window.ga('send', 'pageview', window.location.pathname+window.location.search);
</script>
</head>
<body>
<div id="container" class="layout-001">
<!-- ----- HEADER ------------------------------------------------------------- -->
<header id="header"><div class="wrapper clearfix">

  <h1>pjax demo</h1>
  <p>header5</p>
  <p>これはpjaxのデモページです</p>

</div></header>
<div id="wrapper" class="wrapper clearfix">
<!-- ----- PRIMARY ------------------------------------------------------------ -->
<div id="primary"><div id="layout"><div class="wrapper clearfix">

  <p>primary5</p>
  <p>pjax enable あアｱ亜</p>
  <ul>
    <li><a href="./">page1 enable</a></li>
    <li><a href="./2.php">page2 enable</a></li>
    <li><a href="./3.php">page3 enable</a></li>
    <li><a href="./4.php">page4 disable</a></li>
    <li><a href="./5.php">page5 disable</a></li>
  </ul>
  <p><?php echo htmlspecialchars(@$_POST['data'], ENT_QUOTES, mb_internal_encoding())?></p>
  <form class="pjax" method="get" action="./2.php">
    <input name="data" type="text" value="pjaxGET送信テスト">
    <input type="submit" value="送信">
  </form>
  <form class="pjax" method="post" action="./3.php">
    <input name="data" type="text" value="pjaxPOST送信テスト">
    <input type="submit" value="送信">
  </form>
  <form method="get" action="./4.php">
    <input name="data" type="text" value="通常GET送信テスト">
    <input type="submit" value="送信">
  </form>
  <form method="post" action="./5.php">
    <input name="data" type="text" value="通常POST送信テスト">
    <input type="submit" value="送信">
  </form>

</div></div></div>
<!-- ----- SECONDARY ---------------------------------------------------------- -->
<div id="secondary"><div class="wrapper clearfix">

  <p>secondary5</p>
  <ul>
    <li><a href="./">page1 enable</a></li>
    <li><a href="./2.php">page2 enable</a></li>
    <li><a href="./3.php">page3 enable</a></li>
    <li><a href="./4.php">page4 disable</a></li>
    <li><a href="./5.php">page5 disable</a></li>
  </ul>

</div></div>
<!-- ----- TERTIARY ----------------------------------------------------------- -->
<div id="tertiary"><div class="wrapper clearfix">

  <p>tertiary5</p>

</div></div>
</div>
<!-- ----- FOOTER ------------------------------------------------------------- -->
<footer id="footer"><div class="wrapper clearfix">

  <p>footer5</p>

</div></footer>
</div>
</body></html>
