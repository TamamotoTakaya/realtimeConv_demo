# Windowsで開発環境を準備する

このページでは、音声対話アプリを自分のPCで動かすために、**VS Code、Node.js、Git**を準備します。授業などで既に入れたものは、使えることを確認できれば入れ直す必要はありません。

## 1. すでに入っているか確認する

1. Windowsのスタートメニューで `Visual Studio Code` を検索します。見つかったら、開けることを確認してください。
2. スタートメニューで `PowerShell` を検索して開きます。
3. PowerShellに以下を **1行ずつ** 貼り付け、各行で Enter を押します。

```powershell
node --version
npm.cmd --version
git --version
```

<!-- 撮影：PowerShellで3つのコマンドとバージョン番号が見える画面。ユーザー名が映る場合は隠す。 -->
![PowerShellでNode.js、npm、Gitのバージョンを確認した画面](screenshots/スクリーンショット%202026-11-09%20135136.png)

| 確認結果 | 次にすること |
|---|---|
| VS Codeが開く | VS Codeの導入はスキップ |
| `node` と `npm.cmd` の両方でバージョン番号が出る | Node.jsは導入済み。READMEの指定バージョンを確認 |
| `git` でバージョン番号が出る | Gitの導入はスキップ |
| 「認識されません」などと表示される | 該当するソフトの導入手順へ |

**Windows用のダウンロードに `x64` と `Arm64` がある場合**は、Windowsの **「設定」→「システム」→「バージョン情報」** にある「システムの種類」を確認してください。`x64 ベースのプロセッサ` なら `x64`、`ARM ベースのプロセッサ` なら `Arm64` を選びます。

## 2. VS Codeを入れる

VS Codeは、アプリの設定やコードを編集するためのソフトです。

