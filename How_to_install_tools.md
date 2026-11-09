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
![PowerShellでNode.js、npm、Gitのバージョンを確認した画面](images/install/version-check.png)

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

<!-- 撮影：Windowsの「User Installer」とx64／Arm64が見える範囲。 -->
![VS CodeのダウンロードページでWindows用のUser Installerを選ぶ画面](images/install/vscode-download.png)

3. ダウンロードした `.exe` を開き、画面に沿ってインストールします。
4. スタートメニューから **Visual Studio Code** を開きます。

日本語表示にしたい場合は、左側の **拡張機能（Extensions）** から `Japanese Language Pack for Visual Studio Code` を検索し、Microsoftの拡張機能を入れます。英語表示のままでも実習は進められます。

## 3. Node.jsとnpmを入れる

Node.jsはアプリを動かすための環境です。npmは、アプリに必要なライブラリをまとめて入れる道具で、通常はNode.jsと一緒に入ります。

1. [Node.jsの公式ダウンロードページ](https://nodejs.org/en/download)を開きます。
2. READMEで指定された **Node.jsのバージョン** を選びます。Windows向けの **Installer（`.msi`）** を、PCに合った種類でダウンロードしてください。

<!-- 撮影：検証に使ったバージョン、Windows、x64／Arm64、Installer (.msi) が見える画面。 -->
![Node.jsのダウンロードページでWindows用のインストーラーを選ぶ画面](images/install/node-download.png)

3. ダウンロードした `.msi` を開き、標準設定で進めます。追加の開発ツールを入れる選択肢が表示された場合、今回のアプリでは不要です。
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
![Git for Windowsのインストーラーを選ぶ画面](images/install/git-download.png)

3. ダウンロードした `.exe` を開き、標準設定で進めます。Gitを使える場所を選ぶ画面が出たら、**Git Bash以外のターミナルでもGitを使える選択肢**を選んでください。

<!-- 撮影：Gitを使える場所を選ぶ画面。選択する項目が見えるように撮る。 -->
![PowerShellなどのターミナルでもGitを使える設定を選ぶ画面](images/install/git-path.png)

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