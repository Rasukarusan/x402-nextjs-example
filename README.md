<img width="600" src="https://cdn-ak.f.st-hatena.com/images/fotolife/r/rasukarusan/20251124/20251124141418.jpg" />

# x402 Next.js デモ

[x402プロトコル](https://www.x402.org/)を使用した、コンテンツ課金機能付きNext.jsアプリケーションのデモです。

## x402とは

x402は、HTTP 402ステータスコードを活用したWeb標準の支払いプロトコルです。ブロックチェーンベースの少額決済により、特定のコンテンツやAPIへのアクセスに対して課金を行うことができます。

## 機能

- `/protected_content` - $0.01のマイクロペイメントで閲覧可能な保護されたコンテンツ
- Solana devnetでの支払い検証
- `x402-next` ライブラリによるミドルウェア統合

## セットアップ

### 必要条件

- Node.js 18以上
- pnpm

### インストール

```bash
pnpm install
```

### 環境変数

必要に応じて以下の環境変数を設定してください：

```env
NEXT_PUBLIC_FACILITATOR_URL=<facilitator URL>
RESOURCE_WALLET_ADDRESS=<受け取りウォレットアドレス>
NETWORK=solana-devnet
```

### 開発サーバーの起動

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いてください。

## 使い方

1. トップページにアクセス
2. `/protected_content` にアクセスすると、x402による支払いが要求される
3. 対応ウォレットで$0.01を支払うと、保護されたコンテンツが表示される

## 技術スタック

- Next.js 16
- React 19
- x402-next
- Tailwind CSS
- TypeScript

## 参考リンク

- [x402 公式サイト](https://www.x402.org/)
- [x402-next パッケージ](https://www.npmjs.com/package/x402-next)
- [Next.js ドキュメント](https://nextjs.org/docs)