1. [VS Codeの公式ダウンロードページ](https://code.visualstudio.com/download)を開きます。
2. Windowsの **User Installer** から、PCに合った `x64` または `Arm64` を選びます。
3. ダウンロードした `.exe` を開き、画面に沿ってインストールします。

<!-- 撮影：Windowsの「User Installer」とx64／Arm64が見える範囲。 -->
基本的に赤丸で囲んだ部分をクリックしてインストーラーをダウンロードすればOK
![VS CodeのダウンロードページでWindows用のUser Installerを選ぶ画面](screenshots/スクリーンショット%202026-11-09%20133401.png)



利用規約を最後までスクロールして「同意する」にチェックしてから「次へ」

![vs code 利用規約](screenshots/スクリーンショット%202026-11-09%20134122.png)


こだわりがなければ、そのまま「次へ」

![vs codeインストール場所](screenshots/スクリーンショット%202026-11-09%20134149.png)


そのまま「次へ」

![vs code スタートメニュー](screenshots/スクリーンショット%202026-11-09%20134215.png)


図の通りチェックを入れて「次へ」

![vs code 追加タスク](screenshots/スクリーンショット%202026-11-09%20134250.png)


「Don't add the copilot command」にチェック。利用料金がかかるが、興味がある人は後から導入してみてください。

![GitHub Copilot CLI](screenshots/スクリーンショット%202026-11-09%20134425.png)


設定を再度確認して「インストール」

![vs code installation option check](screenshots/スクリーンショット%202026-11-09%20134447.png)


4. スタートメニューから **Visual Studio Code** を開きます。

日本語表示にしたい場合は、左側の **拡張機能（Extensions）** から `Japanese Language Pack for Visual Studio Code` を検索し、Microsoftの拡張機能を入れます。英語表示のままでも実習は進められます。


参考

[WindowsへのVisual Studio Codeのインストール方法（龍谷大学）](https://www602.math.ryukoku.ac.jp/Prog1/vscode-win.html)

## 3. Node.jsとnpmを入れる

Node.jsはアプリを動かすための環境です。npmは、アプリに必要なライブラリをまとめて入れる道具で、通常はNode.jsと一緒に入ります。

1. [Node.jsの公式ダウンロードページ](https://nodejs.org/en/download)を開きます。
2. **v26.13.00またはv24.13.00**を選びます。Windows向けの **Installer（`.msi`）** を、PCに合った種類でダウンロードしてください。

<!-- 撮影：検証に使ったバージョン、Windows、x64／Arm64、Installer (.msi) が見える画面。 -->
適切なバージョン・OSを選んでください。

![Node.jsのダウンロードページでWindows用のインストーラーを選ぶ画面](screenshots/スクリーンショット%202026-11-09%20133925.png)

3. ダウンロードした `.msi` を開き、標準設定で進めます。追加の開発ツールを入れる選択肢が表示された場合、今回のアプリでは不要です。

利用規約を下までスクロールして、「I accept ...」にチェック後、「Next」

![node js 利用規約](screenshots/スクリーンショット%202026-11-09%20135742.png)


特にこだわりがなければ「Next」

![node js インストール場所](screenshots/スクリーンショット%202026-11-09%20135754.png)


そのまま「Next」

![node js custom setup](screenshots/スクリーンショット%202026-11-09%20135848.png)


「Automatically install ...」にチェックを入れて「Next」

![node js tools for native modules](screenshots/スクリーンショット%202026-11-09%20135905.png)


「install」を押す。「このアプリがデバイスに変更を加えることを許可しますか？」が出てきたら「はい」を押す。

![node js installation last check](screenshots/スクリーンショット%202026-11-09%20135918.png)

4. インストール後、PowerShellとVS Codeをいったん終了します。PowerShellを開き直し、以下を実行します。

```powershell
node --version
npm.cmd --version
```

両方でバージョン番号が出れば準備完了です。この手順書では、Windowsでnpmを実行するときに `npm.cmd` と書きます。

## 4. Gitを入れる

Gitは、GitHubにあるアプリのファイルを、自分のPCへ取得するために使います。

1. [Git for Windowsの公式ページ](https://git-scm.com/install/windows)を開きます。
2. **Standalone Installer** の `x64 Setup` または `ARM64 Setup` を選びます。

<!-- 撮影：「Standalone Installer」の2つのダウンロードリンクが見える画面。 -->
![Git for Windowsのインストーラーを選ぶ画面](screenshots/スクリーンショット%202026-11-09%20134718.png)

3. ダウンロードした `.exe` を開き、標準設定で進めます。Gitを使える場所を選ぶ画面が出たら、**Git Bash以外のターミナルでもGitを使える選択肢**を選んでください。

<!-- 撮影：Gitを使える場所を選ぶ画面。選択する項目が見えるように撮る。 -->
最期までスクロールしたら、「Next」

![git 利用規約](screenshots/スクリーンショット%202026-11-09%20140238.png)


こだわりがなければ、そのまま「Next」

![git インストール場所](screenshots/スクリーンショット%202026-11-09%20140252.png)


図の通りチェック（おそらくデフォルトのまま）して、「Next」

![git select components](screenshots/スクリーンショット%202026-11-09%20140325.png)


そのままで「Next」

![git start menu](screenshots/スクリーンショット%202026-11-09%20140349.png)


使用するテキストエディタを選択する（今回はVS Codeを推奨）

![git text editor](screenshots/スクリーンショット%202026-11-09%20140417.png)


「Override the default ...」を選択

![git branch](screenshots/スクリーンショット%202026-11-09%20140457.png)


「Git from the command line ...」を選択

![git path environment](screenshots/スクリーンショット%202026-11-09%20140521.png)


「Use bundled OpenSSH」を選択

![git ssh](screenshots/スクリーンショット%202026-11-09%20140543.png)


「Use the OpenSSL Library」を選択

![git https transport backend](screenshots/スクリーンショット%202026-11-09%20140628.png)


「Check out Windows-style, ...」を選択

![git line ending](screenshots/スクリーンショット%202026-11-09%20140649.png)


「Use MinTTY ...」を選択

![git bash](screenshots/スクリーンショット%202026-11-09%20140707.png)


「Merge」を選択

![git pull option](screenshots/スクリーンショット%202026-11-09%20140741.png)


「Git Credential Manager」を選択

![git credential helper](screenshots/スクリーンショット%202026-11-09%20140817.png)


両方ともチェックをつけて、「install」

![git extra options](screenshots/スクリーンショット%202026-11-09%20140905.png)



4. PowerShellとVS Codeをいったん終了します。PowerShellを開き直し、以下を実行します。

```powershell
git --version
```

`git version` に続いて数字が表示されれば準備完了です。

## 5. VS Codeのターミナルで最終確認する

VS Codeを開き、上部メニューの **「ターミナル」→「新しいターミナル」**（**Terminal → New Terminal**）を選びます。画面下に出るターミナルで、次を1行ずつ実行します。

```powershell
node --version
npm.cmd --version
git --version
```

<!-- 撮影：VS Codeの上部メニューと、下部ターミナルでの実行結果。 -->
![VS Codeの下部ターミナルでNode.js、npm、Gitを確認した画面](images/install/vscode-terminal.png)

3つともバージョン番号が出たら、[READMEの「GitHubからクローンする」](../README.md#2-githubからクローンする)に進んでください。

### 途中で止まった場合

- **インストールしたのにコマンドが認識されない**：PowerShellやVS Codeを開き直してください。VS Codeでは、ターミナルだけでなくアプリ本体も一度終了します。
- **管理者の許可を求められて進めない**：大学や共有のPCの場合は、表示された画面を担当者に伝えてください。
- **Node.jsのバージョンがREADMEの指定と違う**：既に授業などで使っている環境を変更する前に、現在のバージョン番号を担当者に伝えてください。