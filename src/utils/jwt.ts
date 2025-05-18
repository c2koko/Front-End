// src/utils/jwt.ts
export function getUserIdFromToken(token: string): number | null {
  try {
    const payloadBase64 = token.split('.')[1];
    const json = atob(payloadBase64);
    const payload = JSON.parse(json);
    // nameid vagy sub a legtöbb .NET JWT-ben
    const id = payload.nameid ?? payload.sub;
    return id ? Number(id) : null;
  } catch {
    return null;
  }
}
