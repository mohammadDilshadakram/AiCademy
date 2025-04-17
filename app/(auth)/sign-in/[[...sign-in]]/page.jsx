

import { SignIn, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function SignInPage() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    // Redirect signed-in users
    redirect('/dashboard'); // Replace '/dashboard' with your desired route
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn afterSignInUrl="/dashboard" /> {/* Replace '/dashboard' as needed */}
    </div>
  );
}

// 'use client'

// import { SignIn, useUser } from '@clerk/nextjs';
// import { redirect } from 'next/navigation';

// export default function SignInPage() {
//   const { isSignedIn } = useUser();

//   if (isSignedIn) {
//     // Redirect signed-in users
//     redirect('/dashboard'); // Replace '/dashboard' with your desired route
//   }

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <SignIn afterSignInUrl="/dashboard" /> {/* Replace '/dashboard' as needed */}
//     </div>
//   );
// }
