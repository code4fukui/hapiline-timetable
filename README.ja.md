# hapiline-timetable


> ハピラインふくいの列車の時刻表のためのデータ処理パイプラインおよびWebアプリケーション。

## デモ

- [**発車カウントダウン**](https://code4fukui.github.io/hapiline-timetable/): 任意の2駅間の次の発車までのリアルタイムカウントダウン（運賃情報を含む）。
- [**駅マップ**](https://code4fukui.github.io/hapiline-timetable/map.html): ハピラインふくいの全駅の位置を示すインタラクティブなマップ。

## 機能

- **データ処理スクリプト:** 時刻表データを処理・拡充するためのDenoスクリプト群。
  - `make.js`: 手入力された部分的な時刻表ファイルを統合し、単一の `hapiline-timetable.csv` にコンパイルします。
  - `scrapeStation.js`: ハピラインふくいの公式サイトから公式の駅情報（駅名、かな、住所など）をスクレイピングします。
  - `addPos.js`: 駅の住所をジオコーディングして、緯度・経度の座標を追加します。
- **再利用可能なモジュール:**
  - `HapilineTimetable.js`: 駅間の列車のスケジュールを照会するためのクラス。
  - `HapilineFare.js`: 駅間の運賃を計算するためのクラス。
- **単体テスト:** コアデータモジュールのテスト（`*.test.js`）が含まれています。

## データ

本プロジェクトでは、手入力されたデータとスクレイピングされたデータを組み合わせて、完全で機械可読なデータセットを生成します。

1.  **ソースデータ:**
    - `hapiline-nobori.csv` / `hapiline-kudari.csv`: 手作業で書き起こされた上り・下りの時刻表。
    - `hapiline-station_src.csv`: スクレイピング対象の駅ページのリスト。
    - `hapiline-fare_regular.csv`: 公式の運賃表。
2.  **生成されるファイル:**
    - `hapiline-timetable.csv`: すべての列車の最終的な構造化された時刻表。
    - `hapiline-station.csv`: 詳細情報と地理座標を含む全駅の完全なリスト。

## はじめに

### 前提条件

- データ処理スクリプトを実行するには、[Deno](https://deno.land/) ランタイムが必要です。

### データの生成

1.  **時刻表のコンパイル:**
    ```bash
    deno run --allow-read --allow-write make.js
    ```
    これにより、`hapiline-nobori.csv` と `hapiline-kudari.csv` が読み込まれ、`hapiline-timetable.csv` が生成されます。

2.  **駅データのスクレイピングとジオコーディング:**
    ```bash
    # 公式サイトから基本的な駅情報をスクレイピングする
    deno run --allow-net --allow-read --allow-write scrapeStation.js

    # 住所をジオコーディングして緯度/経度を追加する
    deno run --allow-net --allow-read --allow-write addPos.js
    ```
    これにより、`hapiline-station.csv`（座標なし）と `hapiline-station_pos.csv`（座標あり）が生成されます。マップやその他の機能が正しく動作するように、元のファイルをジオコーディングされたバージョンに置き換えます。
    ```bash
    # macOS/Linux の場合
    mv hapiline-station_pos.csv hapiline-station.csv
    ```

### アプリケーションの実行

データファイルを生成した後、WebブラウザでHTMLファイルを開くだけです。
- `index.html`: 発車カウントダウン
- `map.html`: 駅マップ

## 出典

- [時刻表・運賃｜株式会社ハピラインふくい](https://www.hapi-line.co.jp/timetable/)
- [路線・駅情報｜株式会社ハピラインふくい](https://www.hapi-line.co.jp/route/station/)

## ライセンス

[MIT](LICENSE)
