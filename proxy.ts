import { Address } from "viem";
import { paymentMiddleware, Network, Resource } from "x402-next";

const facilitatorUrl = process.env.NEXT_PUBLIC_FACILITATOR_URL as Resource;

const payTo = (process.env.RESOURCE_WALLET_ADDRESS ||
  "CkyxthCZQPAXccxk5zAi9giNa9jrrqAn8pfwVXKCq3ka") as Address;
const network = (process.env.NETWORK || "solana-devnet") as Network;

const handler = paymentMiddleware(
  payTo,
  {
    "/protected_content": {
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
  },
);

export async function proxy(req: NextRequest) {
  return handler(req);
}
export const config = {
  matcher: "/protected_content/:path*",
};
