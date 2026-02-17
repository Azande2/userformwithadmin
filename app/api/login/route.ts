import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function POST(request: Request) {
  console.log('Login API called');
  try {
    const body = await request.json();
    console.log('Request body:', body);

    const { username, password } = body;

    // Check environment variables
    const userUsername = process.env.USER_USERNAME;
    const userPassword = process.env.USER_PASSWORD;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log('Env vars present:', {
      userUsername: !!userUsername,
      userPassword: !!userPassword,
      adminUsername: !!adminUsername,
      adminPassword: !!adminPassword,
      sessionPassword: !!process.env.SESSION_PASSWORD,
    });

    if (!userUsername || !userPassword || !adminUsername || !adminPassword || !process.env.SESSION_PASSWORD) {
      console.error('Missing environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    let role: 'user' | 'admin' | null = null;

    if (username === userUsername && password === userPassword) {
      role = 'user';
    } else if (username === adminUsername && password === adminPassword) {
      role = 'admin';
    } else {
      console.log('Invalid credentials for user:', username);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Authenticated, role:', role);

    const session = await getSession();
    console.log('Session before save:', session);

    session.isLoggedIn = true;
    session.role = role;
    await session.save();

    console.log('Session saved successfully');

    return NextResponse.json({ success: true, role });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}