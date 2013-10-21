#pjax
pjaxはデータの読み込みと描画の冗長部分を省略することで非常に高速かつ低コストなページ移動を実現する、HTML5で実装される高速ブラウジング機能です。

また、キャッシュ機能によりサーバーへのアクセスと負荷を軽減することで、高性能なサーバーでなくとも多くのPVアクセスを処理することが可能になります。

##概要
サイト内のページ移動において指定したHTML要素（異なるコンテンツを持つ範囲）のみ更新することでページ移動を高速化します。
たとえば、このサイトのpjaxによるトップページへのページ移動時間は、ajaxによりサーバーからデータを取得した場合でも最短で100-200ミリ秒しかかかりませんが、pjaxのキャッシュ機能を有効にした場合のページ移動時間はわずか**20-30ミリ秒（0.02-0.03秒）**です。

このpjaxプラグインは数行のコードを追加するだけでサーバーに手を加えることなく簡単に導入することができます。また、既存のサイト構造やHTMLのクラス名を変更する必要もありません。Wordpressにも10分ほどで導入できます。

<small>※Windows7 + Google Chromeでの例です。</small>
<small>※インストール直後のWordpressでは、ajaxで500ミリ秒、キャッシュで10ミリ秒となりました（サーバーはロリポップを使用）。</small>
<small>※このサイトではブラウザのコンソールにページ移動にかかった時間を出力しており、コンソールからユーザーが実際にページ移動にかかった時間を見ることができます。</small>
<small>※<span class="underline">動作テストのためpjaxが正常に動作していないことがあります。</span>恐縮ですがその際は時間をおいて再度ご覧ください。</small>

##特徴

+ jQuery 1.4.2から動作します。
+ サーバー側の設定やコードのインストール等の作業が不要です。
+ CSSとJavaScriptの自動読み込みが可能です。
+ 詳細な動作制御が可能で幅広い要求に対応できます。
+ pjax(pushState + ajax)で一般的に発生する問題に対応しています。

##対応

