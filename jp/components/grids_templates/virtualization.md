﻿---
title: 仮想化ディレクティブ - ネイティブ Angular | Ignite UI for Angular
_description: Ignite UI for Angular Virtualization ディレクティブは大量データ セットの処理でスピードおよびパフォーマンスのための主な機能です。仮想描画機能はメモリでの DOM オブジェクトの数を固定すると、スムーズなスクロールを実現できます。
_keywords: Ignite UI for Angular, UI コントロール, Angular ウィジェット, web ウィジェット, UI ウィジェット, Angular, ネイティブ Angular コンポーネント スイート, ネイティブ Angular コントロール, ネイティブ Angular コンポーネント ライブラリ, ネイティブ Angular コンポーネント, Angular Grid, Angular Table, Angular Data Grid コンポーネント, Angular Data Table コンポーネント, Angular Data Grid コントロール, Angular Data Table コントロール, Angular Grid コンポーネント, Angular Table コンポーネント, Angular Grid コントロール, Angular Table コントロール, Angular 高パフォーマンス Grid, Angular 高パフォーマンス Data Table, Angular Virtualization ディレクティブ, Angular Data Table Virtualization, 仮想化, Angular Data Table パフォーマンス, Data Table パフォーマンス
_language: ja
---

### グリッドの仮想化とパフォーマンス

Ignite UI for Angular [`IgxGrid`]({environment:angularApiUrl}/classes/igxgridcomponent.html) コントロールは [`igxForOf`]({environment:angularApiUrl}/classes/igxforofdirective.html) ディレクティブを使用します。コンテンツを垂直方向 (データ レコード) および水平方向 (列) に仮想化します。

#### デモ

<div class="sample-container loading" style="height:550px">
    <iframe id="grid-sample-2-iframe" src='{environment:demosBaseUrl}/grid/grid-sample-2' width="100%" height="100%" seamless frameBorder="0" onload="onSampleIframeContentLoaded(this);"></iframe>
</div>
<br/>
<div>
<button data-localize="stackblitz" disabled class="stackblitz-btn" data-iframe-id="grid-sample-2-iframe" data-demos-base-url="{environment:demosBaseUrl}">StackBlitz で開く</button>
</div>

### 仮想化の有効化

