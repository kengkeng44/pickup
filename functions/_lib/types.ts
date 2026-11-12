// Minimal local typings for CF Pages Functions + D1 (avoids adding
// @cloudflare/workers-types dep; esbuild strips types at deploy anyway).

export interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
}
export interface D1PreparedStatement {
  bind(...vals: unknown[]): D1PreparedStatement;
  first<T = unknown>(col?: string): Promise<T | null>;
  run(): Promise<{ success: boolean; meta?: { changes?: number } }>;
  all<T = unknown>(): Promise<D1Result<T>>;
}
export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<unknown>;
}

export interface Env {
  DB?: D1Database;
  JWT_SECRET?: string;
  APP_ORIGIN?: string;
  // Pages 自動注入的靜態檔 binding — 後端用它讀 lessons-ch*.json 驗證課程
  ASSETS?: { fetch(req: Request | string): Promise<Response> };
  // P3 email (Resend)
  RESEND_API_KEY?: string;
  // P4 payments
  STRIPE_SECRET?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  APPLE_SHARED_SECRET?: string;
}

// CF Pages EventContext (subset we use)
export interface Ctx {
  request: Request;
  env: Env;
  params: Record<string, string>;
}
