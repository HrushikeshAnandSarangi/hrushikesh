import { SignJWT, jwtVerify } from 'jose';
import { getCookie, setCookie, getEvent } from 'vinxi/http';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key-change-me');

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const event = getEvent();
  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function getAuthCookie() {
  const event = getEvent();
  return getCookie(event, 'admin_token');
}

export async function clearAuthCookie() {
  const event = getEvent();
  setCookie(event, 'admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function requireAuth() {
  const token = await getAuthCookie();
  if (!token) return false;
  const decoded = await verifyToken(token);
  return !!decoded;
}