+ CSSの読み込み
+ JavaScriptの読み込み
+ Android・iOSでの使用
+ フォームのsubmitによるページ遷移
+ Google Analytics によるアクセス解析
+ Wordpressへの導入
+ pjaxを使用するURLの範囲の設定
+ 更新範囲の動的設定
+ 複数範囲の更新
+ 文字コードの異なるページの読み込み
+ サーバーからの差分データによるページ更新
+ キャッシュによるページ更新
+ ローディングエフェクトの表示
+ spage( http://sa-kusaku.sakura.ne.jp/output/spage/ )とのキャッシュの共有
+ validator( http://sa-kusaku.sakura.ne.jp/output/validator/ )によるユーザー環境下でのエラー検出

##pjaxの問題への対応
pushStateないしreplaceStateとajaxを組み合わせたいわゆるpjaxと呼ばれる機能には下記のような問題が存在しています。当pjaxプラグインはこれらを解消するための処理を組み込み済みです。

|項目|対応|
|:---|:--:|
|locationオブジェクトの更新<small>※1</small>|○|
|間違った履歴の修復<small>※2</small>|○|
|スクロール位置の復元<small>※3</small>|○|

<small>※1 **AndroidとiOSでは`location`オブジェクトが`pushState`を使用しても更新されず、ブラウザのアドレスバーに表示されるURLと`location.href`により取得するURLが一致しない**バグが報告されています。defunkt版でもアドレスバーのURLと`location.href`が別のページを指しています。この問題は下の比較用デモで確認できます。当プラグインではこの問題を独自の方法で解決しています。この問題が解決されていなかった場合、ページのURLを参照するすべてのスクリプトが正常に動作できなくなり致命的なバグが発生する可能性があるため十分注意してください。Google Analytics などは間違ったアクセスログを生成することになります。</small>  
<small>※2 **pjaxにはajax通信が強制終了されたページのタイトルが直近の正常に表示されたページのタイトルで上書きされ、間違った履歴が記録される**問題があります。この問題はpjaxにより2回以上ページ移動後、ページをリロードしブラウザの戻るボタンでページを読み込む時間を与えず2回以上ページを戻ることで確認できます。当プラグインではこの問題をブラウザに内蔵されているデータベースを利用することでほぼ解決しています（Firefoxでは何度も修復を繰り返すと修復されにくくなっていくような挙動をする問題がありますが通常の使用の範囲であれば正常に修復されると思われます）。</small>  
<small>※3 **pjaxにはブラウザの戻る/進む機能によりページを移動した場合に移動先ページの直前のスクロール位置が復元されないことがある**問題があります。この問題はたとえば3000pxスクロールしているページから高さが1000pxのページに移動して前のページに戻ると1000px付近までしかスクロールされないといった形で確認できます。当プラグインではこの問題をブラウザに内蔵されているデータベースを利用することでほぼ解決しています（Firefoxでは何度も補正を繰り返すと補正されにくくなっていくような挙動をする問題がありますが通常の使用の範囲であれば正常に補正されると思われます）。</small>

#defunkt版との比較
このpjaxプラグインは独自に開発されており、本家defunkt版の派生ではないため仕様が異なります。
defunkt版（v1.7.0/2013年6月現在最新版）との主な違いは次のとおりです。

|項目|defunkt版|falsandtru版|
|:---|:-------:|:----------:|
|jQueryバージョン対応|1.8.x|1.4.2|
|Android・iOSへの対応<br><small>locationオブジェクトの更新</small>|**×**|○|
|Android・iOSへの対応<br><small>スクロール位置の操作※1</small>|×|○|
|間違った履歴の修復|**×**|○|
|スクロール位置の復元|**×**|○|
|ページ移動方法の自動切替<br><small>HTML以外のコンテンツへのアクセス※2</small>|×|○|
|JavaScriptの実行順序維持<small>※3</small>|×|○|
|JavaScriptの読み込み<br><small>埋め込み型</small>|×|○|
|CSSの読み込み|×|○|
|キャッシュ制御<small>※4</small>|×|○|
|キャッシュ無効化|×|○|
|キャッシュ作成タイミング<small>※5</small>|ページ離脱時|ページ取得時|
|pjaxを使用するURLの範囲の設定|×|○|
|更新範囲の動的設定|×|○|
|複数領域の更新|×|○|
|ユーザー定義関数の実行形式|イベント|コールバック＋イベント|
|ユーザー定義関数の設定箇所|9|29+3|
|部分的更新キャンセル<small>※6</small>|×|○|
|比較用デモ<small>※7</small>|defunkt|falsandtru|

defunkt: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/defunkt/  
falsandtru: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/falsandtru/

<small>※1 AndroidとiOSではページ移動時にjQueryの`scrollTop`メソッドでスクロール位置を操作できず、当プラグインではjQueryMobileと同じく`scrollTo`メソッドを使用することでこの問題を解決しています。**defunkt版では`scrollTop`メソッドを使用しているためAndroidとiOSでスクロール位置を操作できません**。</small>  
<small>※2 リンク先がJavaScriptなどHTMLページ以外を参照していた場合にContent-Typeを参照してページ移動方法を自動的にpjaxから通常のものに切り替えます。defunkt版ではこの機能がないためJavaScriptなど誤作動を起こすリンクでpjaxが動作しないよう`"a:not([href$='.js'])"`のようにリンクの絞込みを行う必要があります。</small>  
<small>※3 defunkt版のDOMオブジェクトの生成によるJavaScriptの動的読み込みはオライリーの｢続・ハイパフォーマンスWebサイト｣で実行順序が維持されない読込方法に分類されています。</small>
<small>※4 キャッシュの無効化、有効期限の設定など。</small>  
<small>※5 defunkt版はキャッシュをページ離脱時に作成するためフォームの入力状態などページ(DOM)の状態を保持しますが、ページをリロードしなければページを初期状態に戻すことはできません。なお、入力状態などを保持する目的であればpjaxを使用せず通常のページ移動を行うかサーバー側で状態を保存するべきです。</small>  
<small>※6 タイトルやURLなどの更新を個別にキャンセルできます。コールバック関数を非同期に実行している場合はキャンセルできません。</small>  
<small>※7 defunkt版は非対応の複数領域の更新を無理やりさせようとしているため更新部分の表示がバグってます。</small>  

##使用法

###jQuery
v1.7.2の使用を推奨します。
v1.4.2から動作します。

###Register

####*$.pjax( Parameter as object )*
リンクにpjaxを登録します。`document`オブジェクトにデリゲートを設定します。

```javascript
$.pjax({ area: '.container' });
```

####*$.fn.pjax( Parameter as object )*
コンテキストに含まれるリンクにのみpjaxを登録します。コンテキストにデリゲートを設定します。
`link`パラメータと`form`パラメータはコンテキストにより絞り込まれますが、`area`パラメータは絞り込まれません。

```javascript
$('.delegate').pjax({ area: '.container' });
```

###Parameter
パラメータはすべてパラメータ用オブジェクトのプロパティに設定して渡します。パラメータとなるオブジェクトのプロパティは次のとおりです

####*gns: Namespace as string*
グローバルネームスペースです。通常は設定は不要です。

####*ns: Namespace as string*
ネームスペースです。ネームスペースを設定する場合はこちらを使用してください。

####*area: Selector as string / function( event, url )<span class="red font-default">（必須）</span>*
pjaxにより更新する範囲（HTML要素）をjQueryセレクタで設定します。
`$.fn.pjax`により設定されたコンテキストで絞り込まれません。

#####*area: Selector as string*
文字列により更新する範囲を設定します。

#####*area: Selector as function( event, url )*
関数の戻り値により更新する範囲を動的に設定します。

####*link: Selector as string*
pjaxによりページ移動を行うリンク（アンカータグ）をjQueryセレクタで選択します。
初期値は、`href`属性の値が`/`で始まり、`target`属性がない`anchor`要素です。ルートパス以外のリンクは対象外となっています。
`$.fn.pjax`で使用された場合は設定されたコンテキスト内で選択されます。

####*form: Selector as string*
pjaxによりページ移動を行うフォーム（フォームタグ）をjQueryセレクタで選択します。
初期値は`null`でpjaxはフォームによるページ移動に使用されません。
`$.fn.pjax`で使用された場合は設定されたコンテキスト内で選択されます。

####*scope: Scope as object*
pjaxによりページ移動を行う（pjaxを適用する）ページの範囲をURL（ルートパス）で設定します。範囲をディレクトリで設定した場合はサブディレクトリも範囲に含まれます。設定はサブディレクトリで上書きできます。初期値は`null`で無効です。

pjaxによるページ移動を`http://example.com/pjax/`ディレクトリ内でのみ有効にする場合は`{'/pjax/': ['/pjax/']}`とします。

先頭に`^`を付加することで否定表現となり、サブディレクトリ（`http://example.com/pjax/except/`）でpjaxを無効にする場合は`{'/pjax/': ['/pjax/', '^/pjax/except/'], '/pjax/except/': false}`とします。無効を指定する値には偽と評価される値と空配列が使用できます。`http://example.com/a/`から`http://example.com/b/`への移動のみ有効にする場合は`{'/a/': ['/b/']}`と、双方向で有効にする場合は`{'/a/': ['/a/', '/b/'], '/b/': ['/a/', '/b/']}`とします。
先頭に`*`を付加することで正規表現となり、`{'/a/': ['/a/', '/b/'], '/b/': ['/a/', '/b/']}`は`{'/a/': ['*/[ab]/'], '/b/': ['*/[ab]/']}`と同義です。

`'rewrite'`を配列に加えるとscope.rewriteに定義した関数によりハッシュテーブルでキーとして使用される文字列を一度だけ書き換えることができます。

`'inherit'`を配列に加えると直近の適用条件に一致するものがなかった場合に一階層上の条件を継承します。ディレクトリ上で複数階層開きがあっても継承されます。

####*state: any / function( event, url )*
`pushState`の第一引数として渡す値を設定します。関数が設定された場合は戻り値が渡されます。初期値は`null`です。

####*scrollTop: Position as number / null / function( event )*
リンクまたはフォームによるページ移動後の縦方向のスクロール位置を設定します。`null`を設定すると移動前のスクロール位置を維持します。関数を設定すると戻り値がスクロール位置となります。初期値は`0`です。

####*scrollLeft: Position as number / null / function( event )*
リンクまたはフォームによるページ移動後の横方向のスクロール位置を設定します。`null`を設定すると移動前のスクロール位置を維持します。関数を設定すると戻り値がスクロール位置となります。初期値は`0`です。

####*scroll: node*
スクロール位置の復元のためのスクロール位置の記録間隔にかかる設定項目を持ちます。

#####*delay: Millisecond as number*
スクロール位置の記録処理がスクロールイベント発生後実行されるまでの待機時間をミリ秒で設定します。待機時間が経過する前に新たなスクロールが行われた場合は前回までのスクロールによる待機中の処理の実行はキャンセルされます。初期値は`500`です。パラメータの詳細な仕様はdisplaytriggerの同名のパラメータを確認してください。

#####*suspend: Millisecond as number*
スクロールイベントの発生後、スクロールイベントの発生を抑制する時間をミリ秒で設定します。設定値を0にするとイベントが抑制されません。初期値は`-100`です。パラメータの詳細な仕様はdisplaytriggerの同名のパラメータを確認してください。

###*ajax: object*
pjaxで内部的に使用される`$.ajax`のオプションを設定します。`$.ajax`のコールバック関数はすべて上書きされるため使用できません。代わりに`callbacks.ajax`で設定できるのでこちらを使用してください。

###*contentType: string*
移動先として読み込むデータで許容するコンテントタイプをカンマまたはセミコロン区切りの文字列で設定します。初期値は`text/html`です。

###*load: node*
pjaxによるページ読み込み時のCSSとJavaScriptを読み込みにかかる設定項目を持ちます。
`load.css`と`load.script`を有効にすることで、ページ別にCSSやJavaScriptが存在するサイトでも配置や構成を変えることなくpjaxを導入することができます。

####*load.css: boolean*
pjaxによるページ読み込み時にCSSを読み込むかを設定します。初期値は`false`で読み込みません。

読み込まれるページの、現在のページに存在しないすべてのCSS（`link rel="stylesheet"`要素および`style`要素）を読み込みます。読み込まれるページに存在しないCSSは削除されます。読み込まれたCSSはすべてDOMの`head`要素末尾のノードとして追加されます。

####*load.script: boolean*
pjaxによるページ読み込み時にJavaScriptを読み込むかを設定します。初期値は`false`で読み込みません。

読み込まれるページの、現在のページに存在しないすべてのJavaScript（`script`要素）を読み込みます。外部ファイル以外の形式のJavaScriptは同一の内容であっても再度読み込まれます。jQueryの仕様により、JavaScriptは読み込まれていてもDOMに追加されません。

pjaxによるJavaScriptの実行順序は、HTML上の記述順序（通常の読み込み順序）と同じであることが保障されません。外部ファイル形式のJavaScriptと埋め込み形式のJavaScriptでは実行タイミングが異なるため、同一形式間内での実行順序は保たれますが、異なる形式間での実行順序は保たれません。また、埋め込み形式のJavaScriptの実行はすべての外部ファイル形式のJavaScriptの実行を待ってから行われます。このため、外部ファイル形式のJavaScriptが実行される前に埋め込み形式のJavaScriptがすでに実行されていなければならないような設計は避ける必要があります。

ページの表示直後にすべて実行されている必要のないJavaScriptは、ページ読み込み時に一括で実行せずdisplaytriggerにより随時実行することで負荷を削減することを推奨します。ページの表示直後にすべて読み込まれている必要のないコンテンツについても同様です。

####*load.execute: boolean*
JavaScriptの読み込みが有効になっている場合に埋め込み型のJavaScriptを実行するかを設定します。初期値は`true`で有効です。

####*load.sync: boolean*
`defer`属性を持つJavaScript（`script`要素）の非同期読み込みを、pjaxによるコンテンツの更新の描画を待ってから行います。初期値は`true`で有効です。

`load.sync`による同期（的）処理は、JavaScriptの読み込み処理を同期的に開始できるように実行タイミングを調整して行うものであり、pjaxによるCSSとJavaScriptの読み込み処理自体は`load.sync``load.async`の設定にかかわらずすべて非同期で行われます。

####*load.async: Millisecond as number*
CSSとJavaScript（`script`要素）の非同期読み込みをpjaxによるコンテンツの更新の描画を待たずに開始する、コンテンツの更新からの経過時間（遅延時間）をミリ秒で設定します。初期値は`0`です。

###*interval: Millisecond as number*
pjaxにより更新されたコンテンツの描画の確認を行う間隔をミリ秒で設定します。初期値は`300`です。

###*cache: node*
pjaxによるページ読み込み時のキャッシュの使用にかかる設定項目を持ちます。
独自に作成したキャッシュを使用することでサーバーと通信を行わずにページを移動することができるため、サーバーへのアクセスと負荷を軽減することができます。また、サーバーへのリクエスト時にキャッシュが使用されることはないため、リロードによる最新のデータへのアクセスを妨げません。ページに期限が設定されキャッシュされるよう設定されている場合はブラウザのキャッシュ機能が使用できるためpjaxのキャッシュ機能は無効にすることを推奨します。キャッシュはページを閉じるか通常のページ移動などによりJavaScriptの実行状態がリセットされるまで保持されます。初期設定では無効です。

####*cache.click: boolean*
リンクのクリックによるページ移動にキャッシュを使用するかを設定します。初期値は`false`で無効です。

####*cache.submit: boolean*
フォームの送信によるページ移動にキャッシュを使用するかを設定します。初期値は`false`で無効です。

####*cache.popstate: boolean*
ブラウザの操作によるページ移動にキャッシュを使用するかを設定します。初期値は`false`で無効です。

####*cache.get: boolean*
フォームのGET送信により取得したページをキャッシュするかを設定します。初期値は`true`で有効です。

####*cache.post: boolean*
フォームのPOST送信により取得したページをキャッシュするかを設定します。初期値は`true`で有効です。

####*cache.length: number*
キャッシュを保持するページ数の上限を設定します。初期値は`9`です。

####*cache.size: Byte as number*
キャッシュを保持するデータサイズの上限をバイト数で設定します。初期値は`1048576`(1MB)です。

####*cache.expire: Millisecond as number*
キャッシュの有効期限をミリ秒で設定します。初期値は`1800000`(30分)です。

###*wait: Millisecond as number*
`$.ajax`の実行からコンテンツの更新までの最低待ち時間を設定します。jQuery 1.5より前のバージョンでは無効です。初期値は`0`です。

###*fallback: boolean / function( event, url )*
pjaxによるページ移動が失敗した場合の対応を行うかを設定します。初期状態では代替処理として通常のページ移動が行われます。関数が設定された場合は代替処理が当該関数により上書きされます。処理はエラーにかかるコールバック関数を実行後に行われます。初期値は`true`で有効です。

###*fix: node*
pjaxの諸問題の修正にかかる設定項目を持ちます。

####*location: boolean*
`location`オブジェクトを更新するかを設定します。初期値は`true`で有効です。

####*history: boolean*
履歴を修復するかを設定します。`database`パラメータによりデータベースの使用が許可されていなければなりません。初期値は`true`で有効です。

####*scroll: boolean*
スクロール位置を復元するかを設定します。`database`パラメータによりデータベースの使用が許可されていなければなりません。初期値は`true`で有効です。

###*database: boolean*
Indexed Databaseの使用をするかを設定します。データはデータ数が1000を超えるたびに最後のアクセスから3日（72時間）以上経過したデータが削除（削除後もデータ数が1000を超えている場合はすべてのデータを削除）され、データベースは暦日で7日ごとに日付変更後最初の`$.pjax()`実行時に初期化されます。データベースのサイズは最大1MB以下を見積もっています。初期値は`true`で有効です。

###*server: node*
サーバーとの通信にかかる設定項目を持ちます。

###*server.query: Query as string*
pjaxによるサーバーへリクエストではページのURLにpjaxによるリクエストであることを通知するためのクエリ名が追加されており、このクエリ名を設定します。このクエリは内部処理でのみ使用されるためサイトの閲覧者の目に触れることはありません。初期値は`gns`の設定値と同じであり、`?pjax=1`のようにクエリが付加されます。

###*callback: function( event, parameter, data, dataType, XMLHttpRequest )*
ページ移動後に実行されるコールバック関数を設定します。ページの更新処理が成功したときに`update.complete( event, parameter, data, dataType, XMLHttpRequest )`の直後に実行されます。`callback``callbacks`ともに`callbacks.async`に`true`を設定することでコールバック関数の実行を非同期に行えます。コールバック関数を非同期で実行することで処理を高速化することができますが、戻り値に`false`を設定することによる処理のキャンセルができなくなります。

###*parameter: any*
すべてのコールバック関数に共通で渡されるパラメータを設定します。

###*callbacks: object*
内部の各タイミングにおいて実行されるコールバック関数を設定します。コールバック関数にはイベントの発生もとのオブジェクトがコンテキストとして与えられます。
`ajax`を除くすべてのコールバック関数は戻り値に`false`を設定することで現在の処理を抜けることができます。`before`では以降の処理をすべてキャンセルします。このときフォールバック処理は`fallback`の設定にかかわらず行われません。`update.any.before``update.any.after`ではページ更新処理のうちanyの示す部分の更新処理をキャンセルないし抜けます。ページ移動でエラーが発生した際に`update.error``update.complete`で処理を抜けるとフォールバック処理が`fallback`の設定にかかわらず行われません。
使用できる`callbacks`のプロパティと渡されるパラメータ、実行タイミングは次のとおりです。

####async
コールバック関数の実行を非同期にするかを設定します。初期値は`false`で無効です。
####before( event, parameter )
コード上の実行順序において最初に実行されます。
####after( event, parameter )
コード上の実行順序において最後に実行されます。
####ajax.xhr( event, parameter )
ajax通信において同名のメソッド内で実行されます。
####ajax.beforeSend( event, parameter, data, dataType )
〃
####ajax.dataFilter( event, parameter, data, dataType )
〃
####ajax.success( event, parameter, data, dataType, XMLHttpRequest )
〃
####ajax.error( event, parameter, XMLHttpRequest, textStatus, errorThrown )
〃
####ajax.complete( event, parameter, XMLHttpRequest, textStatus )
〃
####update.before( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理において最初に実行されます。
####update.after( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理において最後に実行されます。
####update.cache.load.before( event, parameter, cache )
ページの更新処理においてcacheの読み込み前に実行されます。
####update.cache.load.after( event, parameter, cache )
ページの更新処理においてcacheの読み込み後に実行されます。
####update.title.before( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理においてタイトルの更新前に実行されます。
####update.title.after( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理においてタイトルの更新後に実行されます。
####update.content.before( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理においてコンテンツの更新前に実行されます。
####update.content.after( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理においてコンテンツの更新後に実行されます。
####update.css.before( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理においてCSSの読み込み前に実行されます。
####update.css.after( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理においてCSSの読み込み後に実行されます。
####update.script.before( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理においてJavaScriptの読み込み前に実行されます。
####update.script.after( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理においてJavaScriptの読み込み後に実行されます。
####update.rendering.before( event, parameter )
ページの更新処理において更新の反映を契機とする内部イベント処理の実行前に実行されます。
####update.rendering.after( event, parameter )
ページの更新処理において更新の反映を契機とする内部イベント処理の実行後に実行されます。
####update.cache.save.before( event, parameter, cache )
ページの更新処理においてcacheの作成前に実行されます。
####update.cache.save.after( event, parameter, cache )
ページの更新処理においてcacheの作成後に実行されます。
####update.verify.before( event, parameter )
ページの更新処理において更新結果の検証前に実行されます。
####update.verify.after( event, parameter )
ページの更新処理において更新結果の検証後に実行されます。
####update.success( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理が成功したときに実行されます。
####update.error( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理が失敗したときに実行されます。
####update.complete( event, parameter, data, dataType, XMLHttpRequest )
ページの更新処理が完了したときに実行されます。

##Method

###*on()*
pjaxを有効にします。

###*off()*
pjaxを無効にします。

##Property
なし

##Event
pjaxによるページ遷移では通常のページ遷移で発生する`onload`などのイベントが発生しないため、この代替イベントを提供します。

###*pjax.DOMContentLoaded*
`area`で指定された範囲のDOMの更新が完了した時点で`document`オブジェクトから発生します。CSSについてのDOMの更新は完了していません。

###*pjax.ready*
すべてのDOMの更新が完了した時点で`document`オブジェクトから発生します。

###*pjax.load*
すべてのDOMの更新が反映された時点で`window`オブジェクトから発生します。画像の表示状態は考慮されません。

#記述例


##導入
シンプルな実行例です。リンクをクリックするとPrimaryのみ更新されます。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/install/

```javascript
$.pjax({ area: 'div.pjax' });
```

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta http-equiv="content-language" content="ja">
<title>pjax</title>
<script type="text/javascript" charset="utf-8" src="/lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/lib/jquery.pjax.min.js"></script>
<script type="text/javascript">
$(function(){
  $.pjax({ area: 'div.pjax' });
});
</script>
<style type="text/css">

/* 省略 */

</style>
</head>
<body>
  <div id="container">
    <div id="header">
      <div class="layout">
        <p>header1</p>
        <p>pjax demo</p>
      </div>
    </div>
    <div id="wrapper" class="clearfix">
      <div class="layer">
        <div class="primary pjax">
          <div class="layout">
            <p>primary1</p>
            <p>pjax enable あアｱ亜</p>
            <ul>
              <li><a href="/output/pjax/demo/install/">page1 enable</a></li>
              <li><a href="/output/pjax/demo/install/2.html">page2 enable</a></li>
              <li><a href="/output/pjax/demo/install/3.html">page3 enable</a></li>
            </ul>
          </div>
        </div>
        <div class="secondary">
          <div class="layout">
            <p>secondary1</p>
            <ul>
              <li><a href="/output/pjax/demo/install/">page1 enable</a></li>
              <li><a href="/output/pjax/demo/install/2.html">page2 enable</a></li>
              <li><a href="/output/pjax/demo/install/3.html">page3 enable</a></li>
            </ul>
          </div>
        </div>
        <div class="tertiary">
          <div class="layout">
            <p>tertiary1</p>
          </div>
        </div>
      </div>
    </div>
    <div id="footer">
      <div class="layout">
        <p>footer1</p>
        
      </div>
    </div>
  </div>
</body>
</html>
```

###更新範囲 - area
pjaxによる更新範囲を設定します。次のように複数の範囲を同時に更新することもできます。双方のページで更新範囲が一致していないか更新先のページに更新範囲がひとつもない場合はエラーとなり例外処理が実行されます。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/area/

```javascript
  $.pjax({ area: 'div.primary.pjax, div.tertiary.pjax' });
```

###フォーム - form
pjaxでフォームの送信によるページ遷移を行います。キャッシュ有効時は初期設定ではPOST送信結果もキャッシュされることに注意してください。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/form/

```javascript
  $.pjax({ area: 'div.pjax', form: 'form.pjax' });
```

###リンク - $.fn.pjax, link
pjaxによりページ移動を行うリンクを選択します。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/fn/

```javascript
  $('div.primary.pjax').pjax({
    area: 'div.primary.pjax'
  });
```

`$.fn.pjax`のコンテキストにpjaxの`area`パラメータの子孫要素（pjaxによる更新範囲内）を設定することはできません。pjaxによりページ移動を行うリンクをpjaxによる更新範囲内にあるリンクから選択するには`link`パラメータを使用してください。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/link/

```javascript
  // NG
  $('div.primary.pjax li').pjax({
    area: 'div.primary.pjax'
  });
```

```javascript
  // OK
  $('div.primary.pjax').pjax({
    area: 'div.primary.pjax' ,
    link: 'li a:not([target])[href^="/"]'
  });
```

###適用範囲 - scope
pjaxによりページ移動を行う範囲を設定します。先頭に`^`で否定表現、先頭にまたは否定表現に続けて`*`で正規表現となります。

###特定のページ間の移動のみpjaxを使用する

+ a.html,b.html,c.htmlの間での移動のみpjaxを使用する。

```javascript
  $.pjax({
    area: 'div.pjax',
    scope: {
      '/output/pjax/demo/scope/a.html': ['*/output/pjax/demo/scope/[a-c].html'],
      '/output/pjax/demo/scope/b.html': ['*/output/pjax/demo/scope/[a-c].html'],
      '/output/pjax/demo/scope/c.html': ['*/output/pjax/demo/scope/[a-c].html']
    }
  });
```

####特定のディレクトリ下の移動のみpjaxを使用する

+ pjaxディレクトリ下のページ間での移動のみpjaxを使用する。
+ pjax/exceptディレクトリ下のページは除外、pjaxを使用しない。

```javascript
  $.pjax({
    area: 'div.pjax',
    scope: {
      '/output/pjax/demo/scope/pjax/': ['/output/pjax/demo/scope/pjax/', '^/output/pjax/demo/scope/pjax/except/'],
      '/output/pjax/demo/scope/pjax/except/': false
    }
  });
```

####動的に生成されるディレクトリ下にある特定のページ間の移動のみpjaxを使用する（異なる動的ディレクトリ間の移動を含む）

+ user/*(user/foo,user/bar,etc)ディレクトリのインデックスページ間での移動のみpjaxを使用する。

```javascript
  $.pjax({
    area: 'div.pjax',
    scope: {
      '/output/pjax/demo/scope/user/': ['*/output/pjax/demo/scope/user/[^/]+/([?#][^/]*)?$']
    }
  });
```

####動的に生成されるディレクトリ下にある特定のディレクトリ下の移動のみpjaxを使用する（同一の動的ディレクトリ下の移動のみ）

+ user/*/a,user/*/bディレクトリ下での移動のみpjaxを使用する。
+ 同一の動的ディレクトリ下(user/foo/a,user/foo/b)でのみpjaxを使用し、異なる場合(user/foo/a,user/bar/a)は使用しない。

```javascript
  $.pjax({
    area: 'div.pjax',
    scope: {
      '/output/pjax/demo/scope/user/': ['rewrite'],
      '/output/pjax/demo/scope/user/*/': ['*/output/pjax/demo/scope/user/*/[ab]/'],
      rewrite: function( url ){ return url.replace(/^[^\/]+\/\/[^\/]+/,'').replace(/^(\/output\/pjax\/demo\/scope\/user\/)[^\/]+(\/.*)/, '$1*$2') ; }
    }
  });
```

####複雑な条件の設定例

+ a.html,b.html,c.htmlの間での移動にpjaxを使用する。
+ pjaxディレクトリ下のページ間での移動にpjaxを使用する。
+ pjax/exceptディレクトリ下のページは除外、pjaxを使用しない。
+ user/*(user/foo,user/bar,etc)ディレクトリのインデックスページ間での移動にpjaxを使用する。
+ 同一の動的ディレクトリ下(user/foo/a,user/foo/b)でのみpjaxを使用し、異なる場合(user/foo/a,user/bar/a)は使用しない。
+ 同一の動的ディレクトリ下(user/foo/c/1,user/foo/c/2,user/foo/c/*)でのみpjaxを使用し、異なる場合(user/foo/c/1,user/bar/c/2)は使用しない。
+ その他のページではpjaxを使用しない。


**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/scope/

```javascript
  $.pjax({
    area: 'div.pjax',
    scope: {
      '/output/pjax/demo/scope/pjax/': ['/output/pjax/demo/scope/pjax/', '^/output/pjax/demo/scope/pjax/except/'],
      '/output/pjax/demo/scope/pjax/except/': false,
      '/output/pjax/demo/scope/a.html': ['*/output/pjax/demo/scope/[a-c].html'],
      '/output/pjax/demo/scope/b.html': ['*/output/pjax/demo/scope/[a-c].html'],
      '/output/pjax/demo/scope/c.html': ['*/output/pjax/demo/scope/[a-c].html'],
      '/output/pjax/demo/scope/user/': ['*/output/pjax/demo/scope/user/[^/]+/([?#][^/]*)?$', 'rewrite'],
      '/output/pjax/demo/scope/user/*/': ['*/output/pjax/demo/scope/user/*/[ab]/'],
      '/output/pjax/demo/scope/user/*/c/': ['*/output/pjax/demo/scope/user/*/c/'],
      rewrite: function( url ){ return url.replace(/^[^\/]+\/\/[^\/]+/,'').replace(/^(\/output\/pjax\/demo\/scope\/user\/)[^\/]+(\/.*)/, '$1*$2') ; }
    }
  });
```

###CSS自動読み込み - load.css
pjaxによる移動先のページのCSSを自動的に読み込みます。移動先のページに存在しない現在のページのCSSは削除されます。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/css/

```javascript
  $.pjax({
    area: 'div.pjax' ,
    load: { css: true }
  });
```

###JavaScript自動読み込み - load.script
pjaxによる移動先のページのJavaScriptを自動的に読み込みます。
同一の**外部ファイル**により記述されるJavaScriptは**重複して読み込まれません**が、**埋め込み**により記述される同一のJavaScriptは**重複して実行されます**。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/script/

```javascript
  $.pjax({
    area: 'div.pjax' ,
    load: { script: true }
  });
```

**上記pjax登録処理は実際には外部ファイルに記述してください。埋め込みで記述した場合、pjax登録処理がページ移動ごとに不要に繰り返されます。**

##代替処理 - fallback
pjaxによるページ移動が失敗した場合に通常のページ移動を行います。初期値で有効になっているためこのための設定は不要です。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/fallback/

```javascript
  $.pjax({ area: 'div.pjax' });
```

```javascript
  $.pjax({ area: 'div.pjax', fallback: true });
```

###スクロール位置 - scrollTop, scrollLeft
pjaxによるページ移動後のスクロール位置を設定します。`null`を設定すると移動前のスクロール位置を維持します。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/scroll/

```javascript
  $.pjax({ area: 'div.pjax', scrollTop: null, scrollLeft: 50 });
```

###最低待ち時間 - wait
`$.ajax`の実行からコンテンツの更新までの最低待ち時間を設定します。pjaxによるページ移動が速すぎる場合などに使用します。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/wait/

```javascript
  $.pjax({ area: 'div.pjax', wait: 1000 });
```

###ajax通信設定 - ajax
pjaxで内部的に使用される`$.ajax`のオプションを設定できます。

```javascript
  $.pjax({ area: 'div.pjax', ajax: { timeout: 3000 } });
```

###コールバックとパラメータ - callback, callbacks, parameter
コールバックに設定した関数を実行します。コールバック関数の第一引数はイベントオブジェクトが渡され、第二引数に設定したパラメータが渡され、以降は各もととなるコールバック関数に渡された引数を引き継ぎます。すべてのコールバック関数にはイベントの発生元のオブジェクトがコンテクストとして与えられます。例えば、`anchor`要素のクリックにより実行されるコールバックの`this`は`anchor`要素であり、コールバック関数内で`this.href`などが使用できます。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/callback/

```javascript
  $.pjax({
    area: 'div.pjax' ,
    callback: function( event, arg ){ console.log( arg + ': callback' ) ; } ,
    callbacks:
    {
      before: function( event, arg ){ console.log( arg + ': before' ) ; } ,
      ajax:
      {
        beforeSend: function( event, arg ){ console.log( arg + ': ajax.beforeSend' ) ; } ,
        dataFilter: function( event, arg, data ){ console.log( arg + ': ajax.dataFilter' ) ; return data ; } ,
        success: function( event, arg ){ console.log( arg + ': ajax.success' ) ; } ,
        error: function( event, arg ){ console.log( arg + ': ajax.error' ) ; } ,
        complete: function( event, arg ){ console.log( arg + ': ajax.complete' ) ; }
      } ,
      update:
      {
        success: function( event, arg ){ console.log( arg + ': update.success' ) ; } ,
        error: function( event, arg ){ console.log( arg + ': update.error' ) ; } ,
        complete: function( event, arg ){ console.log( arg + ': update.complete' ) ; }
      } ,
      after: function( event, arg ){ console.log( arg + ': after' ) ; }
    } ,
    parameter: 'callback'
  });
```

###Google Analytics - callback
コールバックで`_gaq.push( ['_trackPageview'] )`を実行することでpjaxによるページ移動を Google Analytics に認識させることができます。

```javascript
  $.pjax({
    area: 'div.pjax' ,
    callback: function(){ if( window._gaq ){ _gaq.push( ['_trackPageview'] ) ; } }
  });
```

**`load.script`によりJavaScriptを有効にしている場合は移動先のページに埋め込まれているアクセス解析用のスクリプトが自動的に実行されますが、不要な部分まで実行されてしまうためアクセス解析用の記述を次のように置き換えることを推奨します。**

```javascript
  if (!window._gaq) {
    window._gaq = [];
    window._gaq.push(['_setAccount', 'UA-xxxxxxxx-x']);
    window._gaq.push(['_trackPageview']);
    
    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  } else {
    window._gaq.push(['_trackPageview']);
  };
```

###ローディングエフェクト - callback, callbacks
コールバックをカスタマイズすることでページ移動時にローディングエフェクトを表示させることができます。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/effect/

```javascript
  $.pjax({
    area: 'div.pjax',
    callback: function(){ $('div.loading').fadeOut(500); },
    callbacks: 
    {
      before: function(){ $('div.loading').fadeIn(100); }
    },
    ajax:
    {
      timeout: 3000
    },
    wait: 1000
  });
```

```html
        <div class="loading" style="background:url(/images/loading.png);display:none;position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%;">
          <div style="position:absolute;top:45%;left: 50%;margin-top:-64px;margin-left:-64px;text-align:center;">
            <img src="/images/loading.gif" alt="" style="display:block;">
            <span style="font-size:18px;font-weight:bold;position:absolute;white-space:nowrap;">now loading...</span>
          </div>
        </div>
```

ローディングエフェクトは頻繁に表示されると煩わしいため多用しないことを推奨します。
ページ移動時のローディングエフェクトの使用量を削減するには、ロードに1秒以上かかった場合のみ1秒経過した時点からローディングエフェクトを表示するなどの方法が考えられます。

```javascript
  $.pjax({
    area: 'div.pjax',
    callback: function()
    {
      clearTimeout($.data($('div.loading').get(0), 'pjax-effect-id'));
      $('div.loading').fadeOut(500);
      $.data($('div.loading').get(0), 'pjax-effect-id', 0);
    },
    callbacks: 
    {
      before: function()
      {
        clearTimeout($.data($('div.loading').get(0), 'pjax-effect-id'));
        $.data($('div.loading').get(0), 'pjax-effect-id', setTimeout(function(){ $('div.loading').fadeIn(100); }, 1000));
      }
    },
    ajax:
    {
      timeout: 3000
    },
    wait: 100
  });
```

###UTF-8以外の文字コードへの対応 - callbacks.ajax.beforeSend
`beforeSend`でMimeTypeをオーバーライドすることでUTF-8以外の文字コードを使用したHTMLを文字化けすることなく読み込むことができます。ただし、移動先のページの文字コードを事前に判別することができないため、複数の文字コードの混在したサイトでは文字コードの設定ができずpjaxは使用できません（CSSやJavaScriptなどの外部ファイルは異なる文字コードで作成されていても問題ありません）。
文字コード変換のデモは、当サイトのサーバーがUTF-8以外で作成されたページもUTF-8として強制的に表示させる設定となっていたことから正常に動作しないため公開していません。

```javascript
  $.pjax({
    area: 'div.pjax' ,
    callbacks:
    {
      ajax:
      {
        beforeSend: function( event, arg, XMLHttpRequest )
        {
            XMLHttpRequest.overrideMimeType( 'text/html;charset=UTF-8' ) ;
            XMLHttpRequest.overrideMimeType( 'text/html;charset=Shift_JIS' ) ;
            XMLHttpRequest.overrideMimeType( 'text/html;charset=EUC-JP' ) ;
        }
      }
    }
  });
```

###サーバーへの対応 - PHPなどによる差分データを使用した更新
pjaxによる通信をサーバー側で識別し、pjax用の差分データを返させ、これを使用してページの更新（移動）を行います。データサイズを削減できるため、より少ない転送量と帯域で多くのアクセスを処理できます。
pjaxは通信時にHTTPリクエストヘッダに`X-Pjax``X-Pjax-Area``X-Pjax-CSS``X-Pjax-Script`のフィールドと値を追加します。また、リクエストするURLに`?pjax=1`のようにクエリを追加します。サーバーはこれによりpjaxの使用の有無と必要なデータを知ることができます。なお、レスポンスヘッダの`Content-Type`に必ず`contentType`パラメータで設定したいずれかの値が含まれている必要があります。

**demo**: http://sa-kusaku.sakura.ne.jp/output/pjax/demo/server/ <small>※これは移動先のページを差分データに置き換えた擬似的なデモです。</small>

```javascript
  $.pjax({ area: 'div.pjax' });
```

```html
<html>
<head>
<title>pjax demo</title>
</head>
<body>
  <div class="primary pjax">
    <div class="layout">
      <p>primary2</p>
      <p>pjax enable あアｱ亜</p>
      <ul>
        <li><a href="/output/pjax/demo/server/">page1 enable</a></li>
        <li><a href="/output/pjax/demo/server/2.html">page2 enable</a></li>
        <li><a href="/output/pjax/demo/server/3.html">page3 enable</a></li>
      </ul>
    </div>
  </div>
</body>
</html>
```

```html
<title>pjax demo</title>
<div class="primary pjax">
  <div class="layout">
    <p>primary3</p>
    <p>pjax enable あアｱ亜</p>
    <ul>
      <li><a href="/output/pjax/demo/server/">page1 enable</a></li>
      <li><a href="/output/pjax/demo/server/2.html">page2 enable</a></li>
      <li><a href="/output/pjax/demo/server/3.html">page3 enable</a></li>
    </ul>
  </div>
</div>
```

pjaxによる通信とそれ以外の通信により返すレスポンス（HTML）の切り替えは、ページごとにPHPにより行う方法もありますが、ページが大量にある場合はWordpressのように差分データをデータベースで管理するとより簡便です。アクセスされるページのURLはmod_rewriteを使用すれることで`http://example/a/b/c/`→`http://example/?dir1=a&dir2=b&dir3=c`のようにクエリに変換することができます。この方法であればページファイルは`http://example/index.php`１つで済み、あとはGETクエリに応じたSQLクエリを生成しデータベースから必要なデータを持ってくるだけです。ただし、サーバーにpjax用の差分データを返させる（静的なページから動的なページと構成に変更する）場合は、大なり小なりサーバーの負荷が増加し従前より処理能力が低下する可能性があることに留意してください。

##Wordpressへの導入
Wordpressにも既存の設定を変更することなく簡単にpjaxを導入することができます。
Wordpressの各種プラグインも概ね共存し併用することができます。
<small>※Wordpressインストール直後、twentytwelveテーマを使用して確認。</small>
<small>※プラグインはメジャーなものを2,30個インストールして確認、競合は1,2個ほど。</small>
<small>※文字コードの差異は修正する必要があります。</small>
<small>※本稼働中のWordpressサイトでの動作は未確認。現在動作および負荷検証用Wordpressサイトを制作中。</small>

###初期テーマ（twentytwelve）への導入例
<ol>
  <li>WordpressにjQueryとpjaxプラグインをアップロードしてください。ここでは`/lib/`ディレクトリにアップロードしたものとします。</li>
  <li>テキストエディタで`initialize.js`ファイルを作成し、次のように記述したのちUTF-8で保存し先ほどと同じディレクトリにアップロードします。`http://host/`の部分はサイトにあわせて変更してください。

```javascript
$(function(){
  $.pjax({
    area: '#primary' ,
    link: 'a:not([target])[href^="http://host/"]' ,
    load: { css : true , script : true , sync : true , async : 0 }
  });
});
```

  </li>
  <li>
    テーマ編集画面を開き、`header.php`の`</head>`タグの直前に次のようにコードを追加してアップロードしたファイルを読み込ませてください。jQueryは外部のサイトから読み込ませてもかまいません。

```html
<script type="text/javascript" charset="utf-8" src="/lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/lib/jquery.pjax.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/lib/initialize.js"></script>
</head>
```

  </li>
</ol>
以上で終わりです。`header.php`の編集を保存したらpjaxが動作しているはずです。

###競合により不具合が発生するWordpressプラグインへの対応
JavaScriptを使用しているWordpressプラグインで不具合が発生する場合があります。基本的にはpjaxのscope機能によりpjaxを使用するページの範囲を制限し競合するWordpressプラグインとpjaxの動作ページを分離する方法での解決を推奨しますが、JavaScriptの実行タイミングを調整することで競合を解消し共存させられる可能性もあります。不具合が発生する主な状況と対応は以下のとおりです。

####WordpressプラグインのJavaScriptの想定外のページでの使用
pjaxではJavaScriptの実行状態がページ移動後も維持されるため、ページ移動により変更されたDOMの差異からエラーが発生する可能性があります。ページ移動時に当該JavaScriptを終了ないし停止させ、適宜再開させることができれば回避が可能です。終了ないし停止ができない場合はあとはWordpressプラグインのJavaScriptの例外処理の問題であるためWordpressプラグインの修正以外による同一ページ内での共存は困難です。

####WordpressプラグインのJavaScriptを使用するページへの再アクセス
pjaxは移動先のページのJavaScriptが読み込み済みであり、コードが外部ファイルに記述されている場合はこれを読み込まず、同一ページに埋め込まれている場合は再度読み込み実行します。このため、併用するJavaScriptによっては正常に動作させるために適宜再実行により実行状態をリセットするか、または読み込ませずリセットさせない処理を追加する必要があります。

#注意点

##リンクパスの記述
pjaxを使用したサイトでは相対パスはルートパスで書くのが基本です。ルートパス以外の相対パスで書いた場合、リンクが意図しないURLを示すことがあるため内部リンクの相対パスは必ずルートパスで書いてください。

```html
http://host/from/ から http://host/from/to/ へのリンク

OK
<a href="/from/to/"></a>

NG
<a href="to"></a>
<a href="to/"></a>
<a href="../from/to"></a>
<a href="/from/to"></a>
```

###フォームの取り扱い
フォームによりデータの送受信を行うページではpjaxの使用を推奨しません。pjaxによりページ遷移を行った場合ではフォームへの入力情報が前後へのページ移動のつどリセットされるため、入力情報のリセット対策を施さなければ送信までのコンバージョン率の大幅な低下が予想されること、POST情報の二重送信防止の一般的な手法であるページのリダイレクトを行うために結局は通常のページ遷移が要求されることが理由です。
フォームによるデータの送受信はpjaxではなく通常のページ遷移またはajaxによる入力情報の送信とページ内容の書き換えにより行うことを推奨します。

なお、検索フォームのようなGET送信フォームで使用する分には問題ありません。

#補足
ドキュメント内の用語の用法にはあまり自信がありません。間違いやバグに気づかれた方は<a href="http://sa-kusaku.sakura.ne.jp/service/board/">掲示板</a>または<a href="http://sa-kusaku.sakura.ne.jp/service/contact/">連絡フォーム</a>からご連絡ください。

pjaxの実用的な使用方法についての雑考を書いてみました。<a href="http://d.hatena.ne.jp/fatwebstudy/20131015/1381780122" target="_blank">pjaxの実用性</a>

#ライセンス - MIT License
以下に定める条件に従い、本ソフトウェアおよび関連文書のファイル（以下「ソフトウェア」）の複製を取得するすべての人に対し、ソフトウェアを無制限に扱うことを無償で許可します。これには、ソフトウェアの複製を使用、複写、変更、結合、掲載、頒布、サブライセンス、および/または販売する権利、およびソフトウェアを提供する相手に同じことを許可する権利も無制限に含まれます。
上記の著作権表示および本許諾表示を、ソフトウェアのすべての複製または重要な部分に記載するものとします。
ソフトウェアは「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。ここでいう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定されるものではありません。 作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェアに起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について何らの責任も負わないものとします。

<a href="http://opensource.org/licenses/mit-license.php" target="_blank">http://opensource.org/licenses/mit-license.php</a>  
<a href="http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license" target="_blank">http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license</a>