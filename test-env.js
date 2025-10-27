// Quick test to verify environment variables
console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('RESEND_API_KEY starts with re_:', process.env.RESEND_API_KEY?.startsWith('re_'));
console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length);

