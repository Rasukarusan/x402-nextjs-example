// import type {NextRequest} from 'next/server'
// import {NextResponse} from 'next/server'

// export async function proxy(req: NextRequest) {
//   const paymentHeader = req.headers.get('x-payment')
//   console.log(paymentHeader)

//   // 未払い → 402 と paymentRequirements を返す
//   if (!paymentHeader) {
//     const body = JSON.stringify({
//       paymentRequirements: [
//         {
//           currency: process.env.X402_CURRENCY || 'USDC',
//           chain: process.env.X402_CHAIN || 'base',
//           amount: process.env.X402_AMOUNT || '0.50',
//           recipient: process.env.X402_RECIPIENT || 'YOUR_WALLET',
//           // 必要に応じて reference や expiry なども付与
//         },
//       ],
//     })

//     return new NextResponse(body, {
//       status: 402,
//       headers: {
//         'content-type': 'application/json',
//         // キャッシュさせない（支払い前の本文がキャッシュされないように）
//         'cache-control': 'no-store',
//       },
//     })
//   }

//   // 支払いヘッダーあり → 検証 API を叩く
//   const verifyRes = await fetch(new URL('/api/x402/verify', req.url), {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({paymentHeader}),
//   })
//   console.log(verifyRes)

//   if (!verifyRes.ok) {
//     return new NextResponse('Payment verification failed', {
//       status: 402,
//       headers: {'cache-control': 'no-store'},
//     })
//   }

//   // 検証OK → 通常どおり Next.js に処理を戻す（本文配信）
//   // （ここで rewrite しても良い。レスポンスにも no-store を推奨）
//   const res = NextResponse.next()
//   res.headers.set('cache-control', 'no-store')
//   return res
// }


import {Address} from "viem";
import {paymentMiddleware, Network, Resource} from "x402-next";

const facilitatorUrl = process.env.NEXT_PUBLIC_FACILITATOR_URL as Resource;

const payTo = (process.env.RESOURCE_WALLET_ADDRESS || '0x8a7E91C3C8bF3e9b9D8fF1c6bA7aB6B4e6A6fD43') as Address;
const network = (process.env.NETWORK || 'base') as Network;

const handler = paymentMiddleware(
  payTo,
  {
    "/payment": {
      price: "$0.01",
      network,
      config: {
        description: "Access to protected content",
      },
    },
  },
  {
    url: facilitatorUrl,
  },
  {
    appName: "Next x402 Demo",
    appLogo: "/x402-icon-blue.png",
  }
);

export async function proxy(req: NextRequest) {
  return handler(req);
}
export const config = {
  matcher: '/payment/:path*',
}