[`igxForOf`]({environment:angularApiUrl}/classes/igxforofdirective.html) ディレクティブは、ビューポートに表示されているデータのみを描画し、ユーザーがスクロール時に表示データを切り替えた際に Data Grid が DOM 描画およびメモリ使用を最適化します。[`IgxGrid`]({environment:angularApiUrl}/classes/igxgridcomponent.html) の [`width`]({environment:angularApiUrl}/classes/igxgridcomponent.html#width) および [`height`]({environment:angularApiUrl}/classes/igxgridcomponent.html#height) のデフォルト値は 100% です。コンテンツが利用可能なスペースにフィットせず、垂直方向または水平方向にスクロールバーが必要な場合に仮想化が有効になります。ただし、グリッドの [`width`]({environment:angularApiUrl}/classes/igxgridcomponent.html#width) または [`height`]({environment:angularApiUrl}/classes/igxgridcomponent.html#height) を明示的に `null` 値に設定できます。つまり、関連するディメンションが項目の合計サイズに基づいて決定されます。スクロールバーが表示されず、すべての項目が相対するディメンション ([`width`]({environment:angularApiUrl}/classes/igxgridcomponent.html#width) が `null` 値の場合は列で、[`height`]({environment:angularApiUrl}/classes/igxgridcomponent.html#height) が `null` 値の場合は行) に描画されます。

データ部分のサイズは以下によって決定されます。

*   垂直 (行) 仮想化の行の高さ。これは `rowHeight` オプションによって決定され、デフォルト値は 50 (px) です。
*   水平 (列) 仮想化の列幅 (ピクセル単位)。各列コンポーネントで明示的に幅を設定、または明示的に幅が設定されないすべての列に適用するグリッドの `columnWidth` オプションを設定できます。

ディメンションを設定せずにグリッドでデフォルト動作を適用する場合、ほとんどの場合は望ましいレイアウトになります。列幅は列カウント、幅が設定された列、およびグリッド コンテナーの計算幅に基づいて決定されます。グリッドは、割り当てる幅が 136px 未満になる以外はすべての列を利用可能なスペースに合わせようとします。その場合、割り当てられない幅を持つ列は 136px の最小幅に設定され、水平方向スクロールバーが表示されます。グリッドは水平方向に仮想化されます。

列幅をパーセンテージ (%) で明示的に設定する場合、ほとんどの場合に水平スクロールバーがない水平方向に仮想化されないグリッドを作成します。

### リモート仮想化

[`IgxGrid`]({environment:angularApiUrl}/classes/igxgridcomponent.html) は、データ部分がリモート サービスから要求されたシナリオをサポートします。このシナリオは内部に使用される [`igxForOf`]({environment:angularApiUrl}/classes/igxforofdirective.html) で実装される動作を公開します。

### Grid リモート仮想化デモ

<div class="sample-container loading" style="height:550px">
    <iframe id="grid-sample-4-iframe" src='{environment:demosBaseUrl}/grid/grid-sample-4' width="100%" height="100%" seamless frameBorder="0" onload="onSampleIframeContentLoaded(this);"></iframe>
</div>
<br/>
<div>
<button data-localize="stackblitz" disabled class="stackblitz-btn" data-iframe-id="grid-sample-4-iframe" data-demos-base-url="{environment:demosBaseUrl}">StackBlitz で開く</button>
</div>

この機能を使用するには、取得した引数に基づいて適切な要求を実行するために [`onDataPreLoad`]({environment:angularApiUrl}/classes/igxgridcomponent.html#ondatapreload) 出力にサブスクライブし、サービスから送信される相対する情報とパブリック [`IgxGrid`]({environment:angularApiUrl}/classes/igxgridcomponent.html) の [`totalItemCount`]({environment:angularApiUrl}/classes/igxgridcomponent.html#totalitemcount) プロパティを設定する必要があります。

```html
<igx-grid #grid [data]="remoteData | async" [height]="'500px'" [width]="'100%'" [autoGenerate]='false' (onDataPreLoad)="processData(false)"
    (onSortingDone)="processData(true)">
    <igx-column [field]="'ProductID'" [sortable]="true"></igx-column>
    <igx-column [field]="'ProductName'" [sortable]="true"></igx-column>
    <igx-column [field]="'UnitPrice'" [dataType]="'number'" [formatter]="formatCurrency" [sortable]="true"></igx-column>
    ...
</igx-grid>
```

```typescript
public ngAfterViewInit() {
    this._remoteService.getData(this.grid.virtualizationState, this.grid.sortingExpressions[0], true, (data) => {
            this.grid.totalItemCount = data["@odata.count"];
    });
}

public processData() {
    if (this.prevRequest) {
        this.prevRequest.unsubscribe();
    }

    this._prevRequest = this._remoteService.getData(this.grid.virtualizationState,
        this.grid.sortingExpressions[0], reset, () => {
        ...
        this.cdr.detectChanges();
    });
}
```

データを要求する際に [`startIndex`]({environment:angularApiUrl}/interfaces/iforofstate.html#startindex) および [`chunkSize`]({environment:angularApiUrl}/interfaces/iforofstate.html#chunksize) プロパティを提供する [`IForOfState`]({environment:angularApiUrl}/interfaces/iforofstate.html) インターフェイスを使用できます。

**注:** 最初の [`chunkSize`]({environment:angularApiUrl}/interfaces/iforofstate.html#chunksize) は常に 0 で、特定のアプリケーション シナリオに基づいて設定する必要があります。

### リモートの並べ替え/フィルタリングの仮想化
リモートの並べ替えおよびフィルタリングは、[`onDataPreLoad`]({environment:angularApiUrl}/classes/igxgridcomponent.html#ondatapreload), [`onSortingDone`]({environment:angularApiUrl}/classes/igxgridcomponent.html#onsortingdone), [`onFilteringDone`]({environment:angularApiUrl}/classes/igxgridcomponent.html#onfilteringdone) 出力にサブスクライブし、パブリック [`IgxGrid`]({environment:angularApiUrl}/classes/igxgridcomponent.html) プロパティの [`totalItemCount`]({environment:angularApiUrl}/classes/igxgridcomponent.html#totalitemcount) をサービスから送信される個々の情報とともに設定し、受け取った引数に基づいて適切な要求を作成します。

リモート データを要求時にフィルター処理で大文字と小文字が区別されることに注意してください。

<div class="sample-container loading" style="height:550px">
    <iframe id="grid-remote-filtering-iframe" src='{environment:demosBaseUrl}/grid/grid-remote-filtering' width="100%" height="100%" seamless frameBorder="0" onload="onSampleIframeContentLoaded(this);"></iframe>
</div>
<br/>
<div>
<button data-localize="stackblitz" disabled class="stackblitz-btn" data-iframe-id="grid-remote-filtering-iframe" data-demos-base-url="{environment:demosBaseUrl}">StackBlitz で開く</button>
</div>

### 仮想化の制限

*   行/列の指定したディメンションが実際の描画された要素と一致する必要があります。たとえば、グリッド セルに行の高さを高くするテンプレートまたはクラスを定義した際に指定した [`rowHeight`]({environment:angularApiUrl}/classes/igxgridcomponent.html#rowheight) 値と一致しない場合、垂直仮想化は正しく動作しません。仮想項目数は DOM の実際要素と一致しなくなり、列およびその幅も同様になります。
*   グリッドにレスポンシブな幅または高さがあり、ブラウザーのウィンドウまたはその他の要素のサイズに合わせてサイズ変更する場合、スクロール位置は 0 にリセットされます。スクロールバーの位置およびサイズ変更については、今後のリリースで機能拡張が予定されています。
*   Mac OS で 「Show scrollbars only when scrolling」システム オプションを true (デフォルト値) に設定した場合、水平スクロールバーが表示されません。これは、グリッドの行コンテナーで、overflow が hidden に設定されているためです。オプションを "Always" に設定すると、スクロールバーが表示されます。

### FAQ

#### 仮想化のためにグリッドでディメンションを設定する必要があるのはなぜですか?

描画する前にコンテナーおよび項目のサイズの情報がない場合にグリッドでランダムな位置にスクロールすると、スクロールバーの幅や高さの設定、表示項目の決定で誤りが発生します。ディメンションの推測がスクロールバーの誤操作となり、ユーザー エクスペリエンスを低下させます。そのため、仮想化を有効化する際は、関連するディメンションを設定することをお勧めします。

<div class="divider--half"></div>

### API
* [IgxGridComponent]({environment:angularApiUrl}/classes/igxgridcomponent.html)
*  [IgxGridComponent Styles]({environment:sassApiUrl}/index.html#function-igx-grid-theme)
* [IgxColumnComponent]({environment:angularApiUrl}/classes/igxcolumncomponent.html)
* [IgxForOfDirective]({environment:angularApiUrl}/classes/igxforofdirective.html)
* [IForOfState]({environment:angularApiUrl}/interfaces/iforofstate.html)

### 追加のリソース
<div class="divider--half"></div>

* [グリッドの概要](grid.md)
* [ページング](paging.md)
* [フィルタリング](filtering.md)
* [並べ替え](sorting.md)
* [集計](summaries.md)
* [列移動](column_moving.md)
* [列のピン固定](column_pinning.md)
* [列のサイズ変更](column_resizing.md)
* [選択](selection.md)

<div class="divider--half"></div>
コミュニティに参加して新しいアイデアをご提案ください。

* [Ignite UI for Angular **フォーラム** (英語)](https://www.infragistics.com/community/forums/f/ignite-ui-for-angular)
* [Ignite UI for Angular **GitHub** (英語)](https://github.com/IgniteUI/igniteui-angular)