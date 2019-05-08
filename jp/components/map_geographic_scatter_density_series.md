---
title: Map |データ可視化ツール|Ignite UI for Angular |Infragistics
_description: マップを使用すると、ビューモデルからの地理的位置を含むデータ、またはシェープファイルから地理的画像マップにロードされた地理空間データを表示できます。
_keywords: map, Ignite UI for Angular, infragistics
_language: ja
---

## 散布高密度シリーズの使用

マップ コンポーネントの `GeographicHighDensityScatterSeries` を使用して、非常に少ないロード時間で、数百から数百万のデータ ポイントを持つ散布図データをバインドして表示できます。

### デモ

<div class="sample-container" style="height: 400px">
    <iframe id="geo-map-type-scatter-density-series-iframe" src='{environment:demosBaseUrl}/maps/geo-map-type-scatter-density-series' width="100%" height="100%" seamless frameBorder="0" onload="onSampleIframeContentLoaded(this);"></iframe>
</div>
<div>
    <button data-localize="stackblitz" disabled class="stackblitz-btn"   data-iframe-id="geo-map-type-scatter-density-series-iframe" data-demos-base-url="{environment:demosBaseUrl}">StackBlitz で表示
    </button>
</div>

<div class="divider--half"></div>

上記のデモは、オーストラリアの人口密度を表す何百、何千ものデータ ポイントにバインドされた `GeographicHighDensityScatterSeries` シリーズをマップ コンポーネントで示しています。大量のデータ ポイントを含むマップのプロット領域は凝縮された赤色のピクセルによって表します。少量のデータ ポイントを含む領域は青色のピクセルによって表します。

相当数のデータ ポイントがあるため、シリーズではフルサイズのマーカーに対して散布データを小さな点として表示し、領域にはデータ ポイントの集合を表す高い色密度を使用した大半のデータを表示します。

### データ要件

マップ コントロールの他のタイプの散布図シリーズと同様に、`GeographicHighDensityScatterSeries` シリーズには、オブジェクトの配列にバインドできる `ItemsSource` プロパティがあります。また、項目ソースの各項目は、地理経度および緯度を表す 2 つのデータ列があります。`LongitudeMemberPath` と `LatitudeMemberPath` プロパティを使用してこのデータ列をマップします。

#### データ バインディング

以下の表に、データ バインドに使用される GeographicHighDensityScatterSeries シリーズのプロパティをまとめています。

| プロパティ                 | タイプ                                               | 説明                                                |
| --------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `ItemsSource`         | any                                               | 項目ソースを取得または設定します。                                 |
| `LongitudeMemberPath` | 経度値が割り当てられた項目上の位置を決定するには ItemsSource プロパティを使用します。 |                                                   |
| `LatitudeMemberPath`  | String                                            | 緯度値が割り当てられた項目上の位置を決定するには ItemsSource プロパティを使用します。 |

### 熱色スケール

熱色スケールは、シリーズ内のカラー パターンを決定するオプションの機能です。以下の表は、カラー スケールを決定するために使用するプロパティをまとめたものです。

| プロパティ              | タイプ                             | 説明                               |
| ------------------ | ------------------------------- | -------------------------------- |
| `HeatMinimum`      | カラー スケールの最小端を表す double 値を定義します。 |                                  |
| `HeatMaximum`      | カラー スケールの最大端を表す double 値を定義します。 |                                  |
| `HeatMinimumColor` | Color                           | カラー スケールの下端で使用するポイント密度カラーを定義します。 |
| `HeatMaximumColor` | Color                           | カラー スケールの上端で使用するポイント密度カラーを定義します。 |

### コード例

以下のコードは、`GeographicHighDensityScatterSeries` の `HeatMinimumColor` と `HeatMaximumColor` プロパティを設定する方法を示します。

<!-- Angular -->

```html
TODO - ADD CODE SNIPPET
```

```typescript

```